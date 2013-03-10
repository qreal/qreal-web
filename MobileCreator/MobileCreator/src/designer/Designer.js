define(["require", "exports", "utils/log/Log", "designer/preferences/ElementPreferences", "designer/preferences/LinearLayoutPreferences", "designer/widgets/LinearLayout", "designer/preferences/TextViewPreferences", "designer/widgets/TextView", "designer/preferences/ImageViewPreferences", "designer/widgets/ImageView", "designer/preferences/ButtonPreferences", "designer/widgets/Button"], function(require, exports, __mLog__, __mElementPreferences__, __mLinearLayoutPreferences__, __mLinearLayout__, __mTextViewPreferences__, __mTextView__, __mImageViewPreferences__, __mImageView__, __mButtonPreferences__, __mButton__) {
    var mLog = __mLog__;

    var mElementPreferences = __mElementPreferences__;

    var mLinearLayoutPreferences = __mLinearLayoutPreferences__;

    var mLinearLayout = __mLinearLayout__;

    var mTextViewPreferences = __mTextViewPreferences__;

    var mTextView = __mTextView__;

    var mImageViewPreferences = __mImageViewPreferences__;

    var mImageView = __mImageView__;

    var mButtonPreferences = __mButtonPreferences__;

    var mButton = __mButton__;

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
                type: "POST",
                contentType: "text/XML",
                processData: false,
                data: xml,
                success: function (data) {
                    var servResp = eval(data);
                    if(!servResp.success) {
                        alert("Error sending XML: " + servResp.msg);
                    } else {
                        alert("Fuck yeah!");
                    }
                }
            });
        };
        return Designer;
    })();
    exports.Designer = Designer;    
})
