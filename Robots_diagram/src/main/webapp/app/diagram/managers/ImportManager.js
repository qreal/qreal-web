var ImportManager = (function () {
    function ImportManager() {
    }
    ImportManager.import = function (response, graph, nodesMap, nodeTypesMap) {
        console.log("import diagram");
        for (var i = 0; i < response.nodes.length; i++) {
            var nodeObject = response.nodes[i];
            var properties = {};
            var propertiesObject = nodeObject.properties;
            for (var j = 0; j < propertiesObject.length; j++) {
                var property = new Property(propertiesObject[j].value, propertiesObject[j].type);
                properties[propertiesObject[j].name] = property;
            }
            this.importNode(graph, nodesMap, nodeObject.name, nodeObject.type, nodeObject.x, nodeObject.y, properties, nodeTypesMap[nodeObject.type].image);
        }
        for (var i = 0; i < response.links.length; i++) {
            var linkObject = response.links[i];
            this.importLink(graph, nodesMap, linkObject.source, linkObject.target, linkObject.vertices);
        }
        return response.nodeIndex;
    };
    ImportManager.importNode = function (graph, nodesList, name, type, x, y, properties, image) {
        var node = new DefaultDiagramNode(name, type, x, y, properties, image);
        nodesList[node.getElement().id] = node;
        graph.addCell(node.getElement());
    };
    ImportManager.importLink = function (graph, nodesList, sourceNodeId, targetNodeId, vertices) {
        var sourceId = this.getElementIdByNodeId(nodesList, sourceNodeId);
        var targetId = this.getElementIdByNodeId(nodesList, targetNodeId);
        var newVertices = this.importVertices(vertices);
        var link = new joint.dia.Link({
            attrs: {
                '.connection': { stroke: 'black' },
                '.marker-target': { fill: 'black', d: 'M 10 0 L 0 5 L 10 10 z' }
            },
            source: { id: sourceId },
            target: { id: targetId },
            vertices: newVertices
        });
        graph.addCell(link);
    };
    ImportManager.importVertices = function (vertices) {
        var newVertices = [];
        vertices.forEach(function (vertex) {
            newVertices.push({
                x: vertex.x,
                y: vertex.y
            });
        });
        return newVertices;
    };
    ImportManager.getElementIdByNodeId = function (nodesList, nodeId) {
        for (var id in nodesList) {
            if (nodesList.hasOwnProperty(id)) {
                var node = nodesList[id];
                if (node.getName() === nodeId) {
                    return id;
                }
            }
        }
        return undefined;
    };
    return ImportManager;
})();
//# sourceMappingURL=ImportManager.js.map