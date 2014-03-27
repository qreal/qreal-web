import App = require("src/Application");
import Log = require("src/util/log/Log");
import Device = require("src/device/Device");
import EventManager = require("src/util/events/EventManager");
import IEventListener = require("src/util/events/IEventListener");
import Enums = require("src/model/Enums");
import ControlProperty = require("src/model/ControlProperty");
import DesignerControls = require("src/model/DesignerControls");
import DesignerControlFactory = require("src/device/DesignerControlFactory");
import AppControlFactory = require("src/device/AppControlFactory");
import IControlFactory = require("src/device/IControlFactory");


class ControlManager {

    private log = new Log("ControlManager");

    private controlFactory: IControlFactory;
    private appControlFactory: AppControlFactory;

    private idIndex = 1;
    private app = new DesignerControls.BaseContainer<ControlProperty.Property>(new ControlProperty.Property(Enums.ControlType.App, "AppName"));

    constructor() {
        this.log.Debug("constructor");
        this.controlFactory = new DesignerControlFactory();
        this.appControlFactory = new AppControlFactory();
        this.app.Element = $("<div></div>");
    }

    public Init(): void {
        this.log.Debug("Init");
    }

    /*** Pages ***/
    public CreatePage(pageId: string): boolean {
        this.log.Debug("CreatePage: " + pageId);
        if (this.ContainsId(pageId)) {
            this.log.Warn("Page id alredy exists");
            //TODO: show notification
            alert('Id already exists');
            return false;
        }

        var page = this.controlFactory.CreatePage(new ControlProperty.PageProperty(pageId));
        this.app.Childrens.push(page);
        $('body').append(page.Element);
        this.SelectPage(pageId);
        return true;
    }

    public SelectPage(pageId: string): void {
        this.log.Debug("SelectPage: " + pageId);
        $.mobile.changePage('#' + pageId);
    }

    /*** Controls ***/
    public CreateControl(controlId: string): DesignerControls.BaseControl<ControlProperty.Property> {
        this.log.Debug("CreateControl: " + controlId);
        switch (controlId) {
            case "Button":
                return this.CreateButton();
            case "Input":
                return this.CreateInput();
            case "Header":
                //return this.controlFactory.CreateHeader(this.GetNewId('header'));
            break
        }

    }

    private CreateButton(): DesignerControls.Button {
        var property = new ControlProperty.ButtonProperty(this.GetNewId('button'));
        return this.controlFactory.CreateButton(property);
    }

    private CreateInput() {
        var property = new ControlProperty.InputProperty(this.GetNewId('input'));
        return this.controlFactory.CreateInput(property);
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

    /*** Changing Property ***/
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
                this.ChangeButtonProperty(propertyId, propertyType, newValue);
                break;
            case Enums.ControlType.Input:
                this.ChangeInputProperty(propertyId, propertyType, newValue);
                break;
            case Enums.ControlType.Page:
                this.ChangePageProperty(propertyId, propertyType, newValue);
                break;
        }
    }

    public ChangePageProperty(propertyId: string, propertyType: Enums.PropertyType, newValue: string) {
        this.log.Debug('ChangePageProperty');
        var page = this.FindById(propertyId);
        switch (propertyType) {
            case Enums.PropertyType.Header:
                if (newValue == 'yes') {
                    var header = App.Instance.Device.ControlManager.CreateControl('Header');
                    page.Element.prepend(header.Element);
                    page.Element.trigger('pagecreate');
                } else {
                    page.Element.find('div[data-role="header"]').remove();
                }
                break;
        }
    }

    public ChangeButtonProperty(propertyId: string, propertyType: Enums.PropertyType, newValue: string): void {
        var button = <DesignerControls.Button>this.FindById(propertyId);
        switch (propertyType) {
            case Enums.PropertyType.Id:
                button.Properties.Id = newValue;
                button.Element.attr('id', newValue);
                break;
            case Enums.PropertyType.Text:
                this.log.Debug("Enums.PropertyType.Text:", button.Element);
                button.Element.find('.ui-btn-text').text(newValue);
                button.Properties.Text = newValue;
                break;
            case Enums.PropertyType.Inline:
                var cond: boolean = newValue == "true";
                button.Element.buttonMarkup({ inline: cond });
                button.Properties.Inline = cond;
                break;
            case Enums.PropertyType.Corners:
                var cond: boolean = newValue == "true";
                button.Element.buttonMarkup({ corners: cond });
                button.Properties.Corners = cond;
                break;
            case Enums.PropertyType.Mini:
                var cond: boolean = newValue == "true";
                button.Element.buttonMarkup({ mini: cond });
                button.Properties.Mini = cond;
                break;
            case Enums.PropertyType.Theme:
                button.Element.buttonMarkup({ theme: newValue });
                button.Properties.Theme = newValue;
                break;
        }
    }

    public ChangeInputProperty(propertyId: string, propertyType: Enums.PropertyType, newValue: string) {
        var input = <DesignerControls.Input>this.FindById(propertyId);
        switch (propertyType) {
            case Enums.PropertyType.Id:
                input.Properties.Id = newValue;
                input.Element.find('input').attr('id', newValue);
                break;
            case Enums.PropertyType.Title:
                input.Element.find('label').text(newValue);
                input.Properties.Title = newValue;
                break;
            case Enums.PropertyType.Mini:
                var cond: boolean = newValue == "true";
                break;
            case Enums.PropertyType.Theme:
                break;
        }
    }

    /*** Generation App ***/
    public GenerateAppHtml(): string {
        return this.GenerateHtml(this.app).html();
    }

    private GenerateHtml(element: DesignerControls.BaseControl<ControlProperty.Property>): JQuery {
        var $html;
        switch (element.Properties.Type) {
            case Enums.ControlType.App:
                $html = this.appControlFactory.CreateApp(element.Properties);
                var app = <DesignerControls.BaseContainer<ControlProperty.Property>>element;
                for (var i in app.Childrens) {
                    $html.append(this.GenerateHtml(app.Childrens[i]))
                }
                break;
            case Enums.ControlType.Page:
                $html = this.appControlFactory.CreatePage(element.Properties);
                var page = <DesignerControls.BaseContainer<ControlProperty.Property>>element;
                for (var i in page.Childrens) {
                    $html.append(this.GenerateHtml(page.Childrens[i]))
                }
                break;
            case Enums.ControlType.Button:
                $html = this.appControlFactory.CreateButton(<ControlProperty.ButtonProperty>element.Properties);
                break;
            case Enums.ControlType.Input:
                $html = this.appControlFactory.CreateInput(<ControlProperty.InputProperty>element.Properties);
                break;

        }
        return $html;
    }

    public FindById(id: string): DesignerControls.BaseControl<ControlProperty.Property> {
        this.log.Debug("FindById: " + id);
        return this.FindInContainer(id, this.app);
    }

    private FindInContainer(id: string, control: DesignerControls.BaseControl<ControlProperty.Property>): DesignerControls.BaseControl<ControlProperty.Property> {
        if (control.Properties.Id === id) {
            return control;
        }
        if (control instanceof DesignerControls.BaseContainer) {
            var childrens = (<DesignerControls.BaseContainer<ControlProperty.Property>>control).Childrens;
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