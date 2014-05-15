import App = require("src/Application");
import Log = require("src/util/log/Log");
import Enums = require("src/model/Enums");
import ControlProperty = require("src/model/ControlProperty");
import AppControlFactory = require("src/device/AppControlFactory");

module DesignerControls {

    export class BaseControl<T extends ControlProperty.Property> {

        public log = new Log("BaseControl");

        private properties: T;

        public get Properties(): T {
            return this.properties
        }

        /*
        private element: JQuery;
        public get Element(): JQuery {
            return this.element;
        }

        public set Element(value: JQuery) {
            this.element = value;
        }
        */
        constructor(properties: T) {
            this.properties = properties;
        }
    }

    export class BaseContainer<T extends ControlProperty.Property> extends BaseControl<T> {

        private childrens: BaseControl<ControlProperty.Property>[] = [];

        public get Childrens(): BaseControl<ControlProperty.Property>[] {
            return this.childrens;
        }

        constructor(properties: T) {
            super(properties);
            this.log = new Log("BaseContainer");
        }   

    }

    export class Page extends BaseContainer<ControlProperty.PageProperty> {

        private header: Header;
        //private footer: BaseContainer<ControlProperty.HeaderProperty>;

        public get Header(): Header {
            return this.header;
        }

        public set Header(value: Header) {
            this.header = value;
        }

        constructor(properties: ControlProperty.PageProperty) {
            super(properties);
            this.log = new Log("Page");
        }
    }


    export class Header extends BaseContainer<ControlProperty.HeaderProperty> {

        constructor(properties: ControlProperty.HeaderProperty) {
            super(properties);
            this.log = new Log("Header");
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

    export class Map extends BaseControl<ControlProperty.MapProperty> {

        constructor(properties: ControlProperty.MapProperty) {
            super(properties);
            this.log = new Log("Map");
        }
    }
}

export = DesignerControls;