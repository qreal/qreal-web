package com.qreal.example.loaders;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;

import java.io.File;
import java.io.IOException;
import java.util.Iterator;
import java.util.Map;

/**
 * Created by LChernigovskaya on 09.03.2016.
 */
public class TypesLoader {

    private ObjectMapper mapper;

    public TypesLoader() {
        mapper = new ObjectMapper();
    }

    public JsonNode getTypesJson(String list) {
        try {
            ObjectNode resultTypes = mapper.createObjectNode();
            ClassLoader classLoader = getClass().getClassLoader();
            JsonNode typesList = mapper.readTree(new File(classLoader.getResource(list).getFile()));

            JsonNode listElements = typesList.path("elements");
            resultTypes.set("elements", getObjects(listElements));

            resultTypes.set("blocks", getBlocksTypes(typesList));

            return resultTypes;
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }

    private ObjectNode getBlocksTypes(JsonNode typesList) {
        ObjectNode resultBlocksNode = mapper.createObjectNode();
        JsonNode listBlocksTypes = typesList.path("blocks");

        JsonNode listGeneralTypes = listBlocksTypes.path("general");
        resultBlocksNode.set("general", getObjects(listGeneralTypes));

        resultBlocksNode.set("palette", getPaletteTypes(listBlocksTypes));
        return resultBlocksNode;
    }

    private ObjectNode getPaletteTypes(JsonNode listBlocksTypes) {
        ObjectNode resultPaletteNode = mapper.createObjectNode();

        JsonNode listPaletteTypes = listBlocksTypes.path("palette");

        Iterator<Map.Entry<String, JsonNode>> categoriesIterator = listPaletteTypes.fields();

        while (categoriesIterator.hasNext()) {
            Map.Entry<String, JsonNode> entry = categoriesIterator.next();
            String category = entry.getKey();

            JsonNode taskCategoryNode = listPaletteTypes.path(category);

            ArrayNode categoryArray = getObjects(taskCategoryNode);

            resultPaletteNode.set(category, categoryArray);
        }

        return resultPaletteNode;
    }

    private ArrayNode getObjects(JsonNode listNode) {
        ArrayNode array = mapper.createArrayNode();
        Iterator<Map.Entry<String, JsonNode>> listIterator = listNode.fields();

        while (listIterator.hasNext()) {
            Map.Entry<String, JsonNode> type = listIterator.next();
            String typeName = type.getKey();
            JsonNode typeObject = listNode.path(typeName);
            ((ObjectNode) typeObject).put("type", typeName);
            array.add(typeObject);
        }

        return array;
    }

}
