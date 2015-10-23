/*
 * Copyright vladimir-zakharov
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
    static load(response, graph: joint.dia.Graph,
                nodesMap, linksMap, nodeTypesMap: NodeTypesMap): void {
        var minPos: {x: number; y: number} = this.findMinPosition(response, nodeTypesMap);
        var offsetX = (minPos.x < 0) ? (-minPos.x + 100) : 25;
        var offsetY = (minPos.y < 0) ? (-minPos.y + 100) : 25;

        for (var i = 0; i < response.nodes.length; i++) {
            var nodeObject = response.nodes[i];
            var type = nodeObject.type;
            var name = "";

            if (type === "RobotsDiagramNode") {
                DiagramLoader.loadRobotsDiagramNode(nodeObject);
            } else {
                if (nodeTypesMap[type]) {
                    var logicalProperties: PropertiesMap = {};
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

                        if (typeProperties.hasOwnProperty(propertyName)) {
                            var property:Property = new Property(typeProperties[propertyName].name,
                                logicalPropertiesObject[j].value, typeProperties[propertyName].type);
                            logicalProperties[propertyName] = property;
                        }
                    }

                    var graphicalPropertiesObject = nodeObject.graphicalProperties;

                    var x:number = 0;
                    var y:number = 0;
                    for (var j = 0; j < graphicalPropertiesObject.length; j++) {
                        if (graphicalPropertiesObject[j].name === "position") {
                            var position:string = graphicalPropertiesObject[j].value;
                            var positionNums = this.parsePosition(position);
                            x = positionNums.x;
                            y = positionNums.y;
                        }
                    }

                    this.loadNode(graph, nodesMap, nodeObject.graphicalId, name, type,
                        x + offsetX, y + offsetY, logicalProperties, nodeTypesMap[nodeObject.type].getImage());
                }
            }
        }

        for (var i = 0; i < response.links.length; i++) {
            this.loadLink(graph, linksMap, response.links[i], offsetX, offsetY);
        }
    }

    static loadRobotsDiagramNode(nodeObject) {
        var logicalProperties: PropertiesMap = {};
        var logicalPropertiesObject = nodeObject.logicalProperties;
        for (var i = 0; i < logicalPropertiesObject.length; i++) {
            var propertyName = logicalPropertiesObject[i].name;
            if (propertyName === "devicesConfiguration" || propertyName === "worldModel") {
                var property:Property = new Property(propertyName,
                    logicalPropertiesObject[i].value, logicalPropertiesObject[i].type);
                logicalProperties[propertyName] = property;
            }
        }

        DiagramController.robotsDiagramNode = new RobotsDiagramNode(nodeObject.logicalId, nodeObject.graphicalId,
            logicalProperties);
    }

    static loadNode(graph: joint.dia.Graph, nodesMap, id: string, name: string,
                      type: string, x: number, y: number, properties, image: string): void {
        var node: DiagramNode = new DefaultDiagramNode(name, type, x, y, properties, image, id);
        nodesMap[node.getJointObject().id] = node;
        graph.addCell(node.getJointObject());
    }

    static loadLink(graph: joint.dia.Graph, linksMap, linkObject, offsetX: number, offsetY: number): void {
        var sourceId: string = "";
        var targetId: string = "";

        var properties: PropertiesMap = {};
        var logicalPropertiesObject = linkObject.logicalProperties;

        for (var j = 0; j < logicalPropertiesObject.length; j++) {
            switch (logicalPropertiesObject[j].name) {
                case "Guard":
                    var property: Property = new Property("Guard", logicalPropertiesObject[j].value, "combobox");
                    properties["Guard"] = property;
            }
        }

        var graphicalPropertiesObject = linkObject.graphicalProperties;
        var vertices = [];
        var linkPosition: {x: number; y: number};

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
                    vertices = this.loadVertices(graphicalPropertiesObject[j].value);
            }
        }

        vertices.forEach(function (vertex: {x: number; y: number}) {
            vertex.x += linkPosition.x + offsetX;
            vertex.y += linkPosition.y + offsetY;
        });

        var jointObjectId = linkObject.graphicalId;

        var jointObject: joint.dia.Link = new joint.dia.Link({
            id: jointObjectId,
            attrs: {
                '.connection': { stroke: 'black' },
                '.marker-target': { fill: 'black', d: 'M 10 0 L 0 5 L 10 10 z' }
            },
            source: { id: sourceId },
            target: { id: targetId },
            vertices: vertices
        });

        linksMap[jointObjectId] = new Link(jointObject, properties);
        graph.addCell(jointObject);
    }

    static loadVertices(configuration: string) {
        var vertices = [];
        var parts = configuration.split(" : ");

        for (var k = 1; k < parts.length - 2; k++) {
            var positionNums = this.parsePosition(parts[k]);

            vertices.push(
                {
                    x: positionNums.x,
                    y: positionNums.y
                }
            )
        }
        return vertices;
    }

    static parsePosition(position: string): {x: number; y: number} {
        var parts = position.split(", ");
        return {x: parseFloat(parts[0]), y: parseFloat(parts[1])};
    }

    static parseId(idString: string): string {
        var parts = idString.split("/");
        var id = parts[parts.length - 1];
        var expr = /{(.*)}/gi;
        return id.replace(expr, "$1");
    }

    static min(a: number, b: number): number {
        return (a < b) ? a : b;
    }

    static findMinPosition(response, nodeTypesMap: NodeTypesMap): {x: number; y: number} {
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

                        minX = this.min(x, minX);
                        minY = this.min(y, minY);
                    }
                }
            }
        }

        return {x: minX, y: minY};
    }
}