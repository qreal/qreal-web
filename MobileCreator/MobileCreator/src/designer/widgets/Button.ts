/// <reference path="../../../lib/jquery.d.ts" />
/// <reference path="../../../lib/jquerymobile.d.ts" />
import mElement = module("designer/widgets/Element");
import mElementPreferences = module("designer/preferences/ElementPreferences")
import mButtonPreferences = module("designer/preferences/ButtonPreferences")
import mDesigner = module("designer/Designer")
import mCodeBlock = module("designer/logic/CodeBlock")

export class Button extends mElement.Element {
    private preferences: mButtonPreferences.ButtonPreferences;
    private codeBlock: mCodeBlock.CodeBlock;
    get Preferences() {
        return this.preferences;
    }
    set Preferences(preferences: mButtonPreferences.ButtonPreferences) {
        this.preferences = preferences;
    }
    constructor(preferences: mButtonPreferences.ButtonPreferences);
    constructor(preferences: mButtonPreferences.ButtonPreferences, domElement: JQuery);
    constructor(preferences: mButtonPreferences.ButtonPreferences, domElement?: JQuery = $("<div></div>")) {
        super(domElement);
        this.Preferences = preferences;
        this.codeBlock = new mCodeBlock.CodeBlock(10);
        this.init();
    }
    public init() {
        this.DomElement.empty();
        this.applyHeight();
        this.applyWidth();
        var button = $("<a data-role='button'></a>");
        this.DomElement.append(button);
        button.text(this.preferences.Text);
        button.css("font-size", this.preferences.TextSize + "px");
        button.css("margin-top", this.preferences.LayoutMarginTop + "px");
        
        var _this = this;
        this.DomElement.click(function () {
            _this.fillPropertiesEditor($("#propertiesEditor"));
        });
        this.DomElement.trigger('create');
    }

    private fillPropertiesEditor(editorLayer: JQuery) {
        var _this = this;
        editorLayer.empty();
        var idLabel = $("<label for='text-id' > Id: </label>");
        var idField = $("<input type = 'text' name = 'text-id' id = 'text-id' value = '" + this.Preferences.ButtonId + "' >");
        editorLayer.append(idLabel);
        editorLayer.append(idField);
        idField.change(function () {
            _this.preferences.ButtonId = idField.val();
        });
        idField.textinput();
        var textLabel = $("<label for='text-text' > Text: </label>");
        var textField = $("<input type = 'text' name = 'text-text' id = 'text-text' value = '" + this.Preferences.Text + "' >");
        editorLayer.append(textLabel);
        editorLayer.append(textField);
        textField.change(function () {
            _this.preferences.Text = textField.val();
            _this.init();
        });
        textField.textinput();
        /*
        var sizeLabel = $("<label for='text-size' > Font size: </label>");
        var sizeField = $("<input type = 'number' name = 'text-size' id = 'text-size' value = '" + this.Preferences.TextSize + "' >");
        editorLayer.append(sizeLabel);
        editorLayer.append(sizeField);
        sizeField.change(function () {
            _this.preferences.TextSize = sizeField.val();
            _this.init();
        });
        sizeField.textinput();*/
        var marginTopLabel = $("<label for='text-margin-top' > Top margin: </label>");
        var marginTopField = $("<input type = 'number' name = 'text-margin-top' id = 'text-margin-top' value = '" + this.Preferences.LayoutMarginTop + "' >");
        editorLayer.append(marginTopLabel);
        editorLayer.append(marginTopField);
        marginTopField.change(function () {
            _this.preferences.LayoutMarginTop = marginTopField.val();
            _this.init();
        });
        marginTopField.textinput();
        /*
        var widthLabel = $("<label for='text-width' > Width (0 for fill_parent): </label>");
        var widthField = $("<input type = 'number' name = 'text-width' id = 'text-width' value = '" + this.Preferences.Width + "' >");
        editorLayer.append(widthLabel);
        editorLayer.append(widthField);
        widthField.change(function () {
            _this.preferences.Width = widthField.val();
            _this.init();
        });
        widthField.textinput();
        var heightLabel = $("<label for='text-height' > Height (0 for fill_parent): </label>");
        var heightField = $("<input type = 'number' name = 'text-height' id = 'text-height' value = '" + this.Preferences.Height + "' >");
        editorLayer.append(heightLabel);
        editorLayer.append(heightField);
        heightField.change(function () {
            _this.preferences.Height = heightField.val();
            _this.init();
        });
        heightField.textinput();*/
        /*
        DEPRECATED
        var onclickSelect = $("<select id=\"onclickSelect\"></select>");
        editorLayer.append($(onclickSelect));
        
        onclickSelect.change(function () {
            _this.preferences.OnClickHandler = onclickSelect.val();
        });
        var select = $("#onclickSelect");
        select.empty();
        for (var i = 0; i < mDesigner.Designer.forms.length; i++) {
            var currentName = mDesigner.Designer.forms[i].FormName;
            var newOption = $("<option value=\"" + currentName + "\">" + currentName + "</option>");
            if (currentName == _this.preferences.OnClickHandler) {
                newOption.attr("selected", "selected");
            }
            select.append(newOption);
        }
        onclickSelect.selectmenu();
        //select.selectmenu("refresh", true);*/
        var onClickDiv = $("<div></div>");
        editorLayer.append(onClickDiv);
        this.codeBlock.show(onClickDiv);
    }

    public toXML() {
        var xmlString = "";
        xmlString += "<Button \n";
        if (this.preferences.Width == mElementPreferences.ElementPreferences.FillParent) {
            xmlString += "layout_width=\"fill_parent\" ";
        } else if (this.preferences.Width == mElementPreferences.ElementPreferences.WrapContent) {
            xmlString += "layout_width=\"wrap_content\" ";
        } else {
            xmlString += "layout_width=\"" + this.preferences.Width + "px\" ";
        }
        if (this.preferences.Height == mElementPreferences.ElementPreferences.FillParent) {
            xmlString += "layout_height=\"fill_parent\" ";
        } else if (this.preferences.Height == mElementPreferences.ElementPreferences.WrapContent) {
            xmlString += "layout_height=\"wrap_content\" ";
        } else {
            xmlString += "layout_height=\"" + this.preferences.Width + "px\" ";
        }
        xmlString += "layout_marginTop=\"" + this.preferences.LayoutMarginTop + "px\" ";
        xmlString += "text=\"" + this.preferences.Text + "\" ";
        xmlString += "textSize=\"" + this.preferences.TextSize + "px\" ";
        xmlString += "id=\"" + this.preferences.ButtonId + "\" ";
        //xmlString += "onClick=\"" + this.preferences.OnClickHandler + "\" />\n";
        return xmlString;
    }
}