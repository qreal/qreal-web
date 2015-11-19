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
            resultTasksTypes.set("visible", getVisibleTypes(tasksTypes, allTypes));

            return resultTasksTypes;
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }

    private ArrayNode getNotVisibleTypes(JsonNode tasksTypes, JsonNode allTypes) {
        JsonNode taskNotVisible = tasksTypes.path("notVisible");
        JsonNode allNotVisible = allTypes.path("notVisible");
        return getObjectsWithTypes(taskNotVisible, allNotVisible);
    }

    private ObjectNode getVisibleTypes(JsonNode tasksTypes, JsonNode allTypes) {
        ObjectNode resultVisibleNode = mapper.createObjectNode();
        JsonNode taskVisible = tasksTypes.path("visible");
        JsonNode allVisible = allTypes.path("visible");
        resultVisibleNode.set("general", getGeneralTypes(taskVisible, allVisible));
        resultVisibleNode.set("palette", getPaletteTypes(taskVisible, allVisible));
        return resultVisibleNode;
    }

    private ArrayNode getGeneralTypes(JsonNode tasksVisibleTypes, JsonNode allVisibleTypes) {
        JsonNode taskGeneralTypes = tasksVisibleTypes.path("general");
        JsonNode allGeneralTypes = allVisibleTypes.path("general");
        return getObjectsWithTypes(taskGeneralTypes, allGeneralTypes);
    }

    private ObjectNode getPaletteTypes(JsonNode tasksVisibleTypes, JsonNode allVisibleTypes) {
        ObjectNode resultPaletteNode = mapper.createObjectNode();

        JsonNode taskPaletteTypes = tasksVisibleTypes.path("palette");
        JsonNode allPaletteTypes = allVisibleTypes.path("palette");

        Iterator<Map.Entry<String, JsonNode>> categoriesIterator = taskPaletteTypes.fields();

        while (categoriesIterator.hasNext()) {
            Map.Entry<String, JsonNode> entry = categoriesIterator.next();
            String category = entry.getKey();

            JsonNode taskCategoryNode = taskPaletteTypes.path(category);
            JsonNode generalCategoryNode = allPaletteTypes.path(category);

            ArrayNode categoryArray = getObjectsWithTypes(taskCategoryNode, generalCategoryNode);

            resultPaletteNode.set(generalCategoryNode.get("categoryName").textValue(), categoryArray);
        }

        return resultPaletteNode;
    }

    private ArrayNode getObjectsWithTypes(JsonNode taskNode, JsonNode sourceNode) {
        ArrayNode array = mapper.createArrayNode();
        Iterator<JsonNode> typesIterator = taskNode.elements();

        while (typesIterator.hasNext()) {
            JsonNode type = typesIterator.next();
            String typeName = type.textValue();
            JsonNode typeObject = sourceNode.path(typeName);
            ((ObjectNode) typeObject).put("type", typeName);
            array.add(typeObject);
        }

        return array;
    }

}
