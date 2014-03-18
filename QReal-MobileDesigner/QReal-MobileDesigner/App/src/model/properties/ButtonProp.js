define(["require", "exports"], function(require, exports) {
    var ButtonProperty = (function () {
        function ButtonProperty(id) {
            this.id = id;
        }
        ButtonProperty.FromJson = function (json) {
            var data = JSON.parse(json);
            return new ButtonProperty(data.id);
        };
        return ButtonProperty;
    })();

    
    return ButtonProperty;
});
//# sourceMappingURL=ButtonProp.js.map
