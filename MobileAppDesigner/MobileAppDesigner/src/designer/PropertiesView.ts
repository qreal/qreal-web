import Log = require("src/util/log/Log");
import Controller = require("src/designer/Controller");
import EventManager = require("src/util/events/EventManager");
import Property = require("src/properties/Property");
import ButtonProperty = require("src/properties/ButtonProperty");

class PropertiesView {

    private log = new Log("PropertiesView");

    private controller: Controller;

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

    constructor(controller: Controller) {
        this.controller = controller;
    }

    public Init(): void {
        this.log.Debug("Init");

        var self = this;
        this.controller.EventManager.AddSubscriber(EventManager.EventShowProperties, {
            OnEvent: (data) => {
                self.log.Debug("OnEvent");
                self.log.DebugObj(data);
                self.ShowProperty(data);
            }
        });
    }

    public ShowProperty(property: Property): void {
        this.log.Debug('ShowProperty ' + property.Type);
        this["ShowProperty_" + property.Type](property);
    }

    public ShowProperty_Button(data: ButtonProperty): void {
        this.log.Debug("ShowProperty_Button");
        var self = this;

        var dialog = $('#propertyDialogFor' + data.Id);
        if ((<any>dialog).exists()) {
            this.log.DebugObj(dialog);
            dialog.dialog("open");
            return;
        }

        dialog = $('#propertyDialogTmpl').tmpl({ title: data.Type });
        var dialogContent = dialog.children('.property');

        var oldId = data.Id;
        var idProperty = $('#propertyTextTmpl').tmpl(
            {
                name: 'Id:',
                value: data.Id
            });
        idProperty.find('input').change(function () {
            self.log.Debug('change: ' + $(this).val());
            self.controller.EventManager.Trigger(EventManager.EventPropertiesChanged, {
                id: oldId,
                newId: $(this).val()
            });
        });
       
        
        var textProperty = $('#propertyTextTmpl').tmpl(
            {
                name: 'Text:',
                value: data.Text
            });

        textProperty.find('input').change(function() {
            self.log.Debug('change: ' + $(this).val());
            self.controller.EventManager.Trigger(EventManager.EventPropertiesChanged, {
                id: data.Id,
                text: $(this).val()
            });
        });

        var inlineProperty = $('#propertySelectTmpl').tmpl(
            {
                name: 'Inline:'
            });

        $("#templateOptionItem").tmpl(this.trueFalseOptions).appendTo(inlineProperty.find('select'));

        inlineProperty.find('select').change(function () {
            self.log.Debug('change: ' + $(this).val());
            self.controller.EventManager.Trigger(EventManager.EventPropertiesChanged, {
                id: data.Id,
                inline: $(this).val()
            });
        });

        var cornersProperty = $('#propertySelectTmpl').tmpl(
            {
                name: 'Rounded corners:'
            });

        $("#templateOptionItem").tmpl(this.trueFalseOptions).appendTo(cornersProperty.find('select'));

        cornersProperty.find('select').val('true');
        cornersProperty.find('select').change(function () {
            self.log.Debug('change: ' + $(this).val());
            self.controller.EventManager.Trigger(EventManager.EventPropertiesChanged, {
                id: data.Id,
                corners: $(this).val()
            });
        });

        var miniProperty = $('#propertySelectTmpl').tmpl(
            {
                name: 'Mini:'
            });

        $("#templateOptionItem").tmpl(this.trueFalseOptions).appendTo(miniProperty.find('select'));

        miniProperty.find('select').change(function () {
            self.log.Debug('change: ' + $(this).val());
            self.controller.EventManager.Trigger(EventManager.EventPropertiesChanged, {
                id: data.Id,
                mini: $(this).val()
            });
        });

        var themeProperty = $('#propertySelectTmpl').tmpl(
            {
                name: 'Theme:'
            });

        $("#templateOptionItem").tmpl(this.themes).appendTo(themeProperty.find('select'));

        themeProperty.find('select').val('c');
        themeProperty.find('select').change(function () {
            self.log.Debug('change: ' + $(this).val());
            self.controller.EventManager.Trigger(EventManager.EventPropertiesChanged, {
                id: data.Id,
                theme: $(this).val()
            });
        });


        dialogContent.append(idProperty);
        dialogContent.append(textProperty);
        dialogContent.append(inlineProperty);
        dialogContent.append(cornersProperty);
        dialogContent.append(miniProperty);
        dialogContent.append(themeProperty);

        dialog.appendTo('body');
        dialog.attr('id', 'propertyDialogFor' + data.Id);
        $('#propertyDialogFor' + data.Id).dialog();
    }

}

export = PropertiesView;