/*
 * Copyright Vladimir Zakharov
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package com.qreal.stepic.robots.loaders;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.qreal.stepic.robots.constants.PathConstants;

import java.io.File;
import java.io.IOException;
import java.util.Iterator;
import java.util.Locale;
import java.util.Map;

/**
 * Created by vladimir-zakharov on 07.09.15.
 */
public class TypesLoader {

    private ObjectMapper mapper;

    public TypesLoader() {
        mapper = new ObjectMapper();
    }

    public JsonNode getTypesJson(String name, Locale locale) {
        try {
            ObjectNode resultTasksTypes = mapper.createObjectNode();

            JsonNode tasksTypes =  mapper.readTree(new File(PathConstants.TASKS_PATH + "/" + name + "/typesList.json"));
            JsonNode allTypes = mapper.readTree(new File(PathConstants.STEPIC_PATH + "/" +
                    "elementsTypes_" + locale + ".json"));

            resultTasksTypes.set("notVisible", getNotVisibleTypes(tasksTypes, allTypes));

            ObjectNode resultVisibleNode = mapper.createObjectNode();
            resultVisibleNode.set("palette", getPaletteTypes(tasksTypes, allTypes));

            resultTasksTypes.set("visible", resultVisibleNode);

            return resultTasksTypes;
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }

    private ArrayNode getNotVisibleTypes(JsonNode tasksTypes, JsonNode allTypes) {
        ArrayNode resultNotVisibleNode = mapper.createArrayNode();

        JsonNode taskNotVisible = tasksTypes.path("notVisible");
        JsonNode allNotVisible = allTypes.path("notVisible");

        Iterator<JsonNode> iterator = taskNotVisible.elements();

        while (iterator.hasNext()) {
            JsonNode type = iterator.next();
            String typeName = type.textValue();
            JsonNode typeObject = allNotVisible.path(typeName);
            ((ObjectNode) typeObject).put("type", typeName);
            resultNotVisibleNode.add(typeObject);
        }

        return resultNotVisibleNode;
    }

    private ObjectNode getPaletteTypes(JsonNode tasksTypes, JsonNode allTypes) {
        ObjectNode resultPaletteNode = mapper.createObjectNode();

        JsonNode palette = tasksTypes.path("visible").path("palette");
        JsonNode allVisible = allTypes.path("visible").path("palette");

        Iterator<Map.Entry<String, JsonNode>> categoriesIterator = palette.fields();

        while (categoriesIterator.hasNext()) {
            Map.Entry<String, JsonNode> entry = categoriesIterator.next();
            String category = entry.getKey();

            JsonNode taskCategoryNode = palette.path(category);
            JsonNode generalCategoryNode = allVisible.path(category);

            ArrayNode categoryArray = getCategoryArray(taskCategoryNode, generalCategoryNode);

            resultPaletteNode.set(generalCategoryNode.get("categoryName").textValue(), categoryArray);
        }

        return resultPaletteNode;
    }

    private ArrayNode getCategoryArray(JsonNode taskCategoryNode, JsonNode generalCategoryNode) {
        ArrayNode categoryArray = mapper.createArrayNode();

        Iterator<JsonNode> typesIterator = taskCategoryNode.elements();

        while (typesIterator.hasNext()) {
            JsonNode type = typesIterator.next();
            String typeName = type.textValue();
            JsonNode typeObject = generalCategoryNode.path(typeName);
            ((ObjectNode) typeObject).put("type", typeName);
            categoryArray.add(typeObject);
        }

        return categoryArray;
    }

}
