define(["require", "exports"], function(require, exports) {
    
    var DesignerView = (function () {
        function DesignerView(baseDiv) {
            this.baseDiv = baseDiv;
        }
        DesignerView.prototype.initDesigner = function () {
            var designerMenuDiv = document.createElement("div");
            designerMenuDiv.setAttribute("id", "designerMenu");
            var designerSceneDiv = document.createElement("div");
            designerSceneDiv.setAttribute("id", "designerScene");
            this.baseDiv.prepend(designerSceneDiv);
            this.baseDiv.prepend(designerMenuDiv);
        };
        return DesignerView;
    })();
    exports.DesignerView = DesignerView;    
})
