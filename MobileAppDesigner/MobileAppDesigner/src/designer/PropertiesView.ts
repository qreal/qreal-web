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
        var dialog = $('#propertyDialogTmpl').tmpl({ title: data.Type });
        var dialogContent = dialog.children('.property');
        var idProperty = $('#propertyTextTmpl').tmpl(
            {
                name: 'Id:',
                valId: 'id1',
                value: data.Id
            });
        var self = this;
       
        var textProperty = $('#propertyTextTmpl').tmpl(
            {
                name: 'Text:',
                valId: 'id2',
                value: data.Text
            });

        textProperty.find('input').change(function () {
            self.log.Debug('change: ' + $(this).val());
            self.controller.EventManager.Trigger(EventManager.EventPropertiesChanged, {
                id: data.Id,
                text: $(this).val()
            });
        });

        dialogContent.append(idProperty);
        dialogContent.append(textProperty);

        dialog.appendTo('body');
        $(".propertyDialog").dialog();
    }

}

export = PropertiesView;