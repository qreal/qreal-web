/// <reference path="../../lib/jquery.d.ts" />
/// <reference path="../../lib/knockout.d.ts" />
/// <reference path="../../lib/jquerymobile.d.ts" />
import mLog = module("utils/log/Log");
import mElementPreferences = module("designer/preferences/ElementPreferences");
import mLinearLayoutPreferences = module("designer/preferences/LinearLayoutPreferences");
import mLinearLayout = module("designer/widgets/LinearLayout");
import mTextViewPreferences = module("designer/preferences/TextViewPreferences");
import mTextView = module("designer/widgets/TextView");
import mImageViewPreferences = module("designer/preferences/ImageViewPreferences");
import mImageView = module("designer/widgets/ImageView");
import mButtonPreferences = module("designer/preferences/ButtonPreferences");
import mButton = module("designer/widgets/Button");

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

        var form = $("#form");
        var layoputPreferences = new mLinearLayoutPreferences.LinearLayoutPreferences();
        layoputPreferences.Orientation = mLinearLayoutPreferences.LinearLayoutPreferences.Vertical;
        layoputPreferences.Background = "#ffffff";
        layoputPreferences.Height = mElementPreferences.ElementPreferences.FillParent;
        layoputPreferences.Id = 0;
        layoputPreferences.Width = mElementPreferences.ElementPreferences.FillParent;
        var layout = new mLinearLayout.LinearLayout(layoputPreferences);
        $(buttonElement).click(function () {
            var buttonPreferences = new mButtonPreferences.ButtonPreferences();
            buttonPreferences.ButtonId = "buttoned";
            buttonPreferences.Height = mElementPreferences.ElementPreferences.WrapContent;
            buttonPreferences.Id = 3;
            buttonPreferences.LayoutMarginTop = 20;
            buttonPreferences.OnClickHandler = "onFullInfoClick";
            buttonPreferences.Text = "Full info";
            buttonPreferences.TextSize = 20;
            buttonPreferences.Width = mElementPreferences.ElementPreferences.WrapContent;
            var button = new mButton.Button(buttonPreferences);
            layout.addChild(button);
            button.init();
        });
        $(textViewElement).click(function () {
            var textViewPreferences = new mTextViewPreferences.TextViewPreferences();
            textViewPreferences.Height = mElementPreferences.ElementPreferences.WrapContent;
            textViewPreferences.Id = 2;
            textViewPreferences.LayoutMarginTop = 10;
            textViewPreferences.Padding = 20;
            textViewPreferences.Text = "TROLOLO!";
            textViewPreferences.TextSize = 20;
            textViewPreferences.Width = mElementPreferences.ElementPreferences.FillParent;
            var textView = new mTextView.TextView(textViewPreferences);
            layout.addChild(textView);
            textView.init();
        });
        $(imageViewElement).click(function () {
            var imageViewPreferences = new mImageViewPreferences.ImageViewPreferences();
            imageViewPreferences.Height = mElementPreferences.ElementPreferences.WrapContent;
            imageViewPreferences.Id = 1;
            imageViewPreferences.LayoutGravity = "center_horizontal";
            imageViewPreferences.LayoutMarginTop = 10;
            imageViewPreferences.Src = "#0000ff";
            imageViewPreferences.Width = mElementPreferences.ElementPreferences.WrapContent;
            imageViewPreferences.ImageURL = "https://dl.dropbox.com/u/10802739/lt_logo.jpg";
            var imageView = new mImageView.ImageView(imageViewPreferences);
            layout.addChild(imageView);
            imageView.init();
        });
             
        form.append(layout.DomElement);
        
        var xml = layout.toXML();
        $.ajax("default.htm", {
            type: "POST", contentType: "text/XML", processData: false, data: xml, success: function (data) {
                var servResp = eval(data);
                if (!servResp.success) {
                    alert("Error sending XML: " + servResp.msg);
                }
                else {
                    alert("Fuck yeah!");
                }
            }
    });
}
