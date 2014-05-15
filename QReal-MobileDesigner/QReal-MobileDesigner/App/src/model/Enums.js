define(["require", "exports"], function(require, exports) {
    var Enums;
    (function (Enums) {
        (function (ControlType) {
            ControlType[ControlType["App"] = 0] = "App";
            ControlType[ControlType["Page"] = 1] = "Page";
            ControlType[ControlType["Header"] = 2] = "Header";
            ControlType[ControlType["Button"] = 3] = "Button";
            ControlType[ControlType["Input"] = 4] = "Input";
            ControlType[ControlType["Map"] = 5] = "Map";
        })(Enums.ControlType || (Enums.ControlType = {}));
        var ControlType = Enums.ControlType;

        (function (PropertyType) {
            PropertyType[PropertyType["Id"] = 0] = "Id";
            PropertyType[PropertyType["Text"] = 1] = "Text";
            PropertyType[PropertyType["Inline"] = 2] = "Inline";
            PropertyType[PropertyType["Corners"] = 3] = "Corners";
            PropertyType[PropertyType["Mini"] = 4] = "Mini";
            PropertyType[PropertyType["Theme"] = 5] = "Theme";
            PropertyType[PropertyType["Title"] = 6] = "Title";
            PropertyType[PropertyType["Header"] = 7] = "Header";
            PropertyType[PropertyType["Size"] = 8] = "Size";
            PropertyType[PropertyType["Padding"] = 9] = "Padding";
            PropertyType[PropertyType["Placeholder"] = 10] = "Placeholder";
        })(Enums.PropertyType || (Enums.PropertyType = {}));
        var PropertyType = Enums.PropertyType;
    })(Enums || (Enums = {}));

    
    return Enums;
});
//# sourceMappingURL=Enums.js.map
