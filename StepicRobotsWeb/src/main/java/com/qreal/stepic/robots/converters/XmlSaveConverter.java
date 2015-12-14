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

package com.qreal.stepic.robots.converters;

import com.qreal.stepic.robots.model.diagram.Diagram;
import com.qreal.stepic.robots.model.diagram.DiagramNode;
import com.qreal.stepic.robots.model.diagram.Property;
import org.w3c.dom.*;
import org.xml.sax.SAXException;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import java.io.File;
import java.io.IOException;
import java.util.*;

/**
 * Created by vladimir-zakharov on 25.04.15.
 */
public class XmlSaveConverter {

    private Map<String, DiagramNode> nodesMap;
    private Map<String, DiagramNode> linksMap;
    private DocumentBuilder builder;

    public XmlSaveConverter() {
        nodesMap = new HashMap<>();
        linksMap = new HashMap<>();
    }

    public Diagram convertToJavaModel(File folder) {
        try {
            DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
            factory.setIgnoringElementContentWhitespace(true);
            builder = factory.newDocumentBuilder();

            File robotDiagramNodeFolder = new File(folder.getPath() +
                    "/graphical/RobotsMetamodel/RobotsDiagram/RobotsDiagramNode");
            File robotDiagramNodeFile = robotDiagramNodeFolder.listFiles()[0];
            Set<String> robotDiagramNodeChilds = getNodeChilds(robotDiagramNodeFile);
            convertRobotDiagramNode(robotDiagramNodeFile);

            File subprogramDiagramsFolder = new File(folder.getPath() +
                    "/logical/RobotsMetamodel/RobotsDiagram/SubprogramDiagram");
            if (subprogramDiagramsFolder.exists()) {
                convertSubprogramDiagrams(subprogramDiagramsFolder);
            }

            File graphicalFolder = new File(folder.getPath() + "/graphical");

            for (final File fileEntry : graphicalFolder.listFiles()) {
                convertGraphicalModel(fileEntry, robotDiagramNodeChilds);
            }

            File logicalFolder = new File(folder.getPath() + "/logical");

            for (final File fileEntry : logicalFolder.listFiles()) {
                convertLogicalModel(fileEntry);
            }

            return new Diagram(new HashSet<>(nodesMap.values()), new HashSet<>(linksMap.values()));
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    private void convertRobotDiagramNode(File robotDiagramNodeFile) throws SAXException, IOException {
        Document doc = builder.parse(robotDiagramNodeFile);
        Element element = doc.getDocumentElement();
        convertGraphicalPart(element);
    }

    private void convertSubprogramDiagrams(File subprogramDiagramsFolder) throws SAXException, IOException {
        for (final File subprogramDiagramFile : subprogramDiagramsFolder.listFiles()) {
            Document doc = builder.parse(subprogramDiagramFile);
            Element element = doc.getDocumentElement();
            convertLogicalPart(element);
        }
    }

    private void convertGraphicalModel(final File folder, final Set<String> robotDiagramNodeChilds) {

        for (final File fileEntry : folder.listFiles()) {
            if (fileEntry.isDirectory()) {
                convertGraphicalModel(fileEntry, robotDiagramNodeChilds);
            } else {
                try {
                    Document doc = builder.parse(fileEntry);
                    Element element = doc.getDocumentElement();

                    if (element.hasAttribute("logicalId") && element.getAttribute("logicalId") != "qrm:/") {
                        String id = element.getAttribute("id");
                        if (robotDiagramNodeChilds.contains(id)) {
                            convertGraphicalPart(element);
                        }
                    }
                } catch (SAXException e) {
                    e.printStackTrace();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
    }

    private void convertLogicalModel(final File folder) {

        for (final File fileEntry : folder.listFiles()) {
            if (fileEntry.isDirectory()) {
                convertLogicalModel(fileEntry);
            } else {
                try {
                    Document doc = builder.parse(fileEntry);
                    Element element = doc.getDocumentElement();

                    String idAttr = element.getAttribute("id");
                    String parts[] = idAttr.split("/");
                    String id = getId(parts[parts.length - 1]);

                    if (nodesMap.containsKey(id) || linksMap.containsKey(id)) {
                        convertLogicalPart(element);
                    }
                } catch (SAXException e) {
                    e.printStackTrace();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
    }

    private Set<String> getNodeChilds(final File node) {
        Set<String> childs = new HashSet<>();
        try {
            Document doc = builder.parse(node);
            Element children = (Element) doc.getElementsByTagName("children").item(0);
            NodeList childList = children.getElementsByTagName("object");

            for (int i = 0; i < childList.getLength(); i++) {
                Element child = (Element) childList.item(i);
                childs.add(child.getAttribute("id"));
            }
        } catch (SAXException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return childs;
    }

    private void convertLogicalPart(Element element) {
        String logicalIdAttr = element.getAttribute("id");
        String parts[] = logicalIdAttr.split("/");

        String logicalId = getId(parts[parts.length - 1]);
        String type = parts[parts.length - 2];

        putNode(type, logicalId);

        DiagramNode node;
        if (type.equals("ControlFlow")) {
            node = linksMap.get(logicalId);
        } else {
            node = nodesMap.get(logicalId);
        }

        node.setLogicalId(logicalId);
        node.setType(type);

        Element propertiesElement = (Element) element.getElementsByTagName("properties").item(0);
        node.setLogicalProperties(convertProperties(propertiesElement));
    }

    private void convertGraphicalPart(Element element) {
        String logicalIdAttr = element.getAttribute("logicalId");
        String logicalIdParts[] = logicalIdAttr.split("/");

        String logicalId = getId(logicalIdParts[logicalIdParts.length - 1]);
        String type = logicalIdParts[logicalIdParts.length - 2];

        putNode(type, logicalId);

        DiagramNode node;
        if (type.equals("ControlFlow")) {
            node = linksMap.get(logicalId);
        } else {
            node = nodesMap.get(logicalId);
        }

        String graphicalIdAttr = element.getAttribute("id");
        String graphicalIdParts[] = graphicalIdAttr.split("/");

        String graphicalId = getId(graphicalIdParts[graphicalIdParts.length - 1]);

        node.setGraphicalId(graphicalId);

        Element propertiesElement = (Element) element.getElementsByTagName("properties").item(0);
        node.setGraphicalProperties(convertProperties(propertiesElement));
    }

    private Set<Property> convertProperties(Element propertiesElement) {
        Set<Property> properties = new HashSet<Property>();
        NodeList propertiesList = propertiesElement.getChildNodes();
        for (int i = 0; i < propertiesList.getLength(); i++) {
            Node node = propertiesList.item(i);
            if (node instanceof Element) {
                Element propertyElement = (Element) node;
                if (propertyElement.hasAttribute("key")) {
                    properties.add(new Property(propertyElement.getAttribute("key"),
                            propertyElement.getAttribute("value"), propertyElement.getTagName()));
                }
            }
        }
        return properties;
    }

    private void putNode(String type, String id) {
        Map<String, DiagramNode> map;
        if (type.equals("ControlFlow")) {
            map = linksMap;
        } else {
            map = nodesMap;
        }
        if (!map.containsKey(id)) {
            map.put(id, new DiagramNode());
        }
    }

    private String getId(String idString) {
        String pattern = "\\{(.*)\\}";
        return idString.replaceAll(pattern, "$1");
    }
}
