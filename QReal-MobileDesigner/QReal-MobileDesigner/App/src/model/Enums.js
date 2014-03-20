define(["require", "exports"], function(require, exports) {
    var Enums;
    (function (Enums) {
        (function (ControlType) {
            ControlType[ControlType["Page"] = 0] = "Page";
            ControlType[ControlType["Button"] = 1] = "Button";
            ControlType[ControlType["Input"] = 2] = "Input";
        })(Enums.ControlType || (Enums.ControlType = {}));
        var ControlType = Enums.ControlType;

        (function (PropertyType) {
            PropertyType[PropertyType["Text"] = 0] = "Text";
            PropertyType[PropertyType["Id"] = 1] = "Id";
            PropertyType[PropertyType["Inline"] = 2] = "Inline";
            PropertyType[PropertyType["Corners"] = 3] = "Corners";
            PropertyType[PropertyType["Mini"] = 4] = "Mini";
            PropertyType[PropertyType["Theme"] = 5] = "Theme";

            PropertyType[PropertyType["Title"] = 6] = "Title";
        })(Enums.PropertyType || (Enums.PropertyType = {}));
        var PropertyType = Enums.PropertyType;
    })(Enums || (Enums = {}));

    
    return Enums;
});
//# sourceMappingURL=Enums.js.map
