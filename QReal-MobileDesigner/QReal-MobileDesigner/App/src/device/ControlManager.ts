import App = require("src/Application");
import Log = require("src/util/log/Log");
import Device = require("src/device/Device");
import EventManager = require("src/util/events/EventManager");
import IEventListener = require("src/util/events/IEventListener");
import Enums = require("src/model/Enums");
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
            case "Input":
                return this.CreateInput();
            break
        }

    }

    private CreateButton(): Button {
        return this.controlFactory.CreateButton(this.GetNewId('button'));
    }

    private CreateInput() {
        return this.controlFactory.CreateInput(this.GetNewId('input'));
    }

    /* Id */
    private GetNewId(prefix: string = 'id'): string {
        var id = prefix + this.idIndex++;
        if (this.ContainsId(id)) {
            this.log.Warn('id: ' + id + ' already exists');
            id = prefix + this.idIndex++;
        }
        return id;
    }

    public ContainsId(id: string): boolean {
        return this.FindById(id) != null;
    }

    public ChangeId(id: string, newId: string): void {
        this.log.Debug("ChangeId, id=" + id + ", newId=" + newId);

        if (this.ContainsId(newId)) {
            //TODO: show notification
            alert('Id already exists');
        } else {
            var element = this.FindById(id);
            $('#' + id).attr('id', newId);
            this.FindById(id).Properties.Id = newId;
        }
    }

    public ChangeProperty(propertyId: string, propertyType: Enums.PropertyType, controlType: Enums.ControlType, newValue: string): void {
        this.log.Debug("OnChangeProperty, propertyId: " + propertyId + " propertyType: " + propertyType + " controlType: " + controlType + " value: " + newValue);
        switch (controlType) {
            case Enums.ControlType.Button:
                (<Button>this.FindById(propertyId)).ChangeProperty(propertyId, propertyType, newValue);
                break;
            case Enums.ControlType.Input:
                this.ChangeInputProperty(propertyId, propertyType, newValue);
                break;
        }
    }

    private ChangeButtonProperty(propertyId: string, propertyType: Enums.PropertyType, newValue: string): void {
        switch (propertyType) {
            case Enums.PropertyType.Id:
                this.ChangeId(propertyId, newValue);
                break;
            case Enums.PropertyType.Text:
                $('#' + propertyId).children('.ui-btn-inner').children('.ui-btn-text').text(newValue);
                break;
            case Enums.PropertyType.Inline:
                var cond: boolean = newValue == "true";
                $('#' + propertyId).buttonMarkup({ inline: cond });
                break;
            case Enums.PropertyType.Corners:
                var cond: boolean = newValue == "true";
                $('#' + propertyId).buttonMarkup({ corners: cond });
                break;
            case Enums.PropertyType.Mini:
                var cond: boolean = newValue == "true";
                $('#' + propertyId).buttonMarkup({ mini: cond });
                break;
            case Enums.PropertyType.Theme:
                $('#' + propertyId).buttonMarkup({ theme: newValue });
                break;
        }
    }

    private ChangeInputProperty(propertyId: string, propertyType: Enums.PropertyType, newValue: string): void {
        this.log.Debug("ChangeInputProperty");
        switch (propertyType) {
            case Enums.PropertyType.Id:
                this.ChangeId(propertyId, newValue);
                break;
            case Enums.PropertyType.Title:
                var input = this.FindById(propertyId);
                //input.
                //input.Element.find('label').text(newValue);               
                break;
            case Enums.PropertyType.Mini:
                var cond: boolean = newValue == "true";
                //Not work
                //$('#' + propertyId).buttonMarkup({ mini: cond });
                break;
            case Enums.PropertyType.Theme:
                //Not work
                $('#' + propertyId).textinput({ theme: newValue });
                break;
        }
    }

    private FindById(id: string): BaseControl<Property> {
        for (var i in this.pages) {
            var control = this.FindInContainer(id, this.pages[i]);
            if (control) {
                return control;
            }
        }
        return null;
    }

    private FindInContainer(id: string, control: BaseControl<Property>): BaseControl<Property> {
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