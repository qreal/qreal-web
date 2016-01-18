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

import com.qreal.stepic.robots.constants.PathConstants;
import com.qreal.stepic.robots.model.diagram.Diagram;
import com.qreal.stepic.robots.model.diagram.DiagramNode;
import com.qreal.stepic.robots.model.diagram.IdObject;
import com.qreal.stepic.robots.model.diagram.Property;
import org.apache.commons.io.FileUtils;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.NodeList;
import org.xml.sax.SAXException;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
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
 * Created by vladimir-zakharov on 25.05.15.
 */
public class JavaModelConverter {

    public UUID convertToXmlSave(Diagram diagram, String kit, String taskId) {
        try {
            String directoryPath = PathConstants.STEPIC_PATH + "/" + "trikKit" + kit + "/tasks" + "/" + taskId;

            this.uuid = UUID.randomUUID();

            String targetPath = directoryPath + "/solutions/" + String.valueOf(this.uuid) + "/" + taskId;
            File targetDirectory = new File(targetPath);
            targetDirectory.mkdirs();

            new File(targetPath + PathConstants.PATH_TO_GRAPHICAL_PART).mkdirs();
            new File(targetPath + PathConstants.PATH_TO_LOGICAL_PART).mkdirs();
            new File(targetPath + PathConstants.PATH_TO_ROOT_ID).mkdirs();

            copyDefaultFiles(taskId, directoryPath, targetPath);

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
        } catch (Exception e) {
            e.printStackTrace();
        }
        return uuid;
    }

    private void copyDefaultFiles(String taskId, String directoryPath, String targetPath) {
        try {
            File taskMetaInfo = new File(directoryPath + "/" + taskId + "/metaInfo.xml");
            File targetMetaInfo = new File(targetPath + "/metaInfo.xml");
            targetMetaInfo.createNewFile();
            FileUtils.copyFile(taskMetaInfo, targetMetaInfo);

            File taskLogicalSubprogramDiagrams = new File(directoryPath + "/" + taskId +
                    PathConstants.PATH_TO_LOGICAL_PART + "/" + "SubprogramDiagram");
            File taskGraphicalSubprogramDiagrams = new File(directoryPath + "/" + taskId +
                    PathConstants.PATH_TO_GRAPHICAL_PART + "/" + "SubprogramDiagram");
            if (taskLogicalSubprogramDiagrams.exists() && taskGraphicalSubprogramDiagrams.exists()) {
                File targetLogicalSubprogramDiagrams = new File(targetPath +
                        PathConstants.PATH_TO_LOGICAL_PART + "/" + "SubprogramDiagram");
                FileUtils.copyDirectory(taskLogicalSubprogramDiagrams, targetLogicalSubprogramDiagrams);

                File targetGraphicalSubprogramDiagrams = new File(targetPath +
                        PathConstants.PATH_TO_GRAPHICAL_PART + "/" + "SubprogramDiagram");
                FileUtils.copyDirectory(taskGraphicalSubprogramDiagrams, targetGraphicalSubprogramDiagrams);

                copySubprogramNodes(taskId, directoryPath, targetPath);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private void copySubprogramNodes(String taskId, String directoryPath, String targetPath) {
        try {
            DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
            factory.setIgnoringElementContentWhitespace(true);
            DocumentBuilder builder = factory.newDocumentBuilder();

            File subprogramDiagramsFolder = new File(directoryPath + "/" + taskId +
                    PathConstants.PATH_TO_GRAPHICAL_PART + "/" + "SubprogramDiagram");
            File[] subprogramDiagrams = subprogramDiagramsFolder.listFiles();

            for (File subprogram : subprogramDiagrams) {
                Set<String> childPaths = getNodeChildPaths(subprogram, builder);
                for (String childPath : childPaths) {
                    File taskGraphicalPartNode = new File(directoryPath + "/" + taskId +
                            PathConstants.PATH_TO_GRAPHICAL_PART + "/" + childPath);
                    File targetGraphicalPartNode = new File(targetPath +
                            PathConstants.PATH_TO_GRAPHICAL_PART + "/" + childPath);
                    FileUtils.copyFile(taskGraphicalPartNode, targetGraphicalPartNode);

                    String logicalPartPath = getLogicalPartPath(taskGraphicalPartNode, builder);

                    File taskLogicalPartNode = new File(directoryPath + "/" + taskId +
                            PathConstants.PATH_TO_LOGICAL_PART + "/" + logicalPartPath);
                    File targetLogicalPartNode = new File(targetPath +
                            PathConstants.PATH_TO_LOGICAL_PART + "/" + logicalPartPath);
                    FileUtils.copyFile(taskLogicalPartNode, targetLogicalPartNode);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private Set<String> getNodeChildPaths(final File node, final DocumentBuilder builder) {
        Set<String> childPaths = new HashSet<>();
        try {
            Document doc = builder.parse(node);
            Element children = (Element) doc.getElementsByTagName("children").item(0);
            NodeList childList = children.getElementsByTagName("object");

            for (int i = 0; i < childList.getLength(); i++) {
                Element child = (Element) childList.item(i);
                String idAttr = child.getAttribute("id");
                String[] parts = idAttr.split("/");
                String path = parts[parts.length - 2] + "/" + parts[parts.length - 1];
                childPaths.add(path);
            }
        } catch (SAXException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return childPaths;
    }

    private String getLogicalPartPath(final File graphicalPartNode, final DocumentBuilder builder) {
        String path = null;
        try {
            Document doc = builder.parse(graphicalPartNode);
            Element element = doc.getDocumentElement();
            String logicalIdAttr = element.getAttribute("logicalId");
            String parts[] = logicalIdAttr.split("/");
            path = parts[parts.length - 2] + "/" + parts[parts.length - 1];
        } catch (SAXException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return path;
    }

    private void createRootIdFile(String targetPath, DocumentBuilder documentBuilder, Transformer transformer) {
        try {
            File rootIdFile = new File(targetPath + PathConstants.PATH_TO_ROOT_ID + "/ROOT_ID");
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
            String logicalXmlTargetPath = targetPath + PathConstants.PATH_TO_LOGICAL_PART + "/" + element.getType();
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

            String graphicalXmlTargetPath = targetPath + PathConstants.PATH_TO_GRAPHICAL_PART + "/" + element.getType();
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

        for (Property property : node.getLogicalProperties()) {
            Element element = convertPropertyToElement(logicalXML, property);
            properties.appendChild(element);
        }

        Element incomingExplosions = logicalXML.createElement("incomingExplosions");
        incomingExplosions.setAttribute("type", "qReal::IdList");
        properties.appendChild(incomingExplosions);

        for (IdObject idObject : node.getIncomingExplosions()) {
            Element object = logicalXML.createElement("object");
            object.setAttribute("id",
                    String.format("qrm:/RobotsMetamodel/RobotsDiagram/ControlFlow/{%s}", idObject.getId()));
            incomingExplosions.appendChild(object);
        }

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

        for (Property property : node.getGraphicalProperties()) {
            Element element = convertPropertyToElement(graphicalXML, property);
            properties.appendChild(element);
        }

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

        for (Property property : node.getLogicalProperties()) {
            Element element = convertPropertyToElement(logicalXML, property);
            properties.appendChild(element);
        }

        Element incomingExplosions = logicalXML.createElement("incomingExplosions");
        incomingExplosions.setAttribute("type", "qReal::IdList");
        properties.appendChild(incomingExplosions);

        for (IdObject idObject : node.getIncomingExplosions()) {
            Element object = logicalXML.createElement("object");
            object.setAttribute("id",
                    String.format("qrm:/RobotsMetamodel/RobotsDiagram/ControlFlow/{%s}", idObject.getId()));
            incomingExplosions.appendChild(object);
        }

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

        for (Property property : node.getGraphicalProperties()) {
            Element element = convertPropertyToElement(graphicalXML, property);
            properties.appendChild(element);
        }

        Element links = graphicalXML.createElement("links");
        links.setAttribute("type", "qReal::IdList");
        properties.appendChild(links);

        Element graphicalParts = graphicalXML.createElement("graphicalParts");
        rootElement.appendChild(graphicalParts);

        return graphicalXML;
    }

    private Element convertPropertyToElement(Document document, Property property) {
        Element propertyElement = document.createElement(property.getType());
        propertyElement.setAttribute("key", property.getName());
        propertyElement.setAttribute("value", property.getValue());
        return propertyElement;
    }

    private Set<String> elementsIds = new HashSet<String>();
    private UUID uuid;
}
