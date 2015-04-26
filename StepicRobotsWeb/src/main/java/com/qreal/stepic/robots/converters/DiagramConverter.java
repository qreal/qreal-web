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
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

/**
 * Created by vladzx on 25.04.15.
 */
public class DiagramConverter {
    public Diagram convertToJavaModel(File folder) {
        DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
        factory.setIgnoringElementContentWhitespace(true);
        try {
            DocumentBuilder builder = factory.newDocumentBuilder();

            Map<String, DiagramNode> nodesMap = new HashMap<String, DiagramNode>();
            for (final File fileEntry : folder.listFiles()) {
                convertModel(fileEntry, builder, nodesMap);
            }
            return new Diagram(new HashSet<DiagramNode>(nodesMap.values()));
        } catch (ParserConfigurationException e) {
            e.printStackTrace();
        }
        return null;
    }

    private void convertModel(final File folder, final DocumentBuilder builder,
                              Map<String, DiagramNode> nodesMap) {
        for (final File fileEntry : folder.listFiles()) {
            if (fileEntry.isDirectory()) {
                convertModel(fileEntry, builder, nodesMap);
            } else {
                try {
                    Document doc = builder.parse(fileEntry);
                    Element element = doc.getDocumentElement();

                    if (element.hasAttribute("logicalId") && element.getAttribute("logicalId") != "qrm:/") {
                        convertGraphicalPart(element, nodesMap);
                    } else {
                        convertLogicalPart(element, nodesMap);
                    }
                } catch (SAXException e) {
                    e.printStackTrace();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
    }

    private void convertGraphicalPart(Element element, Map<String, DiagramNode> nodesMap) {
        String logicalId = element.getAttribute("logicalId");
        String parts[] = logicalId.split("/");

        String id = parts[parts.length - 1];
        String type = parts[parts.length - 2];

        if (!nodesMap.containsKey(id)) {
            nodesMap.put(id, new DiagramNode(id, type));
        }
        DiagramNode node = nodesMap.get(id);

        Element propertiesElement = (Element) element.getElementsByTagName("properties").item(0);
        node.addProperties(convertProperties(propertiesElement));
    }

    private void convertLogicalPart(Element element, Map<String, DiagramNode> nodesMap) {
        String logicalId = element.getAttribute("id");
        String parts[] = logicalId.split("/");

        String id = parts[parts.length - 1];
        String type = parts[parts.length - 2];

        if (!nodesMap.containsKey(id)) {
            nodesMap.put(id, new DiagramNode(id, type));
        }
        DiagramNode node = nodesMap.get(id);

        Element propertiesElement = (Element) element.getElementsByTagName("properties").item(0);
        node.addProperties(convertProperties(propertiesElement));
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
}
