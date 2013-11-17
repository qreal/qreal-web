define(["require", "exports", "src/util/log/Log", "src/util/events/EventManager"], function(require, exports, __Log__, __EventManager__) {
    var Log = __Log__;
    
    var EventManager = __EventManager__;

    var ToolsView = (function () {
        function ToolsView(controller) {
            this.log = new Log("ToolsView");
            this.controls = [
                {
                    id: 'Button',
                    title: 'Button',
                    tool: 'button'
                }
            ];
            this.controller = controller;
        }
        ToolsView.prototype.Init = function () {
            var _this = this;
            this.log.Debug("Init");
            $('#toolTmpl').tmpl(this.controls).appendTo('#controls');

            var toolItems = $('.tool-item');

            toolItems.on('dragstart', function (event) {
                return _this.OnDragStart(event);
            });
            toolItems.on('drag', function (event) {
                return _this.OnDrag(event);
            });
            toolItems.on('dragend', function () {
                return _this.OnDragend();
            });
        };

        ToolsView.prototype.OnDragStart = function (event) {
            this.log.Debug("OnDragStart: ");
            event.originalEvent.dataTransfer.setData("ControlId", $(event.target).closest('div').attr('id'));
        };

        ToolsView.prototype.OnDrag = function (event) {
            //this.log.Debug("OnDrag: " + event);
        };

        ToolsView.prototype.OnDragend = function () {
            this.log.Debug("OnDragend");
        };
        return ToolsView;
    })();

    
    return ToolsView;
});
//# sourceMappingURL=ToolsView.js.map
