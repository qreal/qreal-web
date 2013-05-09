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
import mWebViewPreferences = module("designer/preferences/WebViewPreference");
import mWebView = module("designer/widgets/WebView");
import mButtonPreferences = module("designer/preferences/ButtonPreferences");
import mButton = module("designer/widgets/Button");
import mForm = module("designer/Form")
import mWidgetTypes = module("designer/widgets/WidgetTypes")
import mFormTrigger = module("designer/logic/FormTrigger")


export class Designer {
    public static id: number = 0;
    private logger = new mLog.Logger("Designer");

    public static instance = new Designer();

    private static forms: mForm.Form[] = [];
    private static formNames: string[] = [];

    private static formsDomElement = $("#form");

    private static activeForm: mForm.Form;

    constructor() {
    }

    private exportButtonsToXML() {
        var xml = "";
        for (var i = 0; i < Designer.forms.length; i++) {
            var form = Designer.forms[i];
            var baseLayout = <mLinearLayout.LinearLayout> form.Content[0];
            for (var j = 0; j < baseLayout.Children.length; j++) {
                var control = baseLayout.Children[j];
                if (control.Preferences.WidgetType == mWidgetTypes.WidgetTypes.Button) {
                    var codeBlock = (<mButton.Button> control).CodeBlock;
                    xml += "<action control-id='" + (<mButton.Button> control).Preferences.ButtonId + "'>\n";
                    xml += codeBlock.toXML();
                    xml += "</action>\n";
                }
            }
        }
        return xml;
    }

    public addForm(formName: string) {
        $("#propertiesEditor").empty();
        Designer.activeForm.hide()
        Designer.activeForm = new mForm.Form(formName, Designer.formsDomElement);
        Designer.forms.push(Designer.activeForm);
        var layoputPreferences = new mLinearLayoutPreferences.LinearLayoutPreferences();
        layoputPreferences.Orientation = mLinearLayoutPreferences.LinearLayoutPreferences.Vertical;
        layoputPreferences.Background = "#ffffff";
        layoputPreferences.Height = mElementPreferences.ElementPreferences.FillParent;
        layoputPreferences.Id = Designer.id;
        Designer.id++;
        layoputPreferences.Width = mElementPreferences.ElementPreferences.FillParent;
        var layout = new mLinearLayout.LinearLayout(layoputPreferences);
        Designer.activeForm.addElement(layout);
        $("#formNameField").val(Designer.activeForm.FormName);
        Designer.formNames.push(formName);
        Designer.activeForm.show();
        this.updateFormsSelect();
        this.updateTriggersSelect();
        this.updateFormHeader();
        this.saveModel();
    }

    public saveModel() {
        this.logger.log("saving");
        var xml = this.getXML();
        //this.logger.log(xml);
        this.logger.log("to localhost");
        var _this = this;
        $.ajax("http://localhost:12345/", {
            type: "POST", contentType: "text/XML", processData: false, data: xml, success: function (data) {
                _this.logger.log("saved");
            }
        });
    }

    private sendXml() {
        this.logger.log("sendXml");
        var xml = this.getXML();
        this.logger.log(xml);
        this.logger.log("to localhost");
        var _this = this;
        $.ajax("http://localhost:12345/", {
            type: "POST", contentType: "text/XML", processData: false, data: xml, success: function (data) {
                _this.logger.log("response");
                window.location.assign("http://localhost:51987/patients.xap");
            }
        });
    }

    public getXML() {
        var xml = "<application name='patients'>\n"
        xml += "<logic>\n";
        xml += this.exportButtonsToXML();
        for (var i = 0; i < Designer.forms.length; i++) {
            for (var j = 0; j < Designer.forms[i].Triggers.length; j++) {
                xml += Designer.forms[i].Triggers[j].toXML();
            }
        }
        xml += "</logic>\n";
        xml += "<forms>\n";
        for (var i = 0; i < Designer.forms.length; i++) {
            xml += Designer.forms[i].toXML();
        }
        xml += "</forms>\n";
        xml += "</application>\n";
        return xml;
    }

    public updateFormsSelect() {
        var select = $("#formsSelect");
        select.empty();
        for (var i = 0; i < Designer.forms.length; i++) {
            var currentName = Designer.forms[i].FormName;
            var newOption = $("<option value=\"" + currentName + "\">" + currentName + "</option>");
            if (currentName == Designer.activeForm.FormName) {
                newOption.attr("selected", "selected");
            }
            select.append(newOption);
        }
        select.selectmenu("refresh", true);
    }

    public updateTriggersSelect() {
        var _this = this;
        var select = $("#triggersSelect");
        select.empty();
        for (var i = 0; i < Designer.activeForm.Triggers.length; i++) {
            var currentName = Designer.activeForm.Triggers[i].TriggerName;
            var newOption = $("<option value=\"" + currentName + "\">" + currentName + "</option>");
            //if (currentName == Designer.activeForm.FormName) {
            //    newOption.attr("selected", "selected");
            //}
            select.append(newOption);
        }
        select.selectmenu("refresh", true);
        select.change(function () {
            var trigger: mFormTrigger.FormTrigger = null;
            for (var i = 0; i < Designer.activeForm.Triggers.length; i++) {
                if (select.val() == Designer.activeForm.Triggers[i].TriggerName) {
                    trigger = Designer.activeForm.Triggers[i];
                    break;
                }
            }
            trigger.show($("#triggerDiv"));
        });
        Designer.activeForm.Triggers[0].show($("#triggerDiv"));
    }

    private updateFormHeader() {
        var div = $("#formHeader");
        div.empty();
        //var header = Designer.activeForm.FormName;
        var header = $("<h2 align='center'>" + Designer.activeForm.FormName + "<h2>");
        div.append(header);
    }

    public changeActiveForm(formName: string) {
        $("#propertiesEditor").empty();
        Designer.activeForm.hide();
        for (var i = 0; i < Designer.forms.length; i++) {
            if (Designer.forms[i].FormName == formName) {
                Designer.activeForm = Designer.forms[i];
                Designer.activeForm.show();
                break;
            }
        }
        $("#formNameField").val(Designer.activeForm.FormName);
        this.updateFormsSelect();
        this.updateTriggersSelect();
        this.updateFormHeader();
    }

    public initDesigner() {
        var _this = this;
        this.logger.log("Init designer");
        var parentDiv = $("#menu");
        var designerMenuDiv = document.createElement("ul");
        $(designerMenuDiv).attr("data-role", "listview");
        $(designerMenuDiv).attr("data-inset", "true");
        $(designerMenuDiv).attr("data-divider-theme", "d");
        var formsSelector = $("<div></div>");
        formsSelector.css("padding", "16px");

        var controlsDiv = document.createElement("ul");
        $(controlsDiv).attr("data-role", "listview");
        $(controlsDiv).attr("data-inset", "true");
        $(controlsDiv).attr("data-divider-theme", "d");
        

        var propertiesParentDiv = $("#properties");
        var propertiesDiv = document.createElement("ul");
        $(propertiesDiv).attr("data-role", "listview");
        $(propertiesDiv).attr("data-inset", "true");
        $(propertiesDiv).attr("data-divider-theme", "d");
        var formTriggersDiv = document.createElement("ul");
        $(formTriggersDiv).attr("data-role", "listview");
        $(formTriggersDiv).attr("data-inset", "true");
        $(formTriggersDiv).attr("data-divider-theme", "d");

        

        var sendXMLButton = $("#sendXMLButton");

        //$(designerMenuDiv).append(sendXMLButton);
        //sendXMLButton.button();
        $(sendXMLButton).click(function () {
            _this.sendXml();
        });

        var formsTreeHeader = document.createElement("li");
        $(formsTreeHeader).attr("data-role", "list-divider");
        $(formsTreeHeader).text("Forms");
        //$(formsSelector).append($(formsTreeHeader));
        $(designerMenuDiv).append($(formsTreeHeader));

        var formsSelect = $("<select id=\"formsSelect\"></select>");
        //$(designerMenuDiv).append($(formsSelect));
        $(formsSelector).append($(formsSelect));
        formsSelect.selectmenu();
        formsSelect.change(function () {
            _this.changeActiveForm(formsSelect.val());
        });

        var addFormButton = $("<a id=\"addFormButton\" data-theme='a' data-role=\"button\" draggable=\"false\">New form</a>");
        //$(designerMenuDiv).append(addFormButton);
        $(formsSelector).append($(addFormButton));
        addFormButton.button();
        $(addFormButton).click(function () {
            _this.addForm("New form");
        });
        var formNameLabel = $("<label for='formNameField' >Form name: </label>");
        formNameLabel.css("font-weight", "bold");
        var formNameField = $("<input type = 'text' name = 'formNameField' id = 'formNameField' value = '' >");
        //$(designerMenuDiv).append(formNameLabel);
        //$(designerMenuDiv).append(formNameField);
        $(formsSelector).append($(formNameLabel));
        $(formsSelector).append($(formNameField));
        $(formNameField).change(function () {
            var newVal = $(formNameField).val();
            var index = Designer.formNames.indexOf(Designer.activeForm.FormName);
            Designer.formNames[index] = newVal;

            Designer.activeForm.FormName = newVal;
            Designer.activeForm.updateTriggers();
            _this.updateFormsSelect();
            _this.updateFormHeader();
            _this.saveModel();
        });
        formNameField.textinput();
        $(designerMenuDiv).append($(formsSelector));


        var elementsPalleteHeader = document.createElement("li");
        $(elementsPalleteHeader).css("margin-top", "20px");
        $(elementsPalleteHeader).attr("data-role", "list-divider");
        $(elementsPalleteHeader).text("Widgets");
        $(controlsDiv).append($(elementsPalleteHeader));

        var elementsPalleteContainer = document.createElement("li");
        $(controlsDiv).append($(elementsPalleteContainer));

        var elementsPallete = document.createElement("div");
        //$(elementsPallete).addClass("ui-grid-a");
        $(elementsPalleteContainer).append($(elementsPallete));

        var buttonElement = $("<a id=\"button\" data-role=\"button\" draggable=\"true\">Button</a>");
        $(elementsPallete).append(buttonElement);
        //buttonElement.addClass("ui-block-a");
        buttonElement.button();

        var textViewElement = $("<a id=\"textView\" data-role=\"button\" draggable=\"true\">TextView</a>");
        $(elementsPallete).append(textViewElement);
        //textViewElement.addClass("ui-block-b");
        textViewElement.button();

        var imageViewElement = $("<a id=\"imageView\" data-role=\"button\" draggable=\"true\">ImageView</a>");
        $(elementsPallete).append(imageViewElement);
        //imageViewElement.addClass("ui-block-a");
        imageViewElement.button();

        var webViewElement = $("<a id=\"webView\" data-role=\"button\" draggable=\"true\">WebView</a>");
        $(elementsPallete).append(webViewElement);
        //webViewElement.addClass("ui-block-b");
        webViewElement.button();

        var editTextElement = $("<a id=\"editText\" data-role=\"button\" draggable=\"true\">EditText</a>");
        $(elementsPallete).append(editTextElement);
        //webViewElement.addClass("ui-block-b");
        editTextElement.button();

        var mapElement = $("<a id=\"map\" data-role=\"button\" draggable=\"true\">Map</a>");
        $(elementsPallete).append(mapElement);
        //webViewElement.addClass("ui-block-b");
        mapElement.button();

        var propertiesEditorHeader = document.createElement("li");
        $(propertiesEditorHeader).attr("data-role", "list-divider");
        $(propertiesEditorHeader).text("Properties");
        $(propertiesDiv).append($(propertiesEditorHeader));

        var propertiesEditorContainer = document.createElement("li");
        $(propertiesDiv).append($(propertiesEditorContainer));

        var propertiesEditorDiv = document.createElement("div");
        propertiesEditorDiv.id = "propertiesEditor";
        $(propertiesEditorContainer).append($(propertiesEditorDiv));

        var formTriggersHeader = document.createElement("li");
        $(formTriggersHeader).attr("data-role", "list-divider");
        $(formTriggersHeader).text("Form triggers");
        
        $(formTriggersDiv).append($(formTriggersHeader));

        var triggerSelectDiv = $("<div></div>");
        $(triggerSelectDiv).css("padding-left", "16px");
        $(triggerSelectDiv).css("padding-right", "16px");

        var triggersSelect = $("<select id=\"triggersSelect\"></select>");
        triggersSelect.change(function () {
            //_this.changeActiveForm(formsSelect.val());
            //var activeForm = _this.
        });
        $(triggerSelectDiv).append($(triggersSelect));
        $(formTriggersDiv).append($(triggerSelectDiv));
        triggersSelect.selectmenu();

        var triggerDiv = document.createElement("div");
        $(triggerDiv).css("padding", "16px");
        triggerDiv.id = "triggerDiv";
        $(formTriggersDiv).append($(triggerDiv));

        $(parentDiv).prepend($(controlsDiv));
        $(parentDiv).prepend($(designerMenuDiv));

        $(propertiesParentDiv).prepend($(propertiesDiv));
        $(propertiesParentDiv).append($(formTriggersDiv));
        $(designerMenuDiv).listview();
        $(propertiesDiv).listview();
        $(controlsDiv).css("margin-top", "40px");
        $(controlsDiv).listview();
        $(formTriggersDiv).css("margin-top", "40px");
        $(formTriggersDiv).listview();

        document.getElementById("button").ondragstart = function (ev: DragEvent) {
            ev.dataTransfer.setData("WidgetType", mWidgetTypes.WidgetTypes.Button.toString());
            ev.dataTransfer.setData("IsNew", "yes");
        }
        document.getElementById("textView").ondragstart = function (ev: DragEvent) {
            ev.dataTransfer.setData("WidgetType", mWidgetTypes.WidgetTypes.TextView.toString());
            ev.dataTransfer.setData("IsNew", "yes");
        }
        document.getElementById("imageView").ondragstart = function (ev: DragEvent) {
            ev.dataTransfer.setData("WidgetType", mWidgetTypes.WidgetTypes.ImageView.toString());
            ev.dataTransfer.setData("IsNew", "yes");
        }
        document.getElementById("webView").ondragstart = function (ev: DragEvent) {
            ev.dataTransfer.setData("WidgetType", mWidgetTypes.WidgetTypes.WebView.toString());
            ev.dataTransfer.setData("IsNew", "yes");
        }
        document.getElementById("editText").ondragstart = function (ev: DragEvent) {
            ev.dataTransfer.setData("WidgetType", mWidgetTypes.WidgetTypes.EditText.toString());
            ev.dataTransfer.setData("IsNew", "yes");
        }
        document.getElementById("map").ondragstart = function (ev: DragEvent) {
            ev.dataTransfer.setData("WidgetType", mWidgetTypes.WidgetTypes.Map.toString());
            ev.dataTransfer.setData("IsNew", "yes");
        }


        Designer.activeForm = new mForm.Form("main", Designer.formsDomElement);
        Designer.forms.push(Designer.activeForm);
        Designer.formNames.push("main");
        var layoputPreferences = new mLinearLayoutPreferences.LinearLayoutPreferences();
        layoputPreferences.Orientation = mLinearLayoutPreferences.LinearLayoutPreferences.Vertical;
        layoputPreferences.Background = "#ffffff";
        layoputPreferences.Height = mElementPreferences.ElementPreferences.FillParent;
        layoputPreferences.Id = Designer.id;
        Designer.id++;
        layoputPreferences.Width = mElementPreferences.ElementPreferences.FillParent;
        var layout = new mLinearLayout.LinearLayout(layoputPreferences);
        Designer.activeForm.addElement(layout);
        Designer.activeForm.show();
        this.changeActiveForm("main");
        this.saveModel();
        //form.append(layout.DomElement);
    }
}
