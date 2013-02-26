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
            var formsAccordion = document.createElement("div");
            formsAccordion.setAttribute("id", "formsAccordion");
            for(var i = 0; i < 4; i++) {
                var heading = document.createElement("h3");
                $(heading).text("Some form");
                var div = document.createElement("div");
                var content = document.createElement("p");
                $(content).text("STUB :(");
                $(formsAccordion).append(heading);
                $(formsAccordion).append(div);
                $(div).append(content);
            }
            $(designerMenuDiv).append(formsAccordion);
        };
        return DesignerView;
    })();
    exports.DesignerView = DesignerView;    
})
