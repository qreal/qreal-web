import App = require("src/Application");
import Log = require("src/util/log/Log");
import Device = require("src/device/Device");
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
        App.Instance.Device.EventManager.AddSubscriber(EventManager.EventPropertiesChanged, new PropertyChangeListener(this));
        //this.CreatePage("Main Page");
        $("#MainPage").on('drop', event => this.OnDrop(event));
        $("#MainPage").on('dragover', event => this.OnDragOver(event));   
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
            App.Instance.Designer.ShowProperty($(event.target).data('prop'));
        });

        var bt = bt.button();
        bt.children('.ui-btn-inner').data('prop', prop);
    }

    private GetNewId(): string {
        var id = 'id' + this.idIndex++;
        if (this.ContainsId(id)) {
            this.log.Warn('id: ' + id + ' already exists');
            id = 'id' + this.idIndex++;
        }
        this.idList.push(id);
        return id;
    }

    public ContainsId(id: string): boolean {
        return this.idList.indexOf(id) > 0;
    }

    public ChangeId(id: string, newId: string): void {
        this.log.Debug("ChangeId, id=" + id + ", newId=" + newId);

        this.idList.push(newId);
        delete this.idList[this.idList.indexOf(id)];
        this.propertiesMap[newId] = this.propertiesMap[id];
        this.propertiesMap[newId].Id = newId;
        delete this.propertiesMap[id];
    }

    public CreatePage(pageId: string): boolean {
        this.log.Debug("CreatePage: " + pageId);
        if (this.ContainsId(pageId)) {
            //TODO: show notification
            alert('Id already exists');
            return false;
        }
        this.idList.push(pageId);
        var newPage = $('<div data-role="page"></div>');
        newPage.attr('id', pageId);
        newPage.on('drop', event => this.OnDrop(event));
        newPage.on('dragover', event => this.OnDragOver(event));   
        $('body').append(newPage);  
        this.SelectPage(pageId);     
        return true;          
    }

    public SelectPage(pageId: string): void {
        this.log.Debug("SelectPage: " + pageId);
        $.mobile.changePage('#' + pageId);
    }

    public OnDrop(event) {
        this.log.Debug("OnDrop, event: ", event);
        event.preventDefault();
        var controlId = event.originalEvent.dataTransfer.getData("Text");
        this.CreateControl(controlId);
    }

    public OnDragOver(e) {
        //this.log.Debug("OnDragOver");
        e.preventDefault();
    }
}

class PropertyChangeListener implements IEventListener {

    private log = new Log("PropertyChangeListener");

    private controlManager: ControlManager = null;

    constructor(controlManager: ControlManager) {
        this.controlManager = controlManager;
    }

    public OnEvent(data): void {
        this.log.Debug("OnEvent, data: ", data);
        this.log.DebugObj(data);
        if (data.newId) {
            if (this.controlManager.ContainsId(data.newId)) {
                //TODO: show notification
                alert('Id already exists');
            } else {
                $('#' + data.id).attr('id', data.newId);
                this.controlManager.ChangeId(data.id, data.newId);
            }
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