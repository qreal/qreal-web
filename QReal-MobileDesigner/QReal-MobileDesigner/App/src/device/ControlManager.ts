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
import DesignerControls = require("src/model/controls/DesignerControls");

class ControlManager {

    private log = new Log("ControlManager");

    private controlFactory: IControlFactory;

    private idIndex = 1;
    private pages = new Array<DesignerControls.Page>();

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
    public CreateControl(controlId: string): DesignerControls.BaseControl<Property> {
        this.log.Debug("CreateControl: " + controlId);
        switch (controlId) {
            case "Button":
                return this.CreateButton();
            case "Input":
                return this.CreateInput();
            case "Header":
                return this.controlFactory.CreateHeader(this.GetNewId('header'));
            break
        }

    }

    private CreateButton(): DesignerControls.Button {
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

    public ChangeProperty(propertyId: string, propertyType: Enums.PropertyType, controlType: Enums.ControlType, newValue: string): void {
        this.log.Debug("OnChangeProperty, propertyId: " + propertyId + " propertyType: " + propertyType + " controlType: " + controlType + " value: " + newValue);
        if (propertyType == Enums.PropertyType.Id) {
            if (this.ContainsId(newValue)) {
                //TODO: show notification
                alert('Id already exists');
                return;
            }
        }

        switch (controlType) {
            case Enums.ControlType.Button:
                this.FindById(propertyId).ChangeProperty(propertyId, propertyType, newValue);
                break;
            case Enums.ControlType.Input:
                this.FindById(propertyId).ChangeProperty(propertyId, propertyType, newValue);
                break;
            case Enums.ControlType.Page:
                this.FindById(propertyId).ChangeProperty(propertyId, propertyType, newValue);
                break;
        }
    }

    public FindById(id: string): DesignerControls.BaseControl<Property> {
        for (var i in this.pages) {
            var control = this.FindInContainer(id, this.pages[i]);
            if (control) {
                return control;
            }
        }
        return null;
    }

    private FindInContainer(id: string, control: DesignerControls.BaseControl<Property>): DesignerControls.BaseControl<Property> {
        if (control.Properties.Id === id) {
            return control;
        }
        if (control instanceof DesignerControls.BaseContainer) {
            var childrens = (<DesignerControls.BaseContainer<Property>>control).Childrens;
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