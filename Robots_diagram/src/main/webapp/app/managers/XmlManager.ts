class XmlManager {
    static loadXMLDoc(name:string) {
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

    static loadElementsFromXml(pathToXML: string, $scope, $compile): NodeTypesMap {
        var xmlDoc = this.loadXMLDoc(pathToXML);
        var nodeTypesMap: NodeTypesMap = {};
        var content: string = '';
        var categories = xmlDoc.getElementsByTagName("Category");
        for (var k = 0; k < categories.length; k++) {
            content += '<li><p>' + categories[k].getAttribute('name') + '</p><ul>';
            var elements = categories[k].getElementsByTagName("Element");

            for (var i = 0; i < elements.length; i++) {
                var typeName: string = elements[i].getAttribute('name');
                nodeTypesMap[typeName] = new NodeType();
                content += '<li><div class="tree_element">';

                var elementProperties = elements[i].getElementsByTagName("Property");
                var properties:PropertiesMap = {};
                for (var j = 0; j < elementProperties.length; j++) {
                    var propertyName: string = elementProperties[j].getAttribute('name');
                    var propertyValue: string;
                    if (elementProperties[j].childNodes[0]) {
                        propertyValue = elementProperties[j].childNodes[0].nodeValue;
                    } else {
                        propertyValue = '';
                    }
                    properties[propertyName] = propertyValue;
                }

                var image: string = elements[i].getElementsByTagName("Image")[0].getAttribute('src');
                nodeTypesMap[typeName].image = image;
                nodeTypesMap[typeName].properties = properties;

                content += '<img class="elementImg" src="' + image + '" width="30" height="30"' + '/>';
                content += typeName;
                content += '</div></li>';
            }

            content += '</ul></li>';

            $('#navigation').append($compile(content)($scope));

            return nodeTypesMap;
        }
    }
}