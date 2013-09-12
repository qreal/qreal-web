define(["require", "exports", "util/log/Log"], function(require, exports, __Log__) {
    var Log = __Log__;

    var ToolsView = (function () {
        function ToolsView() {
            this.log = new Log("Controller");
        }
        ToolsView.prototype.Init = function () {
            this.log.Debug("Init");

            var img = $('<img id="button">');
            img.attr('src', 'res/button.png');
            img.appendTo('#controls');
        };
        return ToolsView;
    })();

    
    return ToolsView;
});
