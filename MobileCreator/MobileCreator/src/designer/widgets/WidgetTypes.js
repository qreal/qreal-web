define(["require", "exports"], function(require, exports) {
    var WidgetTypes = (function () {
        function WidgetTypes() { }
        WidgetTypes.Unknown = -1;
        WidgetTypes.LinearLayout = 0;
        WidgetTypes.Button = 1;
        WidgetTypes.ImageView = 2;
        WidgetTypes.TextView = 3;
        WidgetTypes.WebView = 4;
        WidgetTypes.EditText = 5;
        WidgetTypes.Map = 6;
        return WidgetTypes;
    })();
    exports.WidgetTypes = WidgetTypes;    
})
//@ sourceMappingURL=WidgetTypes.js.map
