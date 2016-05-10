/// <reference path="vendor.d.ts" />

class PaletteParser {
    private controller: PaletteDiagramEditorController;

    constructor(controller: PaletteDiagramEditorController) {
        this.controller = controller;
    }

    public parse(json: any) {
        var newPalette = new PaletteTypes();
        var basePalette: Map<NodeType> = {};
        var nodes = json.nodes;
        var nodeTypesMap = {};
        for (var i = 0; i < nodes.length; i++) {
            var nodeName = nodes[i].name;
            var nodeImage = nodes[i].image;
            var nodeProperties: Map<Property> = {};
            var properties = nodes[i].properties;
            for (var j = 0; j < properties.length; j++) {
                var propertyName = properties[j].name;
                var propertyType = properties[j].type;
                if (propertyType === "dropdown") {
                    console.log("dropdown");
                }
                var property: Property = new Property(propertyName, properties[j].type, properties[j].value);
                nodeProperties[propertyName] = property;
            }
            var node = new NodeType(nodeName, nodeProperties, nodeImage);
            basePalette[nodeName] = node;
            nodeTypesMap[nodeName] = node;
        }
        this.controller.setNodeTypesMap(nodeTypesMap);
        newPalette.categories[name] = basePalette;
        return(newPalette);
    }
/*
    private addVariantList(typeName: string, propertyKey: string, variantsArrayNode: any): void {
        var variants: Variant[] = [];
        for (var i in variantsArrayNode) {
            var variant = variantsArrayNode[i];
            variants.push(new Variant(variant.key, variant.value));
        }
        VariantListMapper.addVariantList(typeName, propertyKey, variants);
    }*/
}