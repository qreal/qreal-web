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
        //this.CreatePage("MainPage");
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
        return this.idList.indexOf(id) >= 0;
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
        this.log.DebugObj(this.idList);
        if (this.ContainsId(pageId)) {
            this.log.Warn("Page id alredy exists");
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

    public ChangeProperty(propertyId: string, propertyType: PropertyType, controlType: ControlType, newValue: string): void {
        this.log.Debug("OnChangeProperty, propertyId: " + propertyId + " propertyType: " + propertyType + " controlType: " + controlType + " value: " + newValue);
        switch (controlType) {
            case ControlType.Button:
                this.ChangeButtonProperty(propertyId, propertyType, newValue);
                break;
        }
    }

    private ChangeButtonProperty(propertyId: string, propertyType: PropertyType, newValue: string): void {
        switch (propertyType) {
            case PropertyType.Id:
                if (this.ContainsId(newValue)) {
                    //TODO: show notification
                    alert('Id already exists');
                } else {
                    $('#' + propertyId).attr('id', newValue);
                    this.ChangeId(propertyId, newValue);
                }
                break;
            case PropertyType.Text:
                $('#' + propertyId).children('.ui-btn-inner').children('.ui-btn-text').text(newValue);
                break;
            case PropertyType.Inline:
                var cond: boolean = newValue == "true";
                $('#' + propertyId).buttonMarkup({ inline: cond });
                break;
            case PropertyType.Corners:
                var cond: boolean = newValue == "true";
                $('#' + propertyId).buttonMarkup({ corners: cond });
                break;
            case PropertyType.Mini:
                var cond: boolean = newValue == "true";
                $('#' + propertyId).buttonMarkup({ mini: cond });
                break;
            case PropertyType.Theme:
                $('#' + propertyId).buttonMarkup({ theme: newValue });
                break;
        }
    }
}

export = ControlManager;