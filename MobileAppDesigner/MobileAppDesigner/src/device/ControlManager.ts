import App = require("src/Application");
import Log = require("src/util/log/Log");
import Device = require("src/device/Device");
import EventManager = require("src/util/events/EventManager");
import IEventListener = require("src/util/events/IEventListener");
import Property = require("src/model/properties/Property");
import ButtonProperty = require("src/model/properties/ButtonProperty");
import InputProperty = require("src/model/properties/InputProperty");

import DesignerControlFactory = require("src/device/DesignerControlFactory");
import IControlFactory = require("src/device/DesignerControlFactory");

class ControlManager {

    private log = new Log("ControlManager");

    private controlFactory: IControlFactory;

    private idIndex = 1;
    private idList = [];
    private propertiesMap = [];

    constructor() {
        this.log.Debug("constructor");
        this.controlFactory = new DesignerControlFactory();
    }

    public Init(): void {
        this.log.Debug("Init");
        //this.CreatePage("MainPage");
        $("#MainPage").on('drop', event => this.OnDrop(event));
        $("#MainPage").on('dragover', event => this.OnDragOver(event));
    }

    /* Pages */
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

    /* Controls */
    public CreateControl(controlId: string): void {
        this.log.Debug("CreateControl: " + controlId);
        this['Create' + controlId]();
    }

    private CreateButton() {
        var bt = this.controlFactory.CreateButton(this.GetNewId());
        this.propertiesMap[bt.Properties.Id] = bt.Properties;
        $(event.currentTarget).append(bt.Element);
    }

    private CreateInput() {
        var input = $('<input type="text">');

        var prop: InputProperty = new InputProperty(this.GetNewId());
        input.attr('id', prop.Id);       

        this.propertiesMap[prop.Id] = prop;
        $(event.currentTarget).append(input);

        input.on('click', event => {
            this.log.Debug('input click', $(event.target));
            App.Instance.Designer.ShowProperty($(event.target).data('prop'));
        });

        //$(event.currentTarget).trigger('create');
        input = input.textinput();      
        input.data('prop', prop);
    }

    /* Id */

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
            case ControlType.Input:
                this.ChangeInputProperty(propertyId, propertyType, newValue);
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

    private ChangeInputProperty(propertyId: string, propertyType: PropertyType, newValue: string): void {
        this.log.Debug("ChangeInputProperty");
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
            case PropertyType.Mini:
                var cond: boolean = newValue == "true";
                //Not work
                $('#' + propertyId).textinput({ mini: cond });                
                break;
            case PropertyType.Theme:
                //Not work
                //$('#' + propertyId).textinput({ theme: newValue });
                break;
        }
    }
}

export = ControlManager;