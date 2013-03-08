define(["require", "exports"], function(require, exports) {
    
    
    
    var DesignerView = (function () {
        function DesignerView(controller, form) {
            this.controller = controller;
            this.form = form;
        }
        Object.defineProperty(DesignerView.prototype, "BaseLayout", {
            get: function () {
                return this.baseLayout;
            },
            set: function (widgetView) {
                this.baseLayout = widgetView;
            },
            enumerable: true,
            configurable: true
        });
        DesignerView.prototype.draw = function () {
            this.baseLayout.draw();
            this.form.append(this.baseLayout.Control);
        };
        return DesignerView;
    })();
    exports.DesignerView = DesignerView;    
})
