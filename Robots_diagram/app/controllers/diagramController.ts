module Controllers {

    export class diagramController {
        graph = new joint.dia.Graph;
        paper = new joint.dia.Paper({
            el: $('#paper'),
            width: $('#paper').width(),
            height: $('#paper').height(),
            model: this.graph,
            gridSize: 1,
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

        constructor($scope, $compile) {
            $scope.vm = this;

            var xmlDoc = this.loadXMLDoc("configs/properties.xml") // Path to the XML file;
            var elements = xmlDoc.getElementsByTagName("Element");
            var content = '';
            for (var i = 0; i < elements.length; i++) {
                content += '<p><button type="button" class="btn btn-default" ng-click="vm.createDefaultNode({';
                var elementProperties = elements[i].getElementsByTagName("Property");

                for (var j = 0; j < elementProperties.length; j++) {
                    content += '\'' + elementProperties[j].getAttribute('name') + '\' : ';
                    content += '\'' + elementProperties[j].childNodes[0].nodeValue + '\'';
                    if (j != elementProperties.length - 1) {
                        content += ',';
                    }
                }
                content += '}, \'';
                content += elements[i].getElementsByTagName("Image")[0].getAttribute('src') + '\'';
                content += ')">' + elements[i].getAttribute('name') + '</button></p>';
            }

            $('#right-menu').append($compile(content)($scope));

            this.paper.on('cell:pointerdown',
                function (cellView, evt, x, y) {
                    console.log('cell view ' + cellView.model.id + ' was clicked');

                    $scope.vm.nodesList.forEach(function (node) {
                        if (node.getElement().id == cellView.model.id) {
                            $scope.vm.currentNode = node;
                            $scope.vm.setNodeProperties(node);
                        }
                    });
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
    }
}