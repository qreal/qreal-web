import App = require("src/Application");
import Log = require("src/util/log/Log");
import DeviceController = require("src/device/DeviceController");
import EventManager = require("src/util/events/EventManager");
import IEventListener = require("src/util/events/IEventListener");
import Property = require("src/properties/Property");
import ButtonProperty = require("src/properties/ButtonProperty");

class ControlManager {

    private log = new Log("ControlManager");

    private idIndex = 1;
    private idList = [];
    private propertiesMap = [];

    constructor() {
        this.log.Debug("constructor");
    }

    public Init(): void {
        this.log.Debug("Init");
        App.DeviceController.EventManager.AddSubscriber(EventManager.EventPropertiesChanged, new PropertyChangeListener());
    }

    public CreateControl(controlId: string): void {
        this.log.Debug("CreateControl: " + controlId);
        this['Create' + controlId]();
    }

    private CreateButton() {
        var bt = $('<a href="#" data-role="button"></a>');
        var prop: ButtonProperty = new ButtonProperty(this.GetNewId());

        bt.attr('id', prop.Id);
        bt.text(prop.Text);
        this.propertiesMap[prop.Id] = prop;
        $(event.currentTarget).append(bt);

        bt.on('click', event => {
            this.log.Debug('bt click');
            this.log.DebugObj($(event.target));
            this.log.DebugObj($(event.target).data('prop'));
            App.DeviceController.EventManager.Trigger(EventManager.EventShowProperties, $(event.target).data('prop'));
        });

        var bt = bt.button();
        bt.children('.ui-btn-inner').data('prop', prop);
    }

    private GetNewId(): string {
        var id = 'id' + this.idIndex++;
        if (this.ContainsId(id)) {
            id = 'id' + this.idIndex++;
        }
        this.idList.push(id);
        return id;
    }

    public ContainsId(id: string): boolean {
        return this.idList.indexOf(id) > 0;
    }
}

class PropertyChangeListener implements IEventListener {

    private log = new Log("PropertyChangeListener");

    public OnEvent(data): void {
        this.log.Debug("EventPropertiesChanged");
        this.log.DebugObj(data);
        if (data.newId) {
            $('#' + data.id).attr('id', data.newId);
        }
        if (data.text) {
            $('#' + data.id).children('.ui-btn-inner').children('.ui-btn-text').text(data.text);
        }
        if (data.inline) {
            var cond: boolean = data.inline == "true";
            $('#' + data.id).buttonMarkup({ inline: cond });
        }
        if (data.corners) {
            var cond: boolean = data.corners == "true";
            $('#' + data.id).buttonMarkup({ corners: cond });
        }
        if (data.mini) {
            var cond: boolean = data.mini == "true";
            $('#' + data.id).buttonMarkup({ mini: cond });
        }
        if (data.theme) {
            $('#' + data.id).buttonMarkup({ theme: data.theme });
        }
    }
}

export = ControlManager;