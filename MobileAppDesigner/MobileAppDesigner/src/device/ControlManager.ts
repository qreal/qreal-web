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

import BaseControl = require("src/model/controls/BaseControl");
import BaseContainer = require("src/model/controls/BaseContainer");
import Button = require("src/model/controls/Button");
import Page = require("src/model/controls/Page");

class ControlManager {

    private log = new Log("ControlManager");

    private controlFactory: IControlFactory;

    private idIndex = 1;
    private idList = [];
    private pages = new Array<Page>();

    constructor() {
        this.log.Debug("constructor");
        this.controlFactory = new DesignerControlFactory();
    }

    public Init(): void {
        this.log.Debug("Init");
    }

    /* Pages */
    public CreatePage(pageId: string): boolean {
        this.log.Debug("CreatePage: " + pageId);
        if (this.ContainsId(pageId)) {
            this.log.Warn("Page id alredy exists");
            //TODO: show notification
            alert('Id already exists');
            return false;
        }

        this.idList.push(pageId);
        var page = this.controlFactory.CreatePage(pageId);
        this.pages.push(page);
        $('body').append(page.Element);
        this.SelectPage(pageId);
        return true;
    }

    public SelectPage(pageId: string): void {
        this.log.Debug("SelectPage: " + pageId);
        $.mobile.changePage('#' + pageId);
    }

    /* Controls */
    public CreateControl(controlId: string): BaseControl<Property> {
        this.log.Debug("CreateControl: " + controlId);
        switch (controlId) {
            case "Button":
                return this.CreateButton();
            break
        }

    }

    private CreateButton(): Button {
        var bt = this.controlFactory.CreateButton(this.GetNewId());
        return bt;
    }

    private CreateInput() {
        return;
        var input = $('<input type="text">');

        var prop: InputProperty = new InputProperty(this.GetNewId());
        input.attr('id', prop.Id);

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
        this.FindById(id).Properties.Id = newId;
        //this.propertiesMap[newId] = this.propertiesMap[id];
        //this.propertiesMap[newId].Id = newId;
        //delete this.propertiesMap[id];
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

    private FindById(id: string): BaseControl<Property> {
        this.log.Debug("FindById: " + id, this.pages)
        for (var i in this.pages) {
            var control = this.FindInContainer(id, this.pages[i]);
            if (control) {
                return control;
            }
        }
        return null;
    }

    private FindInContainer(id: string, control: BaseControl<Property>): BaseControl<Property> {
        this.log.Debug("FindInContainer: ", control)
        if (control.Properties.Id === id) {
            return control;
        }
        if (control instanceof BaseContainer) {
            var childrens = (<BaseContainer<Property>>control).Childrens;
            for (var i in childrens) {
                var res = this.FindInContainer(id, childrens[i]);
                if (res) {
                    return res;
                }
            }
        }
        return null;
    }
}

export = ControlManager;