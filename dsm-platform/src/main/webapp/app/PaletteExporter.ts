class PaletteExporter {
    public exportPaletteToJson(nodesMap: Map<DiagramNode>, linksMap: Map<Link>, namePalette: string) {
        var json = {
            'paletteName': namePalette,
            'nodes': []
        };
        json.nodes = this.getEntities(nodesMap, linksMap);

        return json;
    }

    private getEntities(nodesMap: Map<DiagramNode>, linksMap: Map<Link>) {
        var json = [];
        for (var id in nodesMap) {
            var node: DiagramNode = nodesMap[id];
            if (node.getName() === "Entity") {
                var nodeJSON = {
                    'name': node.getChangeableProperties()['name'].value,
                    'image': "/dsmPlatform/images/" + node.getChangeableProperties()['image'].value + ".svg",
                    'properties': []
                };
                nodeJSON.properties = this.getProperties(nodesMap, linksMap, node);
                json.push(nodeJSON);
            }
        }
        return json;
    }

    private getProperties(nodesMap: Map<DiagramNode>, linksMap: Map<Link>, node: DiagramNode) {
        var json = [];
        for (var id in linksMap) {
            var link = linksMap[id];
            var jointObject = link.getJointObject();
            if (nodesMap[jointObject.get('target').id] === node) {
                var property = nodesMap[jointObject.get('source').id];
                var propertyJSON = {
                    'name': property.getChangeableProperties()['name'].value,
                    'value': property.getChangeableProperties()['value'].value,
                    'type': property.getChangeableProperties()['type'].value
                };
                json.push(propertyJSON);
            }
        }
        return json;
    }

}