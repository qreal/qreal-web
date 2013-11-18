import Log = require("src/util/log/Log");
import Controller = require("src/designer/Controller");
import EventManager = require("src/util/events/EventManager");
import Property = require("src/properties/Property");
import ButtonProperty = require("src/properties/ButtonProperty");

class PropertiesView {

    private log = new Log("PropertiesView");

    private controller: Controller;

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
        var dialog = $('#propertyDialogFor' + data.Id)
        if (dialog.length) {
            this.log.DebugObj(dialog);
            dialog.dialog("open");
            return;
        }
        dialog = $('#propertyDialogTmpl').tmpl({ title: data.Type });
        var dialogContent = dialog.children('.property');
        var idProperty = $('#propertyTextTmpl').tmpl(
            {
                name: 'Id:',
                valId: 'id1',
                value: data.Id
            });
        var self = this;


        var trueFalseOptions = [
            { Text: "No", Value: false },
            { Text: "Yes", Value: true }
        ];

        var textProperty = $('#propertyTextTmpl').tmpl(
            {
                name: 'Text:',
                id: 'textProperty',
                value: data.Text
            });

        textProperty.find('#textProperty').change(function () {
            self.log.Debug('change: ' + $(this).val());
            self.controller.EventManager.Trigger(EventManager.EventPropertiesChanged, {
                id: data.Id,
                text: $(this).val()
            });
        });

        var inlineProperty = $('#propertySelectTmpl').tmpl(
            {
                id: 'inlineProperty',
                name: 'Inline:'
            });

        $("#templateOptionItem").tmpl(trueFalseOptions).appendTo(inlineProperty.find('#inlineProperty'));

        inlineProperty.find('#inlineProperty').change(function () {
            self.log.Debug('change: ' + $(this).val());
            self.controller.EventManager.Trigger(EventManager.EventPropertiesChanged, {
                id: data.Id,
                inline: $(this).val()
            });
        });

        var cornersProperty = $('#propertySelectTmpl').tmpl(
            {
                id: 'cornersProperty',
                name: 'Rounded corners:'
            });

        $("#templateOptionItem").tmpl(trueFalseOptions).appendTo(cornersProperty.find('#cornersProperty'));

        cornersProperty.find('#cornersProperty').val('true');
        cornersProperty.find('#cornersProperty').change(function () {
            self.log.Debug('change: ' + $(this).val());
            self.controller.EventManager.Trigger(EventManager.EventPropertiesChanged, {
                id: data.Id,
                corners: $(this).val()
            });
        });

        var miniProperty = $('#propertySelectTmpl').tmpl(
            {
                id: 'miniProperty',
                name: 'Mini:'
            });

        $("#templateOptionItem").tmpl(trueFalseOptions).appendTo(miniProperty.find('#miniProperty'));

        miniProperty.find('#miniProperty').change(function () {
            self.log.Debug('change: ' + $(this).val());
            self.controller.EventManager.Trigger(EventManager.EventPropertiesChanged, {
                id: data.Id,
                mini: $(this).val()
            });
        });

        var themeProperty = $('#propertySelectTmpl').tmpl(
            {
                id: 'themeProperty',
                name: 'Theme:'
            });

        $("#templateOptionItem").tmpl([
            { Text: "Theme A", Value: "a" },
            { Text: "Theme B", Value: "b" },
            { Text: "Theme C", Value: "c" },
            { Text: "Theme D", Value: "d" },
            { Text: "Theme E", Value: "e" },
        ]).appendTo(themeProperty.find('#themeProperty'));
        
        themeProperty.find('#themeProperty').val('c');
        themeProperty.find('#themeProperty').change(function () {
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
        dialog.attr('id', 'propertyDialogFor' + data.Id );
        $('#propertyDialogFor' + data.Id).dialog();
        //$('#propertyDialogFor' + data.Id).dialog('open');
    }

}

export = PropertiesView;