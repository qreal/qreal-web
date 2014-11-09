module Controllers {

    export class diagramController {
        graph = new joint.dia.Graph;
        paper = new joint.dia.Paper({
            el: $('#paper'),
            width: $('#paper').width(),
            height: $('#paper').height(),
            model: this.graph,
            gridSize: 25,
            defaultLink: new joint.dia.Link({
                attrs: {
                    '.connection': { stroke: 'black' },
                    '.marker-target': { fill: 'black', d: 'M 10 0 L 0 5 L 10 10 z' }
                }
            }),
            validateConnection: function (cellViewS, magnetS, cellViewT, magnetT, end, linkView) {
                return (!(magnetT && magnetT.getAttribute('type') === 'output') && !(cellViewT && cellViewT.model.get('type') === 'link'));
            },
            validateMagnet: function (cellView, magnet) {
                return magnet.getAttribute('magnet') !== 'passive';
            }
        });

        nodesList = {};
        currentNode:DiagramNode;
        nodeIndex = -1;

        constructor($scope, $compile) {
            $scope.vm = this;
            $scope.vm.loadElementsFromXml("configs/elements.xml", $scope, $compile);

            this.paper.on('cell:pointerdown',
                function (cellView, evt, x, y) {
                    console.log('cell view ' + cellView.model.id + ' was clicked');

                    var node:DiagramNode = $scope.vm.nodesList[cellView.model.id];
                    if (node) {
                        $scope.vm.currentNode = node;
                        $scope.vm.setNodeProperties(node);
                    } else {
                        $scope.vm.currentNode = undefined;
                    }
                }
            );
            this.paper.on('blank:pointerdown',
                function (evt, x, y) {
                    console.log('blank was clicked');
                    $(".property").remove();
                    $scope.vm.currentNode = undefined;
                }
            );

            $(document).on('change', '.form-control', function () {
                var tr = $(this).closest('tr');
                var name = tr.find('td:first').html();
                var value = $(this).val();
                $scope.vm.currentNode.setProperty(name, value);
            });

        }

        loadElementsFromXml(pathToXML:string, $scope, $compile) {
            var xmlDoc = this.loadXMLDoc(pathToXML);
            var content = '';
            var categories = xmlDoc.getElementsByTagName("Category");
            for (var k = 0; k < categories.length; k++) {
                content += '<li><p>' + categories[k].getAttribute('name') + '</p><ul>';
                var elements = categories[k].getElementsByTagName("Element");

                for (var i = 0; i < elements.length; i++) {
                    content += '<li><div class="tree_element" ng-click="vm.createDefaultNode(100, 50, {';

                    var elementProperties = elements[i].getElementsByTagName("Property");

                    for (var j = 0; j < elementProperties.length; j++) {
                        content += '\'' + elementProperties[j].getAttribute('name') + '\' : ';
                        if (elementProperties[j].childNodes[0]) {
                            content += '\'' + elementProperties[j].childNodes[0].nodeValue + '\'';
                        } else {
                            content += '\'\'';
                        }
                        if (j != elementProperties.length - 1) {
                            content += ',';
                        }
                    }
                    content += '}, \'';
                    var image = elements[i].getElementsByTagName("Image")[0].getAttribute('src');
                    content += image + '\'';
                    content += ')">';
                    content += '<img src="' + image + '" width="30" height="30" /> ';
                    content += elements[i].getAttribute('name');
                    content += '</div></li>';
                }

                content += '</ul></li>';
            }

            $('#navigation').append($compile(content)($scope));
        }

        setNodeProperties(node:DiagramNode) {
            var properties = node.getProperties();
            var content = '';
            for (var property in properties) {
                content += this.getPropertyHtml(property, properties[property]);
            }
            $('#property_table tbody').html(content);
        }

        getPropertyHtml(name:string, value:string) {
            var content = '<tr class="property">';
            content += '<td class="vert-align">' + name + '</td>';
            content += '<td class="vert-align"><div class="input-group">';
            content += '<input type="text" class="form-control" value="' + value + '">';
            content += '</div></td></tr>';
            return content;
        }

        createDefaultNode(x:number, y:number, properties, image:string) {
            this.nodeIndex++;
            var name = "Node" + this.nodeIndex;
            var node:DefaultDiagramNode = new DefaultDiagramNode(name, x, y, properties, image);
            this.nodesList[node.getElement().id] = node;
            this.graph.addCell(node.getElement());
        }

        clear() {
            this.graph.clear();
            this.nodeIndex = -1;
            this.nodesList = {};
            this.currentNode = undefined;
        }

        loadXMLDoc(name:string) {
            var xmlDoc;
            if (XMLHttpRequest) {
                xmlDoc = new XMLHttpRequest();
                xmlDoc.open("GET", name, false);
                xmlDoc.send("");
                return xmlDoc.responseXML;
            }
            if (ActiveXObject("Microsoft.XMLDOM")) {
                xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
                xmlDoc.async = false;
                xmlDoc.load(name);
                return xmlDoc;
            }
            alert("Error loading document!");
            return null;
        }

        removeCurrentElement() {
            if (this.currentNode) {
                console.log("Node was deleted");
                delete this.nodesList[this.currentNode.getElement().id];
                this.currentNode.getElement().remove();
                $(".property").remove();
                this.currentNode = undefined;
                console.log(this.nodesList);
            }
        }

        saveDiagram() {
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

        openDiagram() {
            var controller = this;
            $.ajax({
                type: 'POST',
                url: 'open',
                dataType: 'json',
                contentType: 'application/json',
                data: (JSON.stringify({diagramId: 2})),
                success: function (response) {
                    controller.import(response);
                    console.log(response.nodeIndex);
                },
                error: function (response, status, error) {
                    console.log("error: " + status + " " + error);
                }
            });
        }

        exportToJSON() {
            var json = {
                'nodeIndex': this.nodeIndex,
                'nodes': [],
                'links': []
            };
            for (var id in this.nodesList) {
                if (this.nodesList.hasOwnProperty(id)) {
                    var node = this.nodesList[id];
                    var newNode = {
                        'name': node.getName(),
                        'x': node.getX(),
                        'y': node.getY(),
                        'image': node.getImagePath(),
                        'properties': []
                    };

                    var properties = node.getProperties();
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

            var nodes = this.nodesList;

            this.graph.getLinks().forEach(function (link) {
                var src = nodes[link.get('source').id].getName();
                var target = nodes[link.get('target').id].getName();
                var newLink = {
                    'source': src,
                    'target': target
                };
                json.links.push(newLink);
            });

            return JSON.stringify(json);
        }

        import(response) {
            console.log("import diagram");
            this.clear();
            this.nodeIndex = response.nodeIndex;
            for (var i = 0; i < response.nodes.length; i++) {
                var node = response.nodes[i];

                var properties = {}
                var propertiesObject = node.properties;

                for (var j = 0; j < propertiesObject.length; j++) {
                    properties[propertiesObject[j].name] = propertiesObject[j].value;
                }

                this.importNode(node.name, node.x, node.y, properties, node.image);
            }

            for (var i = 0; i < response.links.length; i++) {
                var link = response.links[i];
                this.importLink(link.source, link.target);
            }
        }

        importNode(name:string, x:number, y:number, properties, image:string) {
            var node:DefaultDiagramNode = new DefaultDiagramNode(name, x, y, properties, image);
            this.nodesList[node.getElement().id] = node;
            this.graph.addCell(node.getElement());
        }

        importLink(sourceNodeId:string, targetNodeId:string) {
            var sourceId = this.getElementIdByNodeId(sourceNodeId);
            var targetId = this.getElementIdByNodeId(targetNodeId);
            var link = new joint.dia.Link({
                attrs: {
                    '.connection': { stroke: 'black' },
                    '.marker-target': { fill: 'black', d: 'M 10 0 L 0 5 L 10 10 z' }
                },
                source: { id: sourceId },
                target: { id: targetId }
            });
            this.graph.addCell(link);
        }

        getElementIdByNodeId(nodeId:string) {
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