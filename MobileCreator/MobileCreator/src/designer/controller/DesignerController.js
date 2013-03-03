define(["require", "exports"], function(require, exports) {
    
    
    var DesignerController = (function () {
        function DesignerController(model, view) {
            this.model = null;
            this.view = null;
            this.model = model;
            this.view = view || null;
        }
        Object.defineProperty(DesignerController.prototype, "View", {
            set: function (view) {
                this.view = view;
            },
            enumerable: true,
            configurable: true
        });
        return DesignerController;
    })();
    exports.DesignerController = DesignerController;    
})
