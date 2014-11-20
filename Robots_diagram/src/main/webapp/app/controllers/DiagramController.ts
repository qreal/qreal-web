module Controllers {

    export class DiagramController {
        private graph: joint.dia.Graph = new joint.dia.Graph;
        private paper: DiagramPaper = new DiagramPaper(this.graph);

        private nodeTypesMap: NodeTypesMap = {};
        private nodesList = {};
        private currentNode: DiagramNode;
        private nodeIndex: number = -1;

        constructor($scope, $compile) {
            var controller: DiagramController = this;
            $scope.vm = controller;
            controller.nodeTypesMap = XmlManager.loadElementsFromXml("configs/elements.xml", $scope, $compile);

            this.paper.on('cell:pointerdown',
                function (cellView, evt, x, y) {
                    console.log('cell view ' + cellView.model.id + ' was clicked');

                    var node:DiagramNode = controller.nodesList[cellView.model.id];
                    if (node) {
                        controller.currentNode = node;
                        controller.setNodeProperties(node);
                    } else {
                        controller.currentNode = undefined;
                    }
                }
            );
            this.paper.on('blank:pointerdown',
                function (evt, x, y) {
                    console.log('blank was clicked');
                    $(".property").remove();
                    controller.currentNode = undefined;
                }
            );

            $(document).on('change', '.form-control', function () {
                var tr = $(this).closest('tr');
                var name = tr.find('td:first').html();
                var value = $(this).val();
                controller.currentNode.setProperty(name, value);
            });

            $(".tree_element").draggable({
                helper: function () {
                    return $(this).find('.elementImg').clone();
                },
                revert:"invalid"
            });

            $("#paper").droppable({
                drop: function(event, ui) {
                    var paperPos: { top: number; left: number;} = $("#paper").position();
                    var topElementPos: number = ui.position.top - paperPos.top;
                    var leftElementPos: number = ui.position.left - paperPos.left;
                    var gridSize: number = controller.paper.getGridSizeValue();
                    topElementPos += (gridSize - topElementPos % gridSize);
                    leftElementPos += (gridSize - leftElementPos % gridSize);
                    var element: string = $(ui.draggable.context).text();
                    var image: string = controller.nodeTypesMap[element].image;
                    var properties: PropertiesMap = controller.nodeTypesMap[element].properties;
                    controller.createDefaultNode(leftElementPos, topElementPos, properties, image);
                }
            });
        }

        setNodeProperties(node: DiagramNode): void {
            var properties: PropertiesMap = node.getProperties();
            var content: string = '';
            for (var property in properties) {
                content += this.getPropertyHtml(property, properties[property]);
            }
            $('#property_table tbody').html(content);
        }

        getPropertyHtml(name:string, value:string): string {
            var content: string = '<tr class="property">';
            content += '<td class="vert-align">' + name + '</td>';
            content += '<td class="vert-align"><div class="input-group">';
            content += '<input type="text" class="form-control" value="' + value + '">';
            content += '</div></td></tr>';
            return content;
        }

        createDefaultNode(x:number, y:number, properties: PropertiesMap, image:string): void {
            this.nodeIndex++;
            var name: string = "Node" + this.nodeIndex;
            var node: DefaultDiagramNode = new DefaultDiagramNode(name, x, y, properties, image);
            this.nodesList[node.getElement().id] = node;
            this.graph.addCell(node.getElement());
        }

        clear(): void {
            this.graph.clear();
            this.nodeIndex = -1;
            this.nodesList = {};
            this.currentNode = undefined;
        }

        removeCurrentElement(): void {
            if (this.currentNode) {
                console.log("Node was deleted");
                delete this.nodesList[this.currentNode.getElement().id];
                this.currentNode.getElement().remove();
                $(".property").remove();
                this.currentNode = undefined;
            }
        }

        saveDiagram(): void {
            console.log(this.exportToJSON());
            $.ajax({
                type: 'POST',
                url: 'save',
                dataType: 'json',
                contentType: 'application/json',
                data: (this.exportToJSON()),
                success: function (response) {
                    console.log(response.message);
                },
                error: function (response, status, error) {
                    console.log("error: " + status + " " + error + " " + response.message);
                }
            });
        }

        openDiagram(): void {
            var controller = this;
            var id: number = parseInt(prompt("input id"));
            $.ajax({
                type: 'POST',
                url: 'open',
                dataType: 'json',
                contentType: 'application/json',
                data: (JSON.stringify({diagramId: id})),
                success: function (response) {
                    controller.import(response);
                    console.log(response.nodeIndex);
                },
                error: function (response, status, error) {
                    console.log("error: " + status + " " + error);
                }
            });
        }

        exportToJSON(): string {
            var json = {
                'nodeIndex': this.nodeIndex,
                'nodes': [],
                'links': []
            };
            for (var id in this.nodesList) {
                if (this.nodesList.hasOwnProperty(id)) {
                    var node: DiagramNode = this.nodesList[id];
                    var newNode = {
                        'name': node.getName(),
                        'x': node.getX(),
                        'y': node.getY(),
                        'image': node.getImagePath(),
                        'properties': []
                    };

                    var properties: PropertiesMap = node.getProperties();
                    for (var name in properties) {
                        var property = {
                            'name': name,
                            'value': properties[name]
                        };
                        newNode.properties.push(property);
                    }

                    json.nodes.push(newNode);
                }
            }

            var controller: DiagramController = this;

            this.graph.getLinks().forEach(function (link) {
                var src: string = controller.nodesList[link.get('source').id].getName();
                var target: string = controller.nodesList[link.get('target').id].getName();
                var vertices = controller.exportVertices(link.get('vertices'))
                var newLink = {
                    'source' : src,
                    'target' : target,
                    'vertices' : vertices
                };
                json.links.push(newLink);
            });

            return JSON.stringify(json);
        }

        exportVertices(vertices) {
            var count: number = 1;
            var newVertices = [];
            vertices.forEach(function (vertex) {
                newVertices.push(
                    {
                        x : vertex.x,
                        y : vertex.y,
                        number : count
                    }
                )
                count++;
            });
            return newVertices;
        }

        import(response): void {
            console.log("import diagram");
            this.clear();
            this.nodeIndex = response.nodeIndex;
            for (var i = 0; i < response.nodes.length; i++) {
                var nodeObject = response.nodes[i];

                var properties: PropertiesMap = {}
                var propertiesObject = nodeObject.properties;

                for (var j = 0; j < propertiesObject.length; j++) {
                    properties[propertiesObject[j].name] = propertiesObject[j].value;
                }

                this.importNode(nodeObject.name, nodeObject.x, nodeObject.y, properties, nodeObject.image);
            }

            for (var i = 0; i < response.links.length; i++) {
                var linkObject = response.links[i];
                this.importLink(linkObject.source, linkObject.target, linkObject.vertices);
            }
        }

        importNode(name:string, x:number, y:number, properties, image:string): void {
            var node: DefaultDiagramNode = new DefaultDiagramNode(name, x, y, properties, image);
            this.nodesList[node.getElement().id] = node;
            this.graph.addCell(node.getElement());
        }

        importLink(sourceNodeId:string, targetNodeId:string, vertices): void {
            var sourceId: string = this.getElementIdByNodeId(sourceNodeId);
            var targetId: string = this.getElementIdByNodeId(targetNodeId);
            var newVertices = this.importVertices(vertices);
            var link: joint.dia.Link = new joint.dia.Link({
                attrs: {
                    '.connection': { stroke: 'black' },
                    '.marker-target': { fill: 'black', d: 'M 10 0 L 0 5 L 10 10 z' }
                },
                source: { id: sourceId },
                target: { id: targetId },
                vertices: newVertices
            });
            this.graph.addCell(link);
        }

        importVertices(vertices) {
            var newVertices = [];
            vertices.forEach(function (vertex) {
                newVertices.push(
                    {
                        x : vertex.x,
                        y : vertex.y
                    }
                )
            });
            return newVertices;
        }

        getElementIdByNodeId(nodeId:string): string {
            for (var id in this.nodesList) {
                if (this.nodesList.hasOwnProperty(id)) {
                    var node = this.nodesList[id];
                    if (node.getName() === nodeId) {
                        return id;
                    }
                }
            }
            return undefined;
        }
    }
}