import App = require("src/Application");
import Log = require("src/util/log/Log");
import Helper = require("src/util/Helper");
import Device = require("src/device/Device");
import EventManager = require("src/util/events/EventManager");
import IEventListener = require("src/util/events/IEventListener");
import Enums = require("src/model/Enums");
import ControlProperty = require("src/model/ControlProperty");
import DesignerControls = require("src/model/DesignerControls");
import DesignerControlFactory = require("src/device/DesignerControlFactory");
import AppControlFactory = require("src/device/AppControlFactory");

class ControlManager {

    private log = new Log("ControlManager");

    private controlFactory: DesignerControlFactory;
    private appControlFactory: AppControlFactory;

    private idIndex = 1;
    private app;

    constructor() {
        this.log.Debug("constructor");
        this.controlFactory = new DesignerControlFactory();
        this.appControlFactory = new AppControlFactory();
    }

    public Init(): void {
        this.log.Debug("Init");
        this.app = new DesignerControls.BaseContainer<ControlProperty.AppProperty>(new ControlProperty.AppProperty((<any>parent).projectName, (<any>parent).projectPackage));
    }

    /*** Pages ***/
    public CreatePage(pageId: string): boolean {
        this.log.Debug("CreatePage: " + pageId);
        var self = this;
        if (this.ContainsId(pageId)) {
            this.log.Warn("Page id alredy exists");
            //TODO: show notification
            alert('Id already exists');
            return false;
        }

        var page = new DesignerControls.Page(new ControlProperty.PageProperty(pageId));
        var $page = this.controlFactory.CreatePage(page.Properties);
        $page.trigger('pagecreate');
        $('body').append($page);

        this.app.Childrens.push(page);
        this.SelectPage(pageId);
        /*
            .sortable({

            helper: "clone",
            axis: "y",

            revert: 100,
            distance: 0,
            forceHelperSize: true,
            forcePlaceholderSize: true,
            scrollSensitivity: 0,
            start: function (event, ui) {
                ui.placeholder.width(ui.helper.width());
            },
            cancel: '.nondraggable',
            stop: function (event, ui) {

            },
            change: function (e, ui) {
                console.log("sort called");
            },
            tolerance: "pointer"
        });
    */
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
                var btProperty = new ControlProperty.ButtonProperty(this.GetNewId('button'));
                return new DesignerControls.Button(btProperty);
            case "Input":
                var inputProperty = new ControlProperty.InputProperty(this.GetNewId('input'));
                return new DesignerControls.Input(inputProperty);
            case "Header":
                //return this.controlFactory.CreateHeader(this.GetNewId('header'));
                break;
            case "Grid":
                var mapProperty = new ControlProperty.MapProperty(this.GetNewId('map'));
                return new DesignerControls.Map(mapProperty);
            case "Label":
                console.log('label');
                var labelProperty = new ControlProperty.LabelProperty(this.GetNewId('label'));
                return new DesignerControls.Label(labelProperty);
        }

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
            case Enums.ControlType.Header:
                this.ChangeHeaderProperty(propertyId, propertyType, newValue);
                break;
            case Enums.ControlType.Label:
                this.ChangeLabelProperty(propertyId, propertyType, newValue);
                break;
        }
    }

    public ChangePageProperty(propertyId: string, propertyType: Enums.PropertyType, newValue: string) {
        this.log.Debug('ChangePageProperty');
        var page = <DesignerControls.Page>this.FindById(propertyId);
        var $page = $(page.Properties.$Id);
        switch (propertyType) {
            case Enums.PropertyType.Header:
                var cond: boolean = newValue == "true";
                page.Properties.Header = cond;
                if (cond) {
                    var headerProp = new ControlProperty.HeaderProperty(propertyId + '_header');
                    var header = new DesignerControls.Header(headerProp);
                    var $header = this.controlFactory.CreateHeader(headerProp);

                    page.Header = header;
                    $page.prepend($header);
                } else {
                    $page.find('div[data-role="header"]').remove();
                    page.Header = null;
                }
                break;
            case Enums.PropertyType.Theme:
                $page.removeClass("ui-page-theme-a ui-page-theme-b");
                page.Properties.Theme = newValue;
                if (newValue == 'default') {
                    $page.addClass("ui-page-theme-a");
                } else {
                    $page.addClass("ui-page-theme-" + newValue);
                }
                break;
        }
    }

    public ChangeHeaderProperty(propertyId: string, propertyType: Enums.PropertyType, newValue: string) {
        this.log.Debug('ChangeHeaderProperty');
        var header = <DesignerControls.Header>this.FindById(propertyId);
        var $header = $(header.Properties.$Id);
        switch (propertyType) {
            case Enums.PropertyType.Title:
                header.Properties.Title = newValue;
                $header.find('h1').text(newValue);
                break;
            case Enums.PropertyType.Theme:
                //$header.find('h1').text(newValue);
                header.Properties.Theme = newValue;
                $header.removeClass("ui-bar-a ui-bar-b ui-bar-inherit").addClass("ui-bar-" + newValue);
                break;
        }
    }

    public ChangeButtonProperty(propertyId: string, propertyType: Enums.PropertyType, newValue: string): void {
        var button = <DesignerControls.Button>this.FindById(propertyId);
        switch (propertyType) {
            case Enums.PropertyType.Id:
                $(button.Properties.$Id).attr('id', newValue);
                button.Properties.Id = newValue;
                break;
            case Enums.PropertyType.Text:
                $(button.Properties.$Id).text(newValue);
                button.Properties.Text = newValue;
                break;
            case Enums.PropertyType.Inline:
                var cond: boolean = newValue == "true";
                this.ToogleClass(button.Properties.$Id, 'ui-btn-inline', cond);
                button.Properties.Inline = cond;
                break;
            case Enums.PropertyType.Corners:
                var cond: boolean = newValue == "true";
                this.ToogleClass(button.Properties.$Id, 'ui-corner-all', cond);
                button.Properties.Corners = cond;
                break;
            case Enums.PropertyType.Mini:
                var cond: boolean = newValue == "true";
                this.ToogleClass(button.Properties.$Id, 'ui-mini', cond);
                button.Properties.Mini = cond;
                break;
            case Enums.PropertyType.Theme:
                $(button.Properties.$Id).removeClass("ui-btn-a ui-btn-b");
                $(button.Properties.$Id).addClass('ui-btn-' + newValue);
                button.Properties.Theme = newValue;
                break;
        }
    }

    public ChangeInputProperty(propertyId: string, propertyType: Enums.PropertyType, newValue: string) {
        var input = <DesignerControls.Input>this.FindById(propertyId);
        switch (propertyType) {
            case Enums.PropertyType.Id:
                $(input.Properties.$Id).find('input').attr('id', newValue);
                $(input.Properties.$Id).find('label').attr('for', newValue);
                input.Properties.Id = newValue;
                break;
            case Enums.PropertyType.Title:
                $(input.Properties.$Id).parent().parent().find('label').text(newValue);
                input.Properties.Title = newValue;
                break;
            case Enums.PropertyType.Mini:
                var cond: boolean = newValue == "true";
                this.ToogleClass(input.Properties.$Id, 'ui-mini', cond);
                input.Properties.Mini = cond;
                break;
            case Enums.PropertyType.Theme:
                break;
        }
    }

    public ChangeLabelProperty(propertyId: string, propertyType: Enums.PropertyType, newValue: string) {
        var label = <DesignerControls.Input>this.FindById(propertyId);
        switch (propertyType) {
            case Enums.PropertyType.Id:
                $(label.Properties.$Id).attr('id', newValue);
                label.Properties.Id = newValue;
                break;
            case Enums.PropertyType.Text:
                $(label.Properties.$Id).text(newValue);
                label.Properties.Title = newValue;
                break;
        }
    }

    /*** Generation App ***/
    public GenerateAppHtml(): string {
        return this.GenerateHtml(this.app).html();
    }

    private GenerateHtml(element: DesignerControls.BaseControl<ControlProperty.Property>): JQuery {
        var $html: JQuery;
        switch (element.Properties.Type) {
            case Enums.ControlType.App:
                $html = this.appControlFactory.CreateApp(element.Properties);
                var app = <DesignerControls.BaseContainer<ControlProperty.Property>>element;
                for (var i in app.Childrens) {
                    $html.append(this.GenerateHtml(app.Childrens[i]))
                }
                break;
            case Enums.ControlType.Page:
                var page = <DesignerControls.Page>element;
                $html = this.appControlFactory.CreatePage(page.Properties);
                if (page.Header) {
                    var $header = this.appControlFactory.CreateHeader(page.Header.Properties);
                    $html.prepend($header)
                }
                for (var i in page.Childrens) {
                    $html.find('div[role=main]').append(this.GenerateHtml(page.Childrens[i]))
                }
                break;
            case Enums.ControlType.Button:
                var button = <DesignerControls.Button>element;
                $html = this.appControlFactory.CreateButton(button.Properties);
                break;
            case Enums.ControlType.Input:
                var input = <DesignerControls.Input>element;
                $html = this.appControlFactory.CreateInput(input.Properties);
                break;
            case Enums.ControlType.Header:
                var header = <DesignerControls.Header>element;
                $html = this.appControlFactory.CreateHeader(header.Properties);
                break;
            case Enums.ControlType.Map:
                var map = <DesignerControls.Map>element;
                $html = this.appControlFactory.CreateMap(map.Properties);
                break;
            case Enums.ControlType.Label:
                var label = <DesignerControls.Label>element;
                $html = this.appControlFactory.CreateLabel(label.Properties);
                break;
        }
        return $html;
    }

    public Serialize(): string {
        var obj = this.AppToSerializeObj(this.app);
        return JSON.stringify(obj, null, 4);
    }

    private AppToSerializeObj(element: DesignerControls.BaseControl<ControlProperty.Property>): any {
        var obj;
        var self = this;
        switch (element.Properties.Type) {
            case Enums.ControlType.App:
                obj = element.Properties;
                var app = <DesignerControls.BaseContainer<ControlProperty.Property>>element;
                obj["Pages"] = [];
                app.Childrens.forEach(function (el) {
                    obj["Pages"].push(self.AppToSerializeObj(el));
                });
                break;
            case Enums.ControlType.Page:
                obj = element.Properties;
                var page = <DesignerControls.Page>element;
                if (page.Header) {
                    obj['Header'] = page.Header.Properties;
                }
                obj["Controls"] = [];
                page.Childrens.forEach(function (el) {
                    obj["Controls"].push(self.AppToSerializeObj(el));
                });
                break;
            case Enums.ControlType.Button:
            case Enums.ControlType.Input:
            case Enums.ControlType.Header:
            case Enums.ControlType.Map:
                obj = element.Properties;
                break;
        }
        return obj;
    }

    public Serialize2DiagramEditor(): any {
        var obj = {
            'nodes': [],
            'activities': []
        };
        this.App2Obj4DiagramEditor(obj, this.app);
        return obj;
    }

    private App2Obj4DiagramEditor(obj: any, element: DesignerControls.BaseControl<ControlProperty.Property>) {
        var self = this;
        switch (element.Properties.Type) {
            case Enums.ControlType.App:
                var app = <DesignerControls.BaseContainer<ControlProperty.Property>>element;
                app.Childrens.forEach(function (el) {
                    self.App2Obj4DiagramEditor(obj, el);
                });
                break;
            case Enums.ControlType.Page:
                var page = <DesignerControls.Page>element;
                obj['activities'].push({
                    'name': page.Properties.Id
                });
                page.Childrens.forEach(function (el) {
                    self.App2Obj4DiagramEditor(obj, el);
                });
                break;
            case Enums.ControlType.Button:
                var button = <DesignerControls.Button>element;
                obj["nodes"].push({
                    'id': button.Properties.Id,
                    'type': 'Button',
                    "name": button.Properties.Text,
                    "action": "click"
                });
                break;
            case Enums.ControlType.Input:
                var input = <DesignerControls.Input>element;
                obj["nodes"].push({
                    'id': input.Properties.Id,
                    'type': 'Input',
                    "name": 'name',
                    "action": "submit"
                });
                break;
            case Enums.ControlType.Header:
                break;
            case Enums.ControlType.Map:
                obj["nodes"].push({
                    'id': element.Properties.Id,
                    'type': 'Map'
                });
                break;
        }
    }

    private ToogleClass(id: string, cssclass: string, add: boolean) {
        if (add) {
            $(id).addClass(cssclass);
        } else {
            $(id).removeClass(cssclass);
        }
    }

    public OnDrop(event, pageId) {
        this.log.Debug("OnDrop, event: ", event);
        event.preventDefault();
        var controlId = event.originalEvent.dataTransfer.getData("Text");
        var control = App.Instance.Device.ControlManager.CreateControl(controlId);
        var $control = this.controlFactory.CreateControl(control.Properties);
        console.log($control);
        var page = <DesignerControls.BaseContainer<ControlProperty.Property>>this.FindById(pageId);
        page.Childrens.push(control);
        $(page.Properties.$Id).find('div[role=main]').append($control);
    }

    public OnDragOver(e) {
        e.preventDefault();
    }

    public FindById(id: string): DesignerControls.BaseControl<ControlProperty.Property> {
        //this.log.Debug("FindById: " + id);
        return this.FindInContainer(id, this.app);
    }

    private FindInContainer(id: string, control: DesignerControls.BaseControl<ControlProperty.Property>): DesignerControls.BaseControl<ControlProperty.Property> {
        //this.log.Debug("FindInContainer: " + id, control);
        if (!control) {
            return null;
        }
        if (control.Properties.Id === id) {
            return control;
        }
        if (control instanceof DesignerControls.Page) {
            var page = <DesignerControls.Page> control;
            var res = this.FindInContainer(id, page.Header);
            if (res) {
                return res;
            }
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