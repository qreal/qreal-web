define(["require", "exports", "utils/log/Log", "designer/model/DesignerModel", "designer/controller/DesignerController", "designer/view/DesignerView"], function(require, exports, __mLog__, __mDesignerModel__, __mDesignerController__, __mDesignerView__) {
    var mLog = __mLog__;

    var mDesignerModel = __mDesignerModel__;

    var mDesignerController = __mDesignerController__;

    var mDesignerView = __mDesignerView__;

    var Designer = (function () {
        function Designer() {
            this.logger = new mLog.Logger("Designer");
        }
        Designer.instance = new Designer();
        Designer.prototype.initDesigner = function () {
            this.logger.log("Init designer");
            var parentDiv = $("#menu");
            var designerMenuDiv = document.createElement("ul");
            $(designerMenuDiv).attr("data-role", "listview");
            $(designerMenuDiv).attr("data-inset", "true");
            $(designerMenuDiv).attr("data-divider-theme", "d");
            var formsTreeHeader = document.createElement("li");
            $(formsTreeHeader).attr("data-role", "list-divider");
            $(formsTreeHeader).text("Forms");
            $(designerMenuDiv).append($(formsTreeHeader));
            var elementsPalleteHeader = document.createElement("li");
            $(elementsPalleteHeader).attr("data-role", "list-divider");
            $(elementsPalleteHeader).text("Widgets");
            $(designerMenuDiv).append($(elementsPalleteHeader));
            var elementsPalleteContainer = document.createElement("li");
            $(designerMenuDiv).append($(elementsPalleteContainer));
            var elementsPallete = document.createElement("div");
            $(elementsPallete).addClass("ui-grid-b");
            $(elementsPalleteContainer).append($(elementsPallete));
            var buttonElementField = document.createElement("div");
            $(buttonElementField).addClass("ui-block-a");
            var buttonElement = document.createElement("button");
            $(buttonElement).text("Button");
            $(buttonElementField).append($(buttonElement));
            $(elementsPallete).append($(buttonElementField));
            var textViewElementField = document.createElement("div");
            $(textViewElementField).addClass("ui-block-b");
            var textViewElement = document.createElement("button");
            $(textViewElement).text("TextView");
            $(textViewElementField).append($(textViewElement));
            $(elementsPallete).append($(textViewElementField));
            var imageViewElementField = document.createElement("div");
            $(imageViewElementField).addClass("ui-block-c");
            var imageViewElement = document.createElement("button");
            $(imageViewElement).text("ImageView");
            $(imageViewElementField).append($(imageViewElement));
            $(elementsPallete).append($(imageViewElementField));
            $(parentDiv).prepend($(designerMenuDiv));
            $(designerMenuDiv).listview();
            $(buttonElement).button();
            $(textViewElement).button();
            $(imageViewElement).button();
            var model = new mDesignerModel.DesignerModel();
            var controller = new mDesignerController.DesignerController(model);
            var view = new mDesignerView.DesignerView(controller);
            controller.View = view;
        };
        return Designer;
    })();
    exports.Designer = Designer;    
})
