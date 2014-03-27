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
    }

    export class Button extends BaseControl<ControlProperty.ButtonProperty> {

        constructor(properties: ControlProperty.ButtonProperty) {
            super(properties);
            this.log = new Log("Button");
        }       
    }

    export class Input extends BaseControl<ControlProperty.InputProperty> {

        constructor(properties: ControlProperty.InputProperty) {
            super(properties);
            this.log = new Log("Input");
        }       
    }
}

export = DesignerControls;