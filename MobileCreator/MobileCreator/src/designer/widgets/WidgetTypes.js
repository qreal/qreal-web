define(["require", "exports"], function(require, exports) {
    var WidgetTypes = (function () {
        function WidgetTypes() { }
        WidgetTypes.LinearLayout = 0;
        WidgetTypes.Button = 1;
        WidgetTypes.ImageView = 2;
        WidgetTypes.TextView = 3;
        return WidgetTypes;
    })();
    exports.WidgetTypes = WidgetTypes;    
})
