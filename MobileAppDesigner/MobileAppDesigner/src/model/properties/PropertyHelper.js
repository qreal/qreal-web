define(["require", "exports", "src/properties/Property", "src/properties/ButtonProperty"], function(require, exports, __Property__, __ButtonProperty__) {
    var Property = __Property__;
    var ButtonProperty = __ButtonProperty__;

    var PropertyHelper = (function () {
        function PropertyHelper() {
        }
        PropertyHelper.ToJson = function (property) {
            return JSON.stringify(property);
        };

        PropertyHelper.FromJson = function (json) {
            var jsonData = JSON.parse(json);
            var type = jsonData.type;
            var property = this.instance['Create' + type](jsonData);
            return property;
        };

        PropertyHelper.prototype.CreateProperty = function (jsonData, property) {
            if (typeof property === "undefined") { property = new Property(); }
            property.Type = jsonData.type;
            return property;
        };

        PropertyHelper.prototype.CreateButton = function (jsonData, property) {
            if (typeof property === "undefined") { property = new ButtonProperty(); }
            this.CreateProperty(jsonData, property);
            property.Type = jsonData.type;
            property.Id = jsonData.id;
            property.Text = jsonData.text;
            return property;
        };
        PropertyHelper.instance = new PropertyHelper();
        return PropertyHelper;
    })();

    
    return PropertyHelper;
});
//# sourceMappingURL=PropertyHelper.js.map
