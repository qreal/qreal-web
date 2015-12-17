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

class DiagramLoader {

    private controller: DiagramController;
    private graph: joint.dia.Graph;
    private subprogramsContent = '';

    constructor(controller: DiagramController, graph: joint.dia.Graph) {
        this.controller = controller;
        this.graph = graph;
    }

    public load($scope, $compile, response, nodesMap, linksMap, nodeTypesMap: NodeTypesMap): void {
        var minPos: {x: number; y: number} = this.findMinPosition(response, nodeTypesMap);
        var offsetX = (minPos.x < 0) ? (-minPos.x + 100) : 25;
        var offsetY = (minPos.y < 0) ? (-minPos.y + 100) : 25;

        for (var i = 0; i < response.nodes.length; i++) {
            var nodeObject = response.nodes[i];
            var type = nodeObject.type;
            var name = "";
            var subprogramDiagramId: string = "";

            if (type === "RobotsDiagramNode") {
                this.loadRobotsDiagramNode(nodeObject);
            } else if (type === "SubprogramDiagram") {
                this.loadSubprogramDiagram(nodeObject, nodeTypesMap);
            }
            else {
                if (nodeTypesMap[type]) {
                    var changeableLogicalProperties: PropertiesMap = {};
                    var constLogicalProperties: PropertiesMap = {};

                    var logicalPropertiesObject = nodeObject.logicalProperties;

                    var typeProperties = nodeTypesMap[nodeObject.type].getPropertiesMap();

                    logicalPropertiesObject.sort(function (a:any, b:any) {
                        if (a.name < b.name) return -1;
                        if (a.name > b.name) return 1;
                        return 0;
                    })

                    for (var j = 0; j < logicalPropertiesObject.length; j++) {
                        var propertyName = logicalPropertiesObject[j].name;

                        if (propertyName === "name") {
                            name  = logicalPropertiesObject[j].value;
                        }
                        if (propertyName === "outgoingExplosion") {
                            var outgoingExplosionId = this.parseId(logicalPropertiesObject[j].value);
                            if (outgoingExplosionId) {
                                subprogramDiagramId = outgoingExplosionId;
                            }
                        }

                        if (typeProperties.hasOwnProperty(propertyName)) {
                            var property:Property = new Property(typeProperties[propertyName].name,
                                typeProperties[propertyName].type, logicalPropertiesObject[j].value);
                            changeableLogicalProperties[propertyName] = property;
                        } else {
                            var property:Property = new Property(logicalPropertiesObject[j].name,
                                logicalPropertiesObject[j].type, logicalPropertiesObject[j].value);
                            constLogicalProperties[propertyName] = property;
                        }
                    }

                    var constGraphicalProperties: PropertiesMap = {};
                    var graphicalPropertiesObject = nodeObject.graphicalProperties;

                    var x: number = 0;
                    var y: number = 0;
                    for (var j = 0; j < graphicalPropertiesObject.length; j++) {
                        var propertyName = graphicalPropertiesObject[j].name;
                        if (propertyName === "position") {
                            var position:string = graphicalPropertiesObject[j].value;
                            var positionNums = this.parsePosition(position);
                            x = positionNums.x;
                            y = positionNums.y;
                        } else {
                            constGraphicalProperties[propertyName] = property;
                        }
                    }

                    this.loadNode(nodesMap, nodeObject.graphicalId, name, type,
                        x + offsetX, y + offsetY, changeableLogicalProperties,
                        new PropertiesPack(constLogicalProperties, constGraphicalProperties),
                        nodeTypesMap[nodeObject.type].getImage(), subprogramDiagramId);
                }
            }
        }

        for (var i = 0; i < response.links.length; i++) {
            this.loadLink(linksMap, response.links[i], offsetX, offsetY);
        }

        this.appendHtmlContentToNavigation($scope, $compile);
    }

    private loadRobotsDiagramNode(nodeObject): void {
        var logicalProperties: PropertiesMap = {};
        var logicalPropertiesObject = nodeObject.logicalProperties;
        for (var i = 0; i < logicalPropertiesObject.length; i++) {
            var propertyName = logicalPropertiesObject[i].name;
            if (propertyName === "devicesConfiguration" || propertyName === "worldModel") {
                var property:Property = new Property(propertyName, logicalPropertiesObject[i].type,
                    logicalPropertiesObject[i].value);
                logicalProperties[propertyName] = property;
            }
        }

        DiagramController.robotsDiagramNode = new RobotsDiagramNode(nodeObject.logicalId, nodeObject.graphicalId,
            logicalProperties);
    }

    private loadSubprogramDiagram(nodeObject, nodeTypesMap: NodeTypesMap): void {
        var name: string = "";
        var logicalPropertiesObject = nodeObject.logicalProperties;
        for (var i = 0; i < logicalPropertiesObject.length; i++) {
            var propertyName = logicalPropertiesObject[i].name;
            if (propertyName === "name") {
                name = logicalPropertiesObject[i].value;
            }
        }

        this.subprogramsContent += '<li><div class="tree_element"' + 'data-type="Subprogram"' +
            'data-id="' + nodeObject.logicalId + '" data-name="' + name + '">';
        var image: string = nodeTypesMap["Subprogram"].getImage();
        this.subprogramsContent += '<img class="elementImg" src="' +
            image + '" width="30" height="30"' + '/>';
        this.subprogramsContent += name;
        this.subprogramsContent += '</div></li>'
        this.controller.addSubprogramDiagramNode(new SubprogramDiagramNode(nodeObject.logicalId, name));
    }

    private appendHtmlContentToNavigation($scope, $compile): void {
        $('#subprograms-navigation').append($compile(this.subprogramsContent)($scope));

        $("#subprograms-navigation").treeview({
            persist: "location"
        });
    }

    private loadNode(nodesMap, id: string, name: string,
                      type: string, x: number, y: number, changeableProperties: PropertiesMap,
                    constPropertiesPack: PropertiesPack, image: string, subprogramDiagramId?: string): void {
        var node: DiagramNode;
        if (subprogramDiagramId) {
            node = new SubprogramNode(name, type, x, y, changeableProperties, image,
                subprogramDiagramId, id, constPropertiesPack);
            var textObject: joint.shapes.basic.Text = (<SubprogramNode> node).getTextObject();
            node.getJointObject().embed(textObject);
            this.graph.addCell(textObject);
        } else {
            node = new DefaultDiagramNode(name, type, x, y, changeableProperties, image, id, constPropertiesPack);
        }
        nodesMap[node.getJointObject().id] = node;
        this.graph.addCell(node.getJointObject());
    }

    private loadLink(linksMap, linkObject, offsetX: number, offsetY: number): void {
        var sourceId: string = "";
        var targetId: string = "";

        var properties: PropertiesMap = {};
        var logicalPropertiesObject = linkObject.logicalProperties;

        for (var j = 0; j < logicalPropertiesObject.length; j++) {
            switch (logicalPropertiesObject[j].name) {
                case "Guard":
                    var property: Property = new Property("Guard", "combobox", logicalPropertiesObject[j].value);
                    properties["Guard"] = property;
            }
        }

        var graphicalPropertiesObject = linkObject.graphicalProperties;
        var vertices = [];
        var linkPosition: {x: number; y: number};
        var configuration: string = "";

        for (var j = 0; j < graphicalPropertiesObject.length; j++) {
            switch (graphicalPropertiesObject[j].name) {
                case "from":
                    sourceId = this.parseId(graphicalPropertiesObject[j].value);
                    break;
                case "to":
                    targetId = this.parseId(graphicalPropertiesObject[j].value);
                    break
                case "position":
                    linkPosition = this.parsePosition(graphicalPropertiesObject[j].value);
                    break
                case "configuration":
                    configuration = graphicalPropertiesObject[j].value;
                    vertices = this.loadVertices(graphicalPropertiesObject[j].value);
                default:

            }
        }

        vertices.forEach(function (vertex: {x: number; y: number}) {
            vertex.x += linkPosition.x + offsetX;
            vertex.y += linkPosition.y + offsetY;
        });

        var jointObjectId = linkObject.graphicalId;

        var sourceObject;
        if (sourceId !== "ROOT_ID") {
            sourceObject = {id: sourceId};
        } else {
            var sourcePosition = this.getSourcePosition(configuration);
            sourcePosition.x += linkPosition.x + offsetX;
            sourcePosition.y += linkPosition.y + offsetY;
            sourceObject = sourcePosition;
        }

        var targetObject;
        if (targetId !== "ROOT_ID") {
            targetObject = {id: targetId};
        } else {
            var targetPosition = this.getTargetPosition(configuration);
            targetPosition.x += linkPosition.x + offsetX;
            targetPosition.y += linkPosition.y + offsetY;
            targetObject = targetPosition;
        }

        var jointObject: joint.dia.Link = new joint.dia.Link({
            id: jointObjectId,
            attrs: {
                '.connection': { stroke: 'black' },
                '.marker-target': { fill: 'black', d: 'M 10 0 L 0 5 L 10 10 z' }
            },
            source: sourceObject,
            target: targetObject,
            vertices: vertices
        });

        linksMap[jointObjectId] = new Link(jointObject, properties);
        this.graph.addCell(jointObject);
    }

    private loadVertices(configuration: string) {
        var vertices = [];
        var parts = configuration.split(" : ");

        for (var k = 1; k < parts.length - 2; k++) {
            vertices.push(this.parsePosition(parts[k]));
        }
        return vertices;
    }

    private getSourcePosition(configuration: string) {
        var parts = configuration.split(" : ");
        var position = this.parsePosition(parts[0]);
        position.x = Math.floor(position.x);
        position.x = position.x - position.x % 5;
        position.y = Math.floor(position.y);
        position.y = position.y - position.y % 5;
        return position;
    }

    private getTargetPosition(configuration: string) {
        var parts = configuration.split(" : ");
        var position = this.parsePosition(parts[parts.length - 2]);
        position.x = Math.floor(position.x);
        position.x = position.x - position.x % 5;
        position.y = Math.floor(position.y);
        position.y = position.y - position.y % 5;
        return position;
    }

    private parsePosition(position: string): {x: number; y: number} {
        var parts = position.split(", ");
        return {x: parseFloat(parts[0]), y: parseFloat(parts[1])};
    }

    private parseId(idString: string): string {
        var parts = idString.split("/");
        var id = parts[parts.length - 1];
        var expr = /{(.*)}/gi;
        return id.replace(expr, "$1");
    }

    private findMinPosition(response, nodeTypesMap: NodeTypesMap): {x: number; y: number} {
        var minX = 2000;
        var minY = 2000;

        for (var i = 0; i < response.nodes.length; i++) {
            var nodeObject = response.nodes[i];
            var type = nodeObject.type;

            if (nodeTypesMap[type]) {
                var graphicalPropertiesObject = nodeObject.graphicalProperties;

                var x:number = 0;
                var y:number = 0;
                for (var j = 0; j < graphicalPropertiesObject.length; j++) {
                    if (graphicalPropertiesObject[j].name === "position") {
                        var position:string = graphicalPropertiesObject[j].value;
                        var parts = position.split(", ");
                        x = parseFloat(parts[0]);
                        y = parseFloat(parts[1]);

                        minX = MathUtils.min(x, minX);
                        minY = MathUtils.min(y, minY);
                    }
                }
            }
        }

        return {x: minX, y: minY};
    }
}