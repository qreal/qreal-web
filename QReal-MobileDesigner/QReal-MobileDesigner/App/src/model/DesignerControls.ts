import App = require("src/Application");
import Log = require("src/util/log/Log");
import Enums = require("src/model/Enums");
import ControlProperty = require("src/model/ControlProperty");

module DesignerControls {

    export class BaseControl<T extends ControlProperty.Property> {

        public log = new Log("BaseControl");

        private properties: T;


        public get Properties(): T {
            return this.properties
        }

        private element: JQuery;
        public get Element(): JQuery {
            return this.element;
        }

        public set Element(value: JQuery) {
            this.element = value;
        }

        constructor(properties: T) {
            this.properties = properties;
        }

        public ChangeProperty(propertyId: string, propertyType: Enums.PropertyType, newValue: string) {
        }
    }

    export class BaseContainer<T extends ControlProperty.Property> extends BaseControl<T> {

        private childrens = [];

        public get Childrens() {
            return this.childrens;
        }

        constructor(properties: T) {
            super(properties);
            this.log = new Log("BaseContainer");
        }

        public Create(): JQuery {
            this.log.Error("This method should not be used");
            return $("");
        }

        public CreateForDesigner(): JQuery {
            this.log.Error("This method should not be used");
            return $("");
        }

    }

    export class Page extends BaseContainer<ControlProperty.PageProperty> {

        constructor(properties: ControlProperty.PageProperty) {
            super(properties);
            this.log = new Log("Page");
        }

        public OnDrop(event) {
            this.log.Debug("OnDrop, event: ", event);
            event.preventDefault();
            var controlId = event.originalEvent.dataTransfer.getData("Text");
            var control = App.Instance.Device.ControlManager.CreateControl(controlId);
            this.Childrens.push(control);
            this.Element.append(control.Element);
        }

        public OnDragOver(e) {
            e.preventDefault();
        }

        public ChangeProperty(propertyId: string, propertyType: Enums.PropertyType, newValue: string) {
            this.log.Debug('ChangeProperty');
            switch (propertyType) {
                case Enums.PropertyType.Header:
                    if (newValue == 'yes') {
                        this.log.Debug('Yes');
                        var header = App.Instance.Device.ControlManager.CreateControl('Header');
                        this.Element.prepend(header.Element);
                        this.Element.trigger('pagecreate');
                    } else {
                        this.log.Debug('No');
                        this.Element.find('div[data-role="header"]').remove();
                    }
                    break;
            }
        }
    }

    export class Button extends BaseControl<ControlProperty.ButtonProperty> {

        constructor(properties: ControlProperty.ButtonProperty) {
            super(properties);
            this.log = new Log("Button");
        }

        public ChangeProperty(propertyId: string, propertyType: Enums.PropertyType, newValue: string): void {
            switch (propertyType) {
                case Enums.PropertyType.Id:
                    this.Properties.Id = newValue;
                    this.Element.attr('id', newValue);
                    break;
                case Enums.PropertyType.Text:
                    this.log.Debug("Enums.PropertyType.Text:", this.Element);
                    this.Element.find('.ui-btn-text').text(newValue);
                    break;
                case Enums.PropertyType.Inline:
                    var cond: boolean = newValue == "true";
                    this.Element.buttonMarkup({ inline: cond });
                    break;
                case Enums.PropertyType.Corners:
                    var cond: boolean = newValue == "true";
                    this.Element.buttonMarkup({ corners: cond });
                    break;
                case Enums.PropertyType.Mini:
                    var cond: boolean = newValue == "true";
                    this.Element.buttonMarkup({ mini: cond });
                    break;
                case Enums.PropertyType.Theme:
                    this.Element.buttonMarkup({ theme: newValue });
                    break;
            }
        }
    }

    export class Input extends BaseControl<ControlProperty.InputProperty> {

        constructor(properties: ControlProperty.InputProperty) {
            super(properties);
            this.log = new Log("Input");
        }

        public ChangeProperty(propertyId: string, propertyType: Enums.PropertyType, newValue: string) {
            switch (propertyType) {
                case Enums.PropertyType.Id:
                    this.Properties.Id = newValue;
                    this.Element.find('input').attr('id', newValue);
                    break;
                case Enums.PropertyType.Title:
                    this.Element.find('label').text(newValue);
                    break;
                case Enums.PropertyType.Mini:
                    var cond: boolean = newValue == "true";
                    //Not work
                    //$('#' + propertyId).buttonMarkup({ mini: cond });
                    break;
                case Enums.PropertyType.Theme:
                    //Not work
                    //$('#' + propertyId).textinput({ theme: newValue });
                    break;
            }
        }
    }
}

export = DesignerControls;