var PaletteLoader = (function () {
    function PaletteLoader() {
    }
    PaletteLoader.loadElementsFromXml = function (controller, pathToXML, $scope, $compile) {
        var req = XmlHttpFactory.createXMLHTTPObject();
        if (!req) {
            alert("Can't load xml document!");
            return null;
        }
        req.open("GET", pathToXML, true);
        req.onreadystatechange = function () {
            PaletteLoader.parseElementsXml(req, controller, $scope, $compile);
        };
        req.send(null);
    };
    PaletteLoader.addDropdownList = function (typeName, propertyName, variants) {
        var list = [];
        for (var i = 0; i < variants.length; i++) {
            list.push(variants[i].childNodes[0].nodeValue);
        }
        DropdownListManager.addDropdownList(typeName, propertyName, list);
    };
    PaletteLoader.parseElementsXml = function (req, controller, $scope, $compile) {
        try {
            if (req.readyState == 4) {
                if (req.status == 200) {
                    var xmlDoc = req.responseXML;
                    var nodeTypesMap = {};
                    var content = '';
                    var categories = xmlDoc.getElementsByTagName("Category");
                    for (var k = 0; k < categories.length; k++) {
                        content += '<li><p>' + categories[k].getAttribute('name') + '</p><ul>';
                        var elements = categories[k].getElementsByTagName("Element");
                        for (var i = 0; i < elements.length; i++) {
                            var typeName = elements[i].getAttribute('name');
                            nodeTypesMap[typeName] = new NodeType();
                            content += '<li><div class="tree_element">';
                            var elementProperties = elements[i].getElementsByTagName("Property");
                            var properties = {};
                            for (var j = 0; j < elementProperties.length; j++) {
                                var propertyName = elementProperties[j].getAttribute('name');
                                var propertyType = elementProperties[j].getAttribute('type');
                                if (propertyType === "dropdown") {
                                    this.addDropdownList(typeName, propertyName, elementProperties[j].getElementsByTagName("Variants")[0].getElementsByTagName("variant"));
                                }
                                var propertyValue;
                                var valueElement = elementProperties[j].getElementsByTagName("value")[0];
                                if (valueElement.childNodes[0]) {
                                    propertyValue = valueElement.childNodes[0].nodeValue;
                                }
                                else {
                                    propertyValue = '';
                                }
                                var property = new Property(propertyValue, propertyType);
                                properties[propertyName] = property;
                            }
                            var image = elements[i].getElementsByTagName("Image")[0].getAttribute('src');
                            nodeTypesMap[typeName].image = image;
                            nodeTypesMap[typeName].properties = properties;
                            content += '<img class="elementImg" src="' + image + '" width="30" height="30"' + '/>';
                            content += typeName;
                            content += '</div></li>';
                        }
                        content += '</ul></li>';
                    }
                    $('#navigation').append($compile(content)($scope));
                    $("#navigation").treeview({
                        persist: "location"
                    });
                    controller.setNodeTypesMap(nodeTypesMap);
                    controller.initPalette();
                }
                else {
                    alert("Can't load palette:\n" + req.statusText);
                }
            }
        }
        catch (e) {
            alert("Palette loading error: " + e.message);
        }
    };
    return PaletteLoader;
})();
//# sourceMappingURL=PaletteLoader.js.map