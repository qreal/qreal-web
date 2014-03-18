import Log = require("src/util/log/Log");
import App = require("src/Application");
import ControlType = require("src/model/ControlType");
import PropertyType = require("src/model/PropertyType");
import Controller = require("src/designer/Designer");
import EventManager = require("src/util/events/EventManager");
import Property = require("src/model/properties/Property");
import ButtonProperty = require("src/model/properties/ButtonProperty");
import InputProperty = require("src/model/properties/InputProperty");



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

    public ShowProperty(property: Property): void {
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
            case ControlType.Button:
                this.ShowProperty_Button(<ButtonProperty>property);
                break;
            case ControlType.Input:
                this.ShowProperty_Input(<InputProperty>property);
                break;
        }
    }

    public ShowProperty_Button(property: ButtonProperty): void {
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
            controlManager.ChangeProperty(property.Id, PropertyType.Id, ControlType.Button, $(this).val());
        });

        var textProperty = $('#propertyTextTmpl').tmpl(
            {
                name: 'Text:',
                value: property.Text
            });

        textProperty.find('input').change(function () {
            controlManager.ChangeProperty(property.Id, PropertyType.Text, ControlType.Button, $(this).val());
        });

        var inlineProperty = $('#propertySelectTmpl').tmpl(
            {
                name: 'Inline:'
            });

        var inlineSelect = inlineProperty.find('select');
        $("#templateOptionItem").tmpl(this.trueFalseOptions).appendTo(inlineSelect);

        inlineSelect.val(String(property.Inline));
        inlineSelect.change(function () {
            controlManager.ChangeProperty(property.Id, PropertyType.Inline, ControlType.Button, $(this).val());
        });
        var cornersProperty = $('#propertySelectTmpl').tmpl(
            {
                name: 'Rounded corners:'
            });
        var cornersSelect = cornersProperty.find('select');
        $("#templateOptionItem").tmpl(this.trueFalseOptions).appendTo(cornersSelect);

        cornersSelect.val(String(property.Corners));
        cornersSelect.change(function () {
            controlManager.ChangeProperty(property.Id, PropertyType.Corners, ControlType.Button, $(this).val());
        });

        var miniProperty = $('#propertySelectTmpl').tmpl(
            {
                name: 'Mini:'
            });
        var miniSelect = miniProperty.find('select');
        $("#templateOptionItem").tmpl(this.trueFalseOptions).appendTo(miniSelect);

        miniSelect.val(String(property.Mini));
        miniSelect.change(function () {
            controlManager.ChangeProperty(property.Id, PropertyType.Mini, ControlType.Button, $(this).val());
        });


        var themeProperty = $('#propertySelectTmpl').tmpl(
            {
                name: 'Theme:'
            });

        var themeSelect = themeProperty.find('select');
        $("#templateOptionItem").tmpl(this.themes).appendTo(themeSelect);

        themeSelect.val(property.Theme);
        themeSelect.change(function () {
            controlManager.ChangeProperty(property.Id, PropertyType.Theme, ControlType.Button, $(this).val());
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

    public ShowProperty_Input(property: InputProperty): void {
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
            controlManager.ChangeProperty(property.Id, PropertyType.Id, ControlType.Input, $(this).val());
        });

        var titleProperty = $('#propertyTextTmpl').tmpl(
            {
                name: 'Title:',
                value: property.Title
            });

        titleProperty.find('input').change(function () {
            controlManager.ChangeProperty(property.Id, PropertyType.Title, ControlType.Input, $(this).val());
        });

        var inlineProperty = $('#propertySelectTmpl').tmpl(
            {
                name: 'Inline:'
            });

        var inlineSelect = inlineProperty.find('select');
        $("#templateOptionItem").tmpl(this.trueFalseOptions).appendTo(inlineSelect);

        inlineSelect.val(String(property.Inline));
        inlineSelect.change(function () {
            controlManager.ChangeProperty(property.Id, PropertyType.Inline, ControlType.Input, $(this).val());
        });
        var cornersProperty = $('#propertySelectTmpl').tmpl(
            {
                name: 'Rounded corners:'
            });
        var cornersSelect = cornersProperty.find('select');
        $("#templateOptionItem").tmpl(this.trueFalseOptions).appendTo(cornersSelect);

        cornersSelect.val(String(property.Corners));
        cornersSelect.change(function () {
            controlManager.ChangeProperty(property.Id, PropertyType.Corners, ControlType.Input, $(this).val());
        });

        var miniProperty = $('#propertySelectTmpl').tmpl(
            {
                name: 'Mini:'
            });
        var miniSelect = miniProperty.find('select');
        $("#templateOptionItem").tmpl(this.trueFalseOptions).appendTo(miniSelect);

        miniSelect.val(String(property.Mini));
        miniSelect.change(function () {
            controlManager.ChangeProperty(property.Id, PropertyType.Mini, ControlType.Input, $(this).val());
        });


        var themeProperty = $('#propertySelectTmpl').tmpl(
            {
                name: 'Theme:'
            });

        var themeSelect = themeProperty.find('select');
        $("#templateOptionItem").tmpl(this.themes).appendTo(themeSelect);

        themeSelect.val(property.Theme);
        themeSelect.change(function () {
            controlManager.ChangeProperty(property.Id, PropertyType.Theme, ControlType.Input, $(this).val());
        });


        dialogContent.append(idProperty);
        dialogContent.append(titleProperty);
        dialogContent.append(inlineProperty);
        dialogContent.append(cornersProperty);
        dialogContent.append(miniProperty);
        dialogContent.append(themeProperty);

        propertyPanel.appendTo('#properties-widget');
        propertyPanel.attr('id', 'propertyFor' + property.Id);
        this.currentPropertyDiv = propertyPanel;
    }

}

export = PropertiesView;