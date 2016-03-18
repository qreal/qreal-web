class PaletteExporter {
    public exportPaletteToJson(nodesMap: Map<DiagramNode>, namePalette: string) {
        var json = {
            'name': namePalette,
            'nodes': []
        };
        json.nodes = this.getEntities(nodesMap);

        return json;
    }

    private getEntities(nodesMap: Map<DiagramNode>) {
        var json = [];
        for (var id in nodesMap) {
            var node: DiagramNode = nodesMap[id];
            var nodeJSON = {
                'name': node.getChangeableProperties()['name'].value,
                'image': node.getChangeableProperties()['image'].value
            };
            json.push(nodeJSON);
        }
        return json;
    }

}