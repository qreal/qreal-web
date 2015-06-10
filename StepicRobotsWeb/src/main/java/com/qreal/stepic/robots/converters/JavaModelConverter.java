package com.qreal.stepic.robots.converters;

import com.qreal.stepic.robots.model.diagram.Diagram;
import com.qreal.stepic.robots.model.diagram.DiagramNode;
import com.qreal.stepic.robots.model.diagram.IdObject;
import com.qreal.stepic.robots.model.diagram.Property;
import org.apache.commons.io.FileUtils;
import org.springframework.core.io.ResourceLoader;
import org.w3c.dom.Document;
import org.w3c.dom.Element;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.transform.OutputKeys;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerException;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;
import java.io.File;
import java.io.IOException;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

/**
 * Created by vladzx on 25.05.15.
 */
public class JavaModelConverter {
    public UUID convertToXmlSave(Diagram diagram, ResourceLoader resourceLoader, String taskId) {
        try {
            String directoryPath = resourceLoader.getResource("tasks/" + taskId).getFile().getPath();

            this.uuid = UUID.randomUUID();

            String targetPath = directoryPath + "/solutions/" + String.valueOf(this.uuid) + "/diagram";
            File targetDirectory = new File(targetPath);
            targetDirectory.mkdir();
            File patternsDirectory = resourceLoader.getResource("resources/xml_patterns/diagram").getFile();
            FileUtils.copyDirectory(patternsDirectory, targetDirectory);

            File taskMetaInfo = new File(directoryPath + "/diagram/metaInfo.xml");
            File targetMetaInfo = new File(targetPath + "/metaInfo.xml");
            targetMetaInfo.createNewFile();
            FileUtils.copyFile(taskMetaInfo, targetMetaInfo);

            DocumentBuilderFactory documentFactory = DocumentBuilderFactory.newInstance();
            DocumentBuilder documentBuilder = documentFactory.newDocumentBuilder();
            TransformerFactory transformerFactory = TransformerFactory.newInstance();
            Transformer transformer = transformerFactory.newTransformer();
            transformer.setOutputProperty(OutputKeys.OMIT_XML_DECLARATION, "yes");

            for (DiagramNode node : diagram.getNodes()) {
                convertElement(node, targetPath, documentBuilder, transformer);
            }

            for (DiagramNode link : diagram.getLinks()) {
                convertElement(link, targetPath, documentBuilder, transformer);
            }

            createRootIdFile(targetPath, documentBuilder, transformer);
        } catch (IOException ioe) {
            ioe.printStackTrace();
        } catch (ParserConfigurationException pce) {
            pce.printStackTrace();
        } catch (TransformerException tfe) {
            tfe.printStackTrace();
        }
        return uuid;
    }

    private void createRootIdFile(String targetPath, DocumentBuilder documentBuilder, Transformer transformer) {
        try {
            File rootIdFile = new File(targetPath + "/tree/logical/ROOT_ID/ROOT_ID/ROOT_ID/ROOT_ID");
            rootIdFile.createNewFile();

            Document xml = documentBuilder.newDocument();
            Element rootElement = xml.createElement("object");
            rootElement.setAttribute("id", "qrm:/ROOT_ID/ROOT_ID/ROOT_ID/ROOT_ID");
            rootElement.setAttribute("parent", "qrm:/");
            xml.appendChild(rootElement);

            Element children = xml.createElement("children");
            rootElement.appendChild(children);

            for (String id : this.elementsIds) {
                Element child = xml.createElement("object");
                child.setAttribute("id", id);
                children.appendChild(child);
            }

            Element properties = xml.createElement("properties");
            rootElement.appendChild(properties);

            Element name = xml.createElement("QString");
            name.setAttribute("key", "name");
            name.setAttribute("value", "qrm:/ROOT_ID/ROOT_ID/ROOT_ID/ROOT_ID");
            properties.appendChild(name);

            DOMSource source = new DOMSource(xml);
            StreamResult result = new StreamResult(rootIdFile);
            transformer.transform(source, result);
        } catch (IOException ioe) {
            ioe.printStackTrace();
        } catch (TransformerException tfe) {
            tfe.printStackTrace();
        }
    }

    private void convertElement(DiagramNode element, String targetPath,
                                       DocumentBuilder documentBuilder, Transformer transformer) {
        try {
            String logicalXmlTargetPath = targetPath + "/tree/logical/RobotsMetamodel/RobotsDiagram/" + element.getType();
            File logicalXmlTargetDirectory = new File(logicalXmlTargetPath);
            logicalXmlTargetDirectory.mkdir();

            File logicalTargetFile = new File(logicalXmlTargetPath + "/{" + element.getLogicalId() + "}");
            logicalTargetFile.createNewFile();

            DOMSource logicalSource;
            if (element.getType().equals("ControlFlow")) {
                logicalSource = new DOMSource(convertLinkLogicalPart(documentBuilder, element));
            } else {
                logicalSource = new DOMSource(convertNodeLogicalPart(documentBuilder, element));
            }
            StreamResult logicalResult = new StreamResult(logicalTargetFile);
            transformer.transform(logicalSource, logicalResult);

            String graphicalXmlTargetPath = targetPath + "/tree/graphical/RobotsMetamodel/RobotsDiagram/" + element.getType();
            File graphicalXmlTargetDirectory = new File(graphicalXmlTargetPath);
            graphicalXmlTargetDirectory.mkdir();

            File graphicalTargetFile = new File(graphicalXmlTargetPath + "/{" + element.getGraphicalId() + "}");
            graphicalTargetFile.createNewFile();

            DOMSource graphicalSource;
            if (element.getType().equals("ControlFlow")) {
                graphicalSource = new DOMSource(convertLinkGraphicalPart(documentBuilder, element));
            } else {
                graphicalSource = new DOMSource(convertNodeGraphicalPart(documentBuilder, element));
            }
            this.elementsIds.add(String.format("qrm:/RobotsMetamodel/RobotsDiagram/%s/{%s}",
                    element.getType(), element.getLogicalId()));
            if (element.getType().equals("RobotsDiagramNode")) {
                this.elementsIds.add(String.format("qrm:/RobotsMetamodel/RobotsDiagram/%s/{%s}",
                        element.getType(), element.getGraphicalId()));
            }

            StreamResult graphicalResult = new StreamResult(graphicalTargetFile);
            transformer.transform(graphicalSource, graphicalResult);
        } catch (IOException ioe) {
            ioe.printStackTrace();
        } catch (TransformerException tfe) {
            tfe.printStackTrace();
        }
    }

    private Document convertNodeLogicalPart(DocumentBuilder documentBuilder, DiagramNode node) {
        Document logicalXML = documentBuilder.newDocument();
        Element rootElement = logicalXML.createElement("object");
        rootElement.setAttribute("id", String.format("qrm:/RobotsMetamodel/RobotsDiagram/%s/{%s}",
                node.getType(), node.getLogicalId()));
        rootElement.setAttribute("parent", "qrm:/ROOT_ID/ROOT_ID/ROOT_ID/ROOT_ID");
        logicalXML.appendChild(rootElement);

        Element children = logicalXML.createElement("children");
        rootElement.appendChild(children);

        Element properties = logicalXML.createElement("properties");
        rootElement.appendChild(properties);

        Element name = logicalXML.createElement("QString");
        name.setAttribute("key", "name");
        name.setAttribute("value", node.getType());
        properties.appendChild(name);

        for (Property property : node.getLogicalProperties()) {
            Element propertyElement = logicalXML.createElement("QString");
            propertyElement.setAttribute("key", property.getName());
            propertyElement.setAttribute("value", property.getValue());
            properties.appendChild(propertyElement);
        }

        Element from = logicalXML.createElement("qReal::Id");
        from.setAttribute("key", "from");
        from.setAttribute("value", "qrm:/ROOT_ID/ROOT_ID/ROOT_ID/ROOT_ID");
        properties.appendChild(from);

        Element to = logicalXML.createElement("qReal::Id");
        to.setAttribute("key", "to");
        to.setAttribute("value", "qrm:/ROOT_ID/ROOT_ID/ROOT_ID/ROOT_ID");
        properties.appendChild(to);

        appendDefaultLogicalProperties(logicalXML, properties);

        Element links = logicalXML.createElement("links");
        links.setAttribute("type", "qReal::IdList");

        for (IdObject linkIdObject : node.getLogicalLinksIds()) {
            Element linkId = logicalXML.createElement("object");
            linkId.setAttribute("id",
                    String.format("qrm:/RobotsMetamodel/RobotsDiagram/ControlFlow/{%s}", linkIdObject.getId()));
            links.appendChild(linkId);
        }

        properties.appendChild(links);

        return logicalXML;
    }

    private Document convertNodeGraphicalPart(DocumentBuilder documentBuilder, DiagramNode node) {
        Document graphicalXML = documentBuilder.newDocument();
        Element rootElement = graphicalXML.createElement("object");
        rootElement.setAttribute("id", String.format("qrm:/RobotsMetamodel/RobotsDiagram/%s/{%s}",
                node.getType(), node.getGraphicalId()));
        rootElement.setAttribute("logicalId", "qrm:/RobotsMetamodel/RobotsDiagram/" +
                node.getType() + "/{" + node.getLogicalId() + "}");
        rootElement.setAttribute("parent", node.getGraphicalParent());
        graphicalXML.appendChild(rootElement);

        Element children = graphicalXML.createElement("children");
        rootElement.appendChild(children);

        for (IdObject childrenId : node.getGraphicalChildren()) {
            Element childrenElement = graphicalXML.createElement("object");
            childrenElement.setAttribute("id", String.format("qrm:/RobotsMetamodel/RobotsDiagram/%s", childrenId.getId()));
            children.appendChild(childrenElement);
        }

        Element properties = graphicalXML.createElement("properties");
        rootElement.appendChild(properties);

        Element configuration = graphicalXML.createElement("QPolygon");
        configuration.setAttribute("key", "configuration");
        configuration.setAttribute("value", "0, 0 : 0, 0 : ");
        properties.appendChild(configuration);

        Element name = graphicalXML.createElement("QString");
        name.setAttribute("key", "name");
        name.setAttribute("value", node.getType());
        properties.appendChild(name);

        Element from = graphicalXML.createElement("qReal::Id");
        from.setAttribute("key", "from");
        from.setAttribute("value", "qrm:/ROOT_ID/ROOT_ID/ROOT_ID/ROOT_ID");
        properties.appendChild(from);

        Element to = graphicalXML.createElement("qReal::Id");
        to.setAttribute("key", "to");
        to.setAttribute("value", "qrm:/ROOT_ID/ROOT_ID/ROOT_ID/ROOT_ID");
        properties.appendChild(to);

        Element fromPort = graphicalXML.createElement("double");
        fromPort.setAttribute("key", "fromPort");
        fromPort.setAttribute("value", "0");
        properties.appendChild(fromPort);

        Element toPort = graphicalXML.createElement("double");
        toPort.setAttribute("key", "toPort");
        toPort.setAttribute("value", "0");
        properties.appendChild(toPort);

        Element links = graphicalXML.createElement("links");
        links.setAttribute("type", "qReal::IdList");

        for (IdObject linkIdObject : node.getGraphicalLinksIds()) {
            Element linkId = graphicalXML.createElement("object");
            linkId.setAttribute("id",
                    String.format("qrm:/RobotsMetamodel/RobotsDiagram/ControlFlow/{%s}", linkIdObject.getId()));
            links.appendChild(linkId);
        }

        properties.appendChild(links);

        Element graphicalParts = graphicalXML.createElement("graphicalParts");
        rootElement.appendChild(graphicalParts);

        return graphicalXML;
    }

    private Document convertLinkLogicalPart(DocumentBuilder documentBuilder, DiagramNode node) {
        Document logicalXML = documentBuilder.newDocument();
        Element rootElement = logicalXML.createElement("object");
        rootElement.setAttribute("id", String.format("qrm:/RobotsMetamodel/RobotsDiagram/%s/{%s}",
                node.getType(), node.getLogicalId()));
        rootElement.setAttribute("parent", "qrm:/ROOT_ID/ROOT_ID/ROOT_ID/ROOT_ID");
        logicalXML.appendChild(rootElement);

        Element children = logicalXML.createElement("children");
        rootElement.appendChild(children);

        Element properties = logicalXML.createElement("properties");
        rootElement.appendChild(properties);

        Element name = logicalXML.createElement("QString");
        name.setAttribute("key", "name");
        name.setAttribute("value", node.getType());
        properties.appendChild(name);

        for (Property property : node.getLogicalProperties()) {
            if (property.getType().equals("qReal::Id")) {
                Element propertyElement = logicalXML.createElement("qReal::Id");
                propertyElement.setAttribute("key", property.getName());
                propertyElement.setAttribute("value",
                        String.format("qrm:/RobotsMetamodel/RobotsDiagram/%s", property.getValue()));
                properties.appendChild(propertyElement);
            } else {
                Element propertyElement = logicalXML.createElement("QString");
                propertyElement.setAttribute("key", property.getName());
                propertyElement.setAttribute("value", property.getValue());
                properties.appendChild(propertyElement);
            }
        }

        appendDefaultLogicalProperties(logicalXML, properties);

        Element links = logicalXML.createElement("links");
        links.setAttribute("type", "qReal::IdList");
        properties.appendChild(links);

        return logicalXML;
    }

    private Document convertLinkGraphicalPart(DocumentBuilder documentBuilder, DiagramNode node) {
        Document graphicalXML = documentBuilder.newDocument();
        Element rootElement = graphicalXML.createElement("object");
        rootElement.setAttribute("id", String.format("qrm:/RobotsMetamodel/RobotsDiagram/%s/{%s}",
                node.getType(), node.getGraphicalId()));
        rootElement.setAttribute("logicalId", "qrm:/RobotsMetamodel/RobotsDiagram/" +
                node.getType() + "/{" + node.getLogicalId() + "}");
        rootElement.setAttribute("parent", node.getGraphicalParent());
        graphicalXML.appendChild(rootElement);

        Element children = graphicalXML.createElement("children");
        rootElement.appendChild(children);

        Element properties = graphicalXML.createElement("properties");
        rootElement.appendChild(properties);

        Element configuration = graphicalXML.createElement("QPolygon");
        configuration.setAttribute("key", "configuration");
        configuration.setAttribute("value", "0, 0 : 0, 0 : ");
        properties.appendChild(configuration);

        Element name = graphicalXML.createElement("QString");
        name.setAttribute("key", "name");
        name.setAttribute("value", node.getType());
        properties.appendChild(name);

        for (Property property : node.getGraphicalProperties()) {
            if (property.getType().equals("qReal::Id")) {
                Element propertyElement = graphicalXML.createElement("qReal::Id");
                propertyElement.setAttribute("key", property.getName());
                propertyElement.setAttribute("value",
                        String.format("qrm:/RobotsMetamodel/RobotsDiagram/%s", property.getValue()));
                properties.appendChild(propertyElement);
            }
        }

        Element position = graphicalXML.createElement("QPointF");
        position.setAttribute("key", "position");
        position.setAttribute("value", "0, 0");
        properties.appendChild(position);

        Element fromPort = graphicalXML.createElement("double");
        fromPort.setAttribute("key", "fromPort");
        fromPort.setAttribute("value", "0");
        properties.appendChild(fromPort);

        Element toPort = graphicalXML.createElement("double");
        toPort.setAttribute("key", "toPort");
        toPort.setAttribute("value", "0");
        properties.appendChild(toPort);

        Element links = graphicalXML.createElement("links");
        links.setAttribute("type", "qReal::IdList");
        properties.appendChild(links);

        Element graphicalParts = graphicalXML.createElement("graphicalParts");
        rootElement.appendChild(graphicalParts);

        return graphicalXML;
    }

    private void appendDefaultLogicalProperties(Document logicalXML, Element properties) {
        Element incomingExplosions = logicalXML.createElement("incomingExplosions");
        incomingExplosions.setAttribute("type", "qReal::IdList");
        properties.appendChild(incomingExplosions);

        Element outgoingExplosion = logicalXML.createElement("qReal::Id");
        outgoingExplosion.setAttribute("key", "outgoingExplosion");
        outgoingExplosion.setAttribute("value", "qrm:/");
        properties.appendChild(outgoingExplosion);

        Element linkShape = logicalXML.createElement("int");
        linkShape.setAttribute("key", "linkShape");
        linkShape.setAttribute("value", "-1");
        properties.appendChild(linkShape);
    }

    private Set<String> elementsIds = new HashSet<String>();
    private UUID uuid;
}
