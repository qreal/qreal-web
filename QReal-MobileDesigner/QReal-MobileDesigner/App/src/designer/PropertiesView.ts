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

        var idProperty = $('#propertyTextTmpl').tmpl(
            {
                name: 'Id:',
                value: property.Id
            });
        idProperty.find('input').change(function () {
            controlManager.ChangeProperty(property.Id, Enums.PropertyType.Id, Enums.ControlType.Button, $(this).val());
        });

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


        var themeProperty = $('#propertySelectTmpl').tmpl(
            {
                name: 'Theme:'
            });

        var themeSelect = themeProperty.find('select');
        $("#templateOptionItem").tmpl(this.themes).appendTo(themeSelect);

        themeSelect.val(property.Theme);
        themeSelect.change(function () {
            controlManager.ChangeProperty(property.Id, Enums.PropertyType.Theme, Enums.ControlType.Button, $(this).val());
        });

        dialogContent.append(idProperty);
        dialogContent.append(textProperty);
        dialogContent.append(inlineProperty);
        dialogContent.append(cornersProperty);
        dialogContent.append(miniProperty);
        dialogContent.append(themeProperty);

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

        var idProperty = $('#propertyTextTmpl').tmpl(
            {
                name: 'Id:',
                value: property.Id
            });
        idProperty.find('input').change(function () {
            controlManager.ChangeProperty(property.Id, Enums.PropertyType.Id, Enums.ControlType.Input, $(this).val());
        });

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

        var themeProperty = $('#propertySelectTmpl').tmpl(
            {
                name: 'Theme:'
            });

        var themeSelect = themeProperty.find('select');
        $("#templateOptionItem").tmpl(this.themes).appendTo(themeSelect);

        themeSelect.val(property.Theme);
        themeSelect.change(function () {
            controlManager.ChangeProperty(property.Id, Enums.PropertyType.Theme, Enums.ControlType.Input, $(this).val());
        });

        dialogContent.append(idProperty);
        dialogContent.append(titleProperty);
        dialogContent.append(miniProperty);
        dialogContent.append(themeProperty);

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

        var idProperty = $('#propertyTextTmpl').tmpl(
            {
                name: 'Id:',
                value: property.Id
            });
        idProperty.find('input').change(function () {
            controlManager.ChangeProperty(property.Id, Enums.PropertyType.Id, Enums.ControlType.Page, $(this).val());
        });        

        var $themeProperty = this.CreateThemeSelect(property);

        var headerProperty = $('#propertyCheckboxTmpl').tmpl(
            {
                name: 'Header:',
                value: property.Id
            });
        headerProperty.find('input').change(function () {
            controlManager.ChangeProperty(property.Id, Enums.PropertyType.Header, Enums.ControlType.Page, $(this).is(":checked") ? 'yes' : 'no');
        });


        content.append(idProperty);
        content.append($themeProperty);
        content.append(headerProperty);
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

        var titleProperty = $('#propertyTextTmpl').tmpl(
            {
                name: 'Title:',
                value: property.Title
            });
        titleProperty.find('input').change(function () {
            controlManager.ChangeProperty(property.Id, Enums.PropertyType.Title, Enums.ControlType.Header, $(this).val());
        });

        content.append(titleProperty);
        propertyPanel.appendTo('#properties-widget');
        propertyPanel.attr('id', 'propertyFor' + property.Id);
        this.currentPropertyDiv = propertyPanel;
    }

    private CreateThemeSelect(property: any): JQuery {
        var controlManager = App.Instance.Device.ControlManager;
        var $themeProperty = $('#propertySelectTmpl').tmpl(
            {
                name: 'Theme:'
            });

        var themeSelect = $themeProperty.find('select');
        $("#templateOptionItem").tmpl(this.themes).appendTo(themeSelect);

        themeSelect.val(property.Theme);
        themeSelect.change(function () {
            controlManager.ChangeProperty(property.Id, Enums.PropertyType.Theme, property.Type, $(this).val());
        });
        return $themeProperty;
    }

}

export = PropertiesView;