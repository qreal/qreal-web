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
import mForm = module("designer/Form")


export class Designer {
    private logger = new mLog.Logger("Designer");

    public static instance = new Designer();

    private static forms: mForm.Form[] = [];
    private static formNames: string[] = [];

    private static formsDomElement = $("#form");

    private static activeForm: mForm.Form;

    constructor() {
    }

    public addForm(formName: string) {
        Designer.activeForm.hide()
        Designer.activeForm = new mForm.Form(formName, Designer.formsDomElement);
        Designer.forms.push(Designer.activeForm);
        var layoputPreferences = new mLinearLayoutPreferences.LinearLayoutPreferences();
        layoputPreferences.Orientation = mLinearLayoutPreferences.LinearLayoutPreferences.Vertical;
        layoputPreferences.Background = "#ffffff";
        layoputPreferences.Height = mElementPreferences.ElementPreferences.FillParent;
        layoputPreferences.Id = 0;
        layoputPreferences.Width = mElementPreferences.ElementPreferences.FillParent;
        var layout = new mLinearLayout.LinearLayout(layoputPreferences);
        Designer.activeForm.addElement(layout);
        Designer.activeForm.show();
        $("#formNameField").val(Designer.activeForm.FormName);
        Designer.formNames.push(formName);
    }

    public changeActiveForm(formName: string) {
        Designer.activeForm.hide();
        for (var i = 0; i < Designer.forms.length; i++) {
            if (Designer.forms[i].FormName == formName) {
                Designer.activeForm = Designer.forms[i];
                Designer.activeForm.show();
                break;
            }
        }
        $("#formNameField").val(Designer.activeForm.FormName);
    }

    public initDesigner() {
        var _this = this;
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

        var addFormButton = $("<a id=\"addFormButton\" data-role=\"button\" draggable=\"false\">New form</a>");
        $(designerMenuDiv).append(addFormButton);
        addFormButton.button();
        $(addFormButton).click(function () {
            _this.addForm("New form");
        });
        var formNameLabel = $("<label for='formNameField' >Form name: </label>");
        var formNameField = $("<input type = 'text' name = 'formNameField' id = 'formNameField' value = '' >");
        $(designerMenuDiv).append(formNameLabel);
        $(designerMenuDiv).append(formNameField);
        $(formNameField).change(function () {
            var newVal = $(formNameField).val();
            var index = Designer.formNames.indexOf(Designer.activeForm.FormName);
            Designer.formNames[index] = newVal;
            Designer.activeForm.FormName = newVal;
        });
        formNameField.textinput();
        

        var elementsPalleteHeader = document.createElement("li");
        $(elementsPalleteHeader).attr("data-role", "list-divider");
        $(elementsPalleteHeader).text("Widgets");
        $(designerMenuDiv).append($(elementsPalleteHeader));

        var elementsPalleteContainer = document.createElement("li");
        $(designerMenuDiv).append($(elementsPalleteContainer));

        var elementsPallete = document.createElement("div");
        $(elementsPallete).addClass("ui-grid-b");
        $(elementsPalleteContainer).append($(elementsPallete));

        var buttonElement = $("<a id=\"button\" data-role=\"button\" draggable=\"true\">Button</a>");
        $(elementsPallete).append(buttonElement);
        buttonElement.addClass("ui-block-a");
        buttonElement.button();

        var textViewElement = $("<a id=\"textView\" data-role=\"button\" draggable=\"true\">TextView</a>");
        $(elementsPallete).append(textViewElement);
        textViewElement.addClass("ui-block-b");
        textViewElement.button();

        var imageViewElement = $("<a id=\"textView\" data-role=\"button\" draggable=\"true\">ImageView</a>");
        $(elementsPallete).append(imageViewElement);
        imageViewElement.addClass("ui-block-c");
        imageViewElement.button();

        var propertiesEditorHeader = document.createElement("li");
        $(propertiesEditorHeader).attr("data-role", "list-divider");
        $(propertiesEditorHeader).text("Properties");
        $(designerMenuDiv).append($(propertiesEditorHeader));

        var propertiesEditorContainer = document.createElement("li");
        $(designerMenuDiv).append($(propertiesEditorContainer));

        var propertiesEditorDiv = document.createElement("div");
        propertiesEditorDiv.id = "propertiesEditor";
        $(propertiesEditorContainer).append($(propertiesEditorDiv));

        $(parentDiv).prepend($(designerMenuDiv));
        $(designerMenuDiv).listview();

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

        
        Designer.activeForm = new mForm.Form("main", Designer.formsDomElement);
        Designer.forms.push(Designer.activeForm);
        var layoputPreferences = new mLinearLayoutPreferences.LinearLayoutPreferences();
        layoputPreferences.Orientation = mLinearLayoutPreferences.LinearLayoutPreferences.Vertical;
        layoputPreferences.Background = "#ffffff";
        layoputPreferences.Height = mElementPreferences.ElementPreferences.FillParent;
        layoputPreferences.Id = 0;
        layoputPreferences.Width = mElementPreferences.ElementPreferences.FillParent;
        var layout = new mLinearLayout.LinearLayout(layoputPreferences);
        Designer.activeForm.addElement(layout);
        Designer.activeForm.show();
        this.changeActiveForm("main");
        //form.append(layout.DomElement);
       
        
        var xml = layout.toXML();
        //this.xml = xml;
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
