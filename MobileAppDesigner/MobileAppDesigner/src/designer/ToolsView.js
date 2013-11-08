define(["require", "exports", "src/util/log/Log"], function(require, exports, __Log__) {
    var Log = __Log__;

    var ToolsView = (function () {
        function ToolsView() {
            this.log = new Log("ToolsView");
            this.controls = [
                {
                    title: 'Button',
                    icon: 'button.png'
                },
                {
                    title: 'Button2',
                    icon: 'button.png'
                },
                {
                    title: 'Button2',
                    icon: 'button.png'
                },
                {
                    title: 'Button2',
                    icon: 'button.png'
                },
                {
                    title: 'Button2',
                    icon: 'button.png'
                },
                {
                    title: 'Button2',
                    icon: 'button.png'
                }
            ];
        }
        ToolsView.prototype.Init = function () {
            this.log.Debug("Init");

            $('#toolTmpl').tmpl(this.controls).appendTo('#controls');
        };
        return ToolsView;
    })();

    
    return ToolsView;
});
//# sourceMappingURL=ToolsView.js.map
