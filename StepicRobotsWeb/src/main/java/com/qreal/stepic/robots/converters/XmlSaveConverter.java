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
 * Created by vladzx on 25.04.15.
 */
public class XmlSaveConverter {
    public Diagram convertToJavaModel(File folder) {
        DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
        factory.setIgnoringElementContentWhitespace(true);
        try {
            DocumentBuilder builder = factory.newDocumentBuilder();

            Map<String, DiagramNode> nodesMap = new HashMap<String, DiagramNode>();
            Map<String, DiagramNode> linksMap = new HashMap<String, DiagramNode>();

            File robotDiagramNodeFolder = new File(folder.getPath() + "/graphical/RobotsMetamodel/RobotsDiagram/RobotsDiagramNode");
            File robotDiagramNode = robotDiagramNodeFolder.listFiles()[0];
            Set<String> robotDiagramNodeChilds = getNodeChilds(robotDiagramNode, builder);

            File rootIdNode = new File(folder.getPath() + "/logical/ROOT_ID/ROOT_ID/ROOT_ID/ROOT_ID");
            Set<String> rootIdChilds = getNodeChilds(rootIdNode, builder);

            for (final File fileEntry : folder.listFiles()) {
                convertModel(fileEntry, builder, robotDiagramNodeChilds, rootIdChilds, nodesMap, linksMap);
            }
            return new Diagram(new HashSet<DiagramNode>(nodesMap.values()), new HashSet<DiagramNode>(linksMap.values()));
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    private void convertModel(final File folder, final DocumentBuilder builder,
                              final Set<String> robotDiagramNodeChilds, final Set<String> rootIdChilds,
                              Map<String, DiagramNode> nodesMap, Map<String, DiagramNode> linksMap) {

        for (final File fileEntry : folder.listFiles()) {
            if (fileEntry.isDirectory()) {
                convertModel(fileEntry, builder, robotDiagramNodeChilds, rootIdChilds, nodesMap, linksMap);
            } else {
                try {
                    Document doc = builder.parse(fileEntry);
                    Element element = doc.getDocumentElement();

                    if (element.hasAttribute("logicalId") && element.getAttribute("logicalId") != "qrm:/") {
                        String id = element.getAttribute("id");
                        if (robotDiagramNodeChilds.contains(id) || robotDiagramNodeChilds.contains(id)) {
                            convertGraphicalPart(element, nodesMap, linksMap);
                        }
                    } else {
                        if (rootIdChilds.contains(element.getAttribute("id"))) {
                            convertLogicalPart(element, nodesMap, linksMap);
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

    private Set<String> getNodeChilds(final File node, final DocumentBuilder builder) {
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

    private void convertLogicalPart(Element element, Map<String, DiagramNode> nodesMap,
                                    Map<String, DiagramNode> linksMap) {
        String logicalIdAttr = element.getAttribute("id");
        String parts[] = logicalIdAttr.split("/");

        String logicalId = getId(parts[parts.length - 1]);
        String type = parts[parts.length - 2];

        if (type.equals("ControlFlow")) {
            if (!linksMap.containsKey(logicalId)) {
                linksMap.put(logicalId, new DiagramNode());
            }
        } else {
            if (!nodesMap.containsKey(logicalId)) {
                nodesMap.put(logicalId, new DiagramNode());
            }
        }

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

    private void convertGraphicalPart(Element element, Map<String, DiagramNode> nodesMap,
                                      Map<String, DiagramNode> linksMap) {
        String logicalIdAttr = element.getAttribute("logicalId");
        String logicalIdParts[] = logicalIdAttr.split("/");

        String logicalId = getId(logicalIdParts[logicalIdParts.length - 1]);
        String type = logicalIdParts[logicalIdParts.length - 2];

        if (type.equals("ControlFlow")) {
            if (!linksMap.containsKey(logicalId)) {
                linksMap.put(logicalId, new DiagramNode());
            }
        } else {
            if (!nodesMap.containsKey(logicalId)) {
                nodesMap.put(logicalId, new DiagramNode());
            }
        }

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

    private String getId(String idString) {
        String pattern = "\\{(.*)\\}";
        return idString.replaceAll(pattern, "$1");
    }
}
