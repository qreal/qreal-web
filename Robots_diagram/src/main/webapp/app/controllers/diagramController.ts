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

        nodesList:DiagramNode[] = [];
        currentNode:DiagramNode;
        currentNodeIndex:number = -1;

        constructor($scope, $compile) {
            $scope.vm = this;
            $scope.vm.loadElementsFromXml("configs/elements.xml", $scope, $compile);

            this.paper.on('cell:pointerdown',
                function (cellView, evt, x, y) {
                    console.log('cell view ' + cellView.model.id + ' was clicked');

                    var i = 0;
                    $scope.vm.nodesList.forEach(function (node) {
                        if (node.getElement().id == cellView.model.id) {
                            $scope.vm.currentNode = node;
                            $scope.vm.setNodeProperties(node);
                            $scope.vm.currentNodeIndex = i;
                        }
                        i++;
                    });
                }
            );
            this.paper.on('blank:pointerdown',
                function (evt, x, y) {
                    console.log('blank was clicked');
                    $(".property").remove();
                    $scope.vm.currentNode = undefined;
                    $scope.vm.currentNodeIndex = -1;
                }
            );

            $(document).on('change', '.form-control', function () {
                var tr = $(this).closest('tr');
                var name = tr.find('td:first').html();
                var value = $(this).val();
                $scope.vm.currentNode.setProperty(name, value);
            });

        }

        loadElementsFromXml(pathToXML : string, $scope, $compile) {
            var xmlDoc = this.loadXMLDoc(pathToXML);
            var content = '';
            var categories = xmlDoc.getElementsByTagName("Category");
            for (var k = 0; k < categories.length; k++) {
                content += '<li><p>' + categories[k].getAttribute('name') + '</p><ul>';
                var elements = categories[k].getElementsByTagName("Element");

                for (var i = 0; i < elements.length; i++) {
                    content += '<li><div class="tree_element" ng-click="vm.createDefaultNode({';

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
                    content +=  image + '\'';
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

        createDefaultNode(properties, image : string) {
            var node:DefaultDiagramNode = new DefaultDiagramNode(properties, image);
            this.nodesList.push(node);
            this.graph.addCell(node.getElement());
        }

        clear() {
            this.graph.clear();
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
                console.log("Node " + this.currentNodeIndex + " was deleted");
                this.currentNode.getElement().remove();
                this.nodesList.splice(this.currentNodeIndex, 1);
                $(".property").remove();
                this.currentNode = undefined;
                this.currentNodeIndex = -1;
            }
        }

        saveDiagram() {
            $.ajax({
                type: 'POST',
                url: 'save.html',
                data: ({name : "save"}),
                success: function(data) {
                    alert("Save " + data);
                }
            });
        }

        openDiagram() {
            $.ajax({
                type: 'POST',
                url: 'open.html',
                data: ({name : "open"}),
                success: function(data) {
                    alert("Open " + data);
                }
            });
        }
    }
}