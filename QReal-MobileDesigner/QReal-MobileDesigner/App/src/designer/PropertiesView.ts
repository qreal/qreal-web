import Log = require("src/util/log/Log");
import App = require("src/Application");
import Enums = require("src/model/Enums");
import Controller = require("src/designer/Designer");
import EventManager = require("src/util/events/EventManager");
import ControlProperty = require("src/model/ControlProperty");

class PropertiesView {

    private log = new Log("PropertiesView");

    private trueFalseOptions = [
        { Text: "No", Value: false },
        { Text: "Yes", Value: true }
    ];
    private themes = [
        { Text: "Default", Value: "default" },
        { Text: "Light", Value: "a" },
        { Text: "Dark", Value: "b" },
    ];

    private currentPropertyDiv: JQuery;

    constructor() {
        this.log.Debug("constructor");
    }

    public Init(): void {
        this.log.Debug("Init");
    }

    public ShowProperty(property: ControlProperty.Property): void {
        this.log.Debug('ShowProperty ' + property.Type);

        if (this.currentPropertyDiv) {
            this.currentPropertyDiv.hide();
        }

        var propertyPanel = $('#propertyFor' + property.Id);
        if ((<any>propertyPanel).exists()) {
            this.currentPropertyDiv = propertyPanel;
            this.currentPropertyDiv.show();
            return;
        }

        switch (property.Type) {
            case Enums.ControlType.Button:
                this.ShowProperty_Button(<ControlProperty.ButtonProperty>property);
                break;
            case Enums.ControlType.Input:
                this.ShowProperty_Input(<ControlProperty.InputProperty>property);
                break;
            case Enums.ControlType.Page:
                this.ShowProperty_Page(<ControlProperty.PageProperty>property);
                break;
            case Enums.ControlType.Header:
                this.ShowProperty_Header(<ControlProperty.HeaderProperty>property);
                break;
            case Enums.ControlType.Label:
                this.ShowProperty_Label(<ControlProperty.LabelProperty>property);
                break;
        }
    }

    public ShowProperty_Button(property: ControlProperty.ButtonProperty): void {
        this.log.Debug("ShowProperty_Button");
        var self = this;
        var controlManager = App.Instance.Device.ControlManager;

        var propertyPanel = $('#propertiesTmpl').tmpl({});
        var dialogContent = propertyPanel.children("#property-table");

        var $idProperty = this.CreateIdRow(property);
        var $textProperty = this.CreateInnerTextRow(property);
        var $inlineProperty = this.CreateInlineRow(property);
        var $cornersProperty = this.CreateRoundCornersRow(property);
        var $miniProperty = this.CreateMiniRow(property);
        var $themeProperty = this.CreateThemeRow(property);

        dialogContent.append($idProperty);
        dialogContent.append($textProperty);
        dialogContent.append($inlineProperty);
        dialogContent.append($cornersProperty);
        dialogContent.append($miniProperty);
        dialogContent.append($themeProperty);

        propertyPanel.appendTo('#properties-widget');
        propertyPanel.attr('id', 'propertyFor' + property.Id);
        this.currentPropertyDiv = propertyPanel;
    }

    public ShowProperty_Input(property: ControlProperty.InputProperty): void {
        this.log.Debug("ShowProperty_Input");
        var self = this;
        var controlManager = App.Instance.Device.ControlManager;

        var $propertyPanel = $('#propertiesTmpl').tmpl({});
        var $dialogContent = $propertyPanel.children("#property-table");

        var $idProperty = this.CreateIdRow(property);
        var $titleProperty = this.CreateTitleRow(property);
        var $placeholderProperty = this.CreatePlaceholderRow(property);
        var $miniProperty = this.CreateMiniRow(property);
        var $themeProperty = this.CreateThemeRow(property);

        $dialogContent.append($idProperty);
        $dialogContent.append($titleProperty);
        $dialogContent.append($miniProperty);
        $dialogContent.append($themeProperty);

        $propertyPanel.appendTo('#properties-widget');
        $propertyPanel.attr('id', 'propertyFor' + property.Id);
        this.currentPropertyDiv = $propertyPanel;
    }


    public ShowProperty_Page(property: ControlProperty.PageProperty): void {
        this.log.Debug("ShowProperty_Page");
        var self = this;
        var controlManager = App.Instance.Device.ControlManager;

        var propertyPanel = $('#propertiesTmpl').tmpl({});
        var content = propertyPanel.children("#property-table");

        var $idProperty = this.CreateIdRow(property);
        var $themeProperty = this.CreateThemeRow(property);
        var $headerProperty = this.CreateHeaderRow(property);

        content.append($idProperty);
        content.append($themeProperty);
        content.append($headerProperty);
        propertyPanel.appendTo('#properties-widget');
        propertyPanel.attr('id', 'propertyFor' + property.Id);
        this.currentPropertyDiv = propertyPanel;
    }

    public ShowProperty_Header(property: ControlProperty.HeaderProperty): void {
        this.log.Debug("ShowProperty_Header");
        var self = this;
        var controlManager = App.Instance.Device.ControlManager;

        var propertyPanel = $('#propertiesTmpl').tmpl({});
        var content = propertyPanel.children("#property-table");

        var $titleProperty = this.CreateTitleRow(property);
        var $themeProperty = this.CreateThemeRow(property);

        content.append($titleProperty);
        content.append($themeProperty);
        propertyPanel.appendTo('#properties-widget');
        propertyPanel.attr('id', 'propertyFor' + property.Id);
        this.currentPropertyDiv = propertyPanel;
    }

    public ShowProperty_Label(property: ControlProperty.LabelProperty): void {
        this.log.Debug("ShowProperty_Label");
        var self = this;
        var controlManager = App.Instance.Device.ControlManager;

        var propertyPanel = $('#propertiesTmpl').tmpl({});
        var content = propertyPanel.children("#property-table");

        var $idProperty = this.CreateIdRow(property);
        var $textProperty = this.CreateTextTextRow(property);
       
        content.append($idProperty);
        content.append($textProperty);      
        propertyPanel.appendTo('#properties-widget');
        propertyPanel.attr('id', 'propertyFor' + property.Id);
        this.currentPropertyDiv = propertyPanel;
    }


    private CreateIdRow(property: any): JQuery {
        return this.CreateTextRow('Id:', property.Id, Enums.PropertyType.Id, property);
    }

    private CreateInnerTextRow(property: any): JQuery {
        return this.CreateTextRow('Text:', property.Text, Enums.PropertyType.Text, property);
    }

    private CreateThemeRow(property: any): JQuery {     
        return this.CreateSelectRow('Theme:', property.Theme, Enums.PropertyType.Theme, this.themes, property);
    }

    private CreateTitleRow(property: any): JQuery {
        return this.CreateTextRow('Title:', property.Title, Enums.PropertyType.Title, property);
    }

    private CreateTextTextRow(property: any): JQuery {
        return this.CreateTextRow('Text:', property.Text, Enums.PropertyType.Text, property);
    }

    private CreatePlaceholderRow(property: any): JQuery {
        return this.CreateTextRow('Placeholder:', property.Placeholder, Enums.PropertyType.Placeholder, property);
    }

    private CreateMiniRow(property: any): JQuery {
        return this.CreateTrueFalseSelectRow('Mini:', String(property.Mini), Enums.PropertyType.Mini, property);
    }

    private CreateRoundCornersRow(property: any): JQuery {
        return this.CreateTrueFalseSelectRow('Rounded corners:', String(property.Corners), Enums.PropertyType.Corners, property);
    }

    private CreateInlineRow(property: any): JQuery {
        return this.CreateTrueFalseSelectRow('Inline:', String(property.Inline), Enums.PropertyType.Inline, property);
    }

    private CreateHeaderRow(property: any): JQuery {
        return this.CreateTrueFalseSelectRow('Header:', String(property.Header), Enums.PropertyType.Header, property);
    }

    private CreatePaddingRow(property: any): JQuery {
        return this.CreateSizeInputRow('Padding:', String(property.Padding), Enums.PropertyType.Padding, property);
    }

    //private CreateHeaderRow(property: any): JQuery {
    //    return this.CreateTextRow('Header:', property.Header, Enums.PropertyType.Header, property);
    //}

    private CreateTextRow(name: string, value: string, propertyType: Enums.PropertyType, property: any): JQuery {
        var controlManager = App.Instance.Device.ControlManager;
        var $textProperty = $('#propertyTextTmpl').tmpl(
            {
                name: name,
                value: value
            });
        $textProperty.find('input').change(function () {
            controlManager.ChangeProperty(property.Id, propertyType, property.Type, $(this).val());
        });
        return $textProperty;
    }

    //TODO: add check
    private CreateSizeInputRow(name: string, value: string, propertyType: Enums.PropertyType, property: any): JQuery {
        var controlManager = App.Instance.Device.ControlManager;
        var $textProperty = $('#propertyTextTmpl').tmpl(
            {
                name: name,
                value: value
            });
        $textProperty.find('input').change(function () {
            controlManager.ChangeProperty(property.Id, propertyType, property.Type, $(this).val());
        });
        return $textProperty;
    }

    private CreateSelectRow(name: string, value: string, propertyType: Enums.PropertyType, options:any, property: any): JQuery {
        var controlManager = App.Instance.Device.ControlManager;
        var $themeProperty = $('#propertySelectTmpl').tmpl(
            {
                name: name
            });

        var themeSelect = $themeProperty.find('select');
        $("#templateOptionItem").tmpl(options).appendTo(themeSelect);

        themeSelect.val(value);
        themeSelect.change(function () {
            controlManager.ChangeProperty(property.Id, propertyType, property.Type, $(this).val());
        });
        return $themeProperty;
    }

    private CreateTrueFalseSelectRow(name: string, value: string, propertyType: Enums.PropertyType, property: any): JQuery {
        var controlManager = App.Instance.Device.ControlManager;
        var $themeProperty = $('#propertySelectTmpl').tmpl(
            {
                name: name
            });

        var themeSelect = $themeProperty.find('select');
        $("#templateOptionItem").tmpl(this.trueFalseOptions).appendTo(themeSelect);

        themeSelect.val(value);
        themeSelect.change(function () {
            controlManager.ChangeProperty(property.Id, propertyType, property.Type, $(this).val());
        });
        return $themeProperty;
    }

}

export = PropertiesView;