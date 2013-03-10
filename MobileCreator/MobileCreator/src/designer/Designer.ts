/// <reference path="../../lib/jquery.d.ts" />
/// <reference path="../../lib/knockout.d.ts" />
/// <reference path="../../lib/jquerymobile.d.ts" />
import mLog = module("utils/log/Log");
import mDesignerModel = module("designer/model/DesignerModel")
import mSpecialValues = module("designer/model/SpecialValues")
import mForm = module("designer/model/Form")
import mWidget = module("designer/model/Widget")
import mWidgetTypes = module("designer/model/WidgetTypes")
import mDesignerController = module("designer/controller/DesignerController");
import mDesignerView = module("designer/view/DesignerView");
import mLinearLayoutView = module("designer/view/LinearLayoutView");
import mLinearLayout = module("designer/model/LinearLayout");

export class Designer {
    private logger = new mLog.Logger("Designer");

    public static instance = new Designer();

    constructor() {
    }

    public initDesigner() {
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
        $(buttonElement).click(function () {
            alert("lol");
        });

        var model = new mDesignerModel.DesignerModel();
        var controller = new mDesignerController.DesignerController(model);
        var view = new mDesignerView.DesignerView(controller, $("#form"));
        controller.View = view;
        var defaultForm = new mForm.Form(0, "default-form");
        model.addForm(defaultForm);
        var baseLayout = new mLinearLayout.LinearLayout(0, mSpecialValues.SpecialSizeValue.FillParent, mSpecialValues.SpecialSizeValue.FillParent);
        baseLayout.BackGroundColor = "#ff00ff";
        baseLayout.Orientation = mSpecialValues.SpecialLinearLayoutOrientation.Vertical;
        var baseLayoutWidget = new mLinearLayoutView.LinearLayoutView(baseLayout.Id, baseLayout.LayoutWidth, baseLayout.LayoutHeight);
        baseLayoutWidget.BackGroundColor = baseLayout.BackGroundColor;
        baseLayoutWidget.Orientation = baseLayout.Orientation;
        view.BaseLayout = baseLayoutWidget;
        view.draw();
    }
}
