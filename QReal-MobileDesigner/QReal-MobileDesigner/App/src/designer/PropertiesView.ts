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
        { Text: "Theme A", Value: "a" },
        { Text: "Theme B", Value: "b" },
        { Text: "Theme C", Value: "c" },
        { Text: "Theme D", Value: "d" },
        { Text: "Theme E", Value: "e" },
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
        }
    }

    public ShowProperty_Button(property: ControlProperty.ButtonProperty): void {
        this.log.Debug("ShowProperty_Button");
        var self = this;
        var controlManager = App.Instance.Device.ControlManager;

        var propertyPanel = $('#propertiesTmpl').tmpl({});
        var dialogContent = propertyPanel.children("#property-table");

        var $idProperty = this.CreateIdRow(property);

        var textProperty = $('#propertyTextTmpl').tmpl(
            {
                name: 'Text:',
                value: property.Text
            });

        textProperty.find('input').change(function () {
            controlManager.ChangeProperty(property.Id, Enums.PropertyType.Text, Enums.ControlType.Button, $(this).val());
        });

        var inlineProperty = $('#propertySelectTmpl').tmpl(
            {
                name: 'Inline:'
            });

        var inlineSelect = inlineProperty.find('select');
        $("#templateOptionItem").tmpl(this.trueFalseOptions).appendTo(inlineSelect);

        inlineSelect.val(String(property.Inline));
        inlineSelect.change(function () {
            controlManager.ChangeProperty(property.Id, Enums.PropertyType.Inline, Enums.ControlType.Button, $(this).val());
        });
        var cornersProperty = $('#propertySelectTmpl').tmpl(
            {
                name: 'Rounded corners:'
            });
        var cornersSelect = cornersProperty.find('select');
        $("#templateOptionItem").tmpl(this.trueFalseOptions).appendTo(cornersSelect);

        cornersSelect.val(String(property.Corners));
        cornersSelect.change(function () {
            controlManager.ChangeProperty(property.Id, Enums.PropertyType.Corners, Enums.ControlType.Button, $(this).val());
        });

        var miniProperty = $('#propertySelectTmpl').tmpl(
            {
                name: 'Mini:'
            });
        var miniSelect = miniProperty.find('select');
        $("#templateOptionItem").tmpl(this.trueFalseOptions).appendTo(miniSelect);

        miniSelect.val(String(property.Mini));
        miniSelect.change(function () {
            controlManager.ChangeProperty(property.Id, Enums.PropertyType.Mini, Enums.ControlType.Button, $(this).val());
        });


        var $themeProperty = this.CreateThemeRow(property);

        dialogContent.append($idProperty);
        dialogContent.append(textProperty);
        dialogContent.append(inlineProperty);
        dialogContent.append(cornersProperty);
        dialogContent.append(miniProperty);
        dialogContent.append($themeProperty);

        propertyPanel.appendTo('#properties-widget');
        propertyPanel.attr('id', 'propertyFor' + property.Id);
        this.currentPropertyDiv = propertyPanel;
    }

    public ShowProperty_Input(property: ControlProperty.InputProperty): void {
        this.log.Debug("ShowProperty_Input");
        var self = this;
        var controlManager = App.Instance.Device.ControlManager;

        var propertyPanel = $('#propertiesTmpl').tmpl({});
        var dialogContent = propertyPanel.children("#property-table");

        var $idProperty = this.CreateIdRow(property);

        var titleProperty = $('#propertyTextTmpl').tmpl(
            {
                name: 'Title:',
                value: property.Title
            });

        titleProperty.find('input').change(function () {
            controlManager.ChangeProperty(property.Id, Enums.PropertyType.Title, Enums.ControlType.Input, $(this).val());
        });

        var miniProperty = $('#propertySelectTmpl').tmpl(
            {
                name: 'Mini:'
            });
        var miniSelect = miniProperty.find('select');
        $("#templateOptionItem").tmpl(this.trueFalseOptions).appendTo(miniSelect);

        miniSelect.val(String(property.Mini));
        miniSelect.change(function () {
            controlManager.ChangeProperty(property.Id, Enums.PropertyType.Mini, Enums.ControlType.Input, $(this).val());
        });

        var $themeProperty = this.CreateThemeRow(property);

        dialogContent.append($idProperty);
        dialogContent.append(titleProperty);
        dialogContent.append(miniProperty);
        dialogContent.append($themeProperty);

        propertyPanel.appendTo('#properties-widget');
        propertyPanel.attr('id', 'propertyFor' + property.Id);
        this.currentPropertyDiv = propertyPanel;
    }


    public ShowProperty_Page(property: ControlProperty.PageProperty): void {
        this.log.Debug("ShowProperty_Page");
        var self = this;
        var controlManager = App.Instance.Device.ControlManager;

        var propertyPanel = $('#propertiesTmpl').tmpl({});
        var content = propertyPanel.children("#property-table");

        var $idProperty = this.CreateIdRow(property);
        var $themeProperty = this.CreateThemeRow(property);
        var $headerProperty = $('#propertyCheckboxTmpl').tmpl(
            {
                name: 'Header:',
                value: property.Id
            });
        $headerProperty.find('input').change(function () {
            controlManager.ChangeProperty(property.Id, Enums.PropertyType.Header, Enums.ControlType.Page, $(this).is(":checked") ? 'yes' : 'no');
        });


        content.append($idProperty);
        content.append($themeProperty);
        content.append($headerProperty);
        propertyPanel.appendTo('#properties-widget');
        propertyPanel.attr('id', 'propertyFor' + property.Id);
        this.currentPropertyDiv = propertyPanel;
    }

    public ShowProperty_Header(property: ControlProperty.HeaderProperty): void {
        this.log.Debug("ShowProperty_Page");
        var self = this;
        var controlManager = App.Instance.Device.ControlManager;

        var propertyPanel = $('#propertiesTmpl').tmpl({});
        var content = propertyPanel.children("#property-table");

        var titleProperty = this.CreateTitleRow(property);

        content.append(titleProperty);
        propertyPanel.appendTo('#properties-widget');
        propertyPanel.attr('id', 'propertyFor' + property.Id);
        this.currentPropertyDiv = propertyPanel;
    }

    private CreateThemeRow(property: any): JQuery {     
        return this.CreateSelectRow('Theme:', property.Theme, Enums.PropertyType.Theme, property);
    }

    private CreateIdRow(property: any): JQuery {
        return this.CreateTextRow('Id:', property.Id, Enums.PropertyType.Id, property);
    }

    private CreateTitleRow(property: any): JQuery {
        return this.CreateTextRow('Title:', property.Title, Enums.PropertyType.Title, property);
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

    private CreateSelectRow(name: string, value: string, propertyType: Enums.PropertyType, property: any): JQuery {
        var controlManager = App.Instance.Device.ControlManager;
        var $themeProperty = $('#propertySelectTmpl').tmpl(
            {
                name: name
            });

        var themeSelect = $themeProperty.find('select');
        $("#templateOptionItem").tmpl(this.themes).appendTo(themeSelect);

        themeSelect.val(value);
        themeSelect.change(function () {
            controlManager.ChangeProperty(property.Id, propertyType, property.Type, $(this).val());
        });
        return $themeProperty;
    }

}

export = PropertiesView;