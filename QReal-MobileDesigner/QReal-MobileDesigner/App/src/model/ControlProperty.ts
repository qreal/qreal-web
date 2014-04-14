import Enums = require("src/model/Enums");

module ControlProperty {

    export class Property {

        private type: string;
        private cssClass: string;
        private id: string;

        public get Type(): Enums.ControlType {
            return Enums.ControlType[this.type];
        }

        public set Type(value: Enums.ControlType) {
            this.type = Enums.ControlType[value];
        }

        public get Id(): string {
            return this.id;
        }

        public set Id(value: string) {
            this.id = value;
        }

        public get $Id(): string {
            return '#' + this.Id;
        }

        public get Class(): string {
            return this.cssClass;
        }

        public set Class(value: string) {
            this.cssClass = value;
        }

        constructor(type: Enums.ControlType, id: string) {
            this.Type = type;
            this.Id = id;
        }
    }

    export class AppProperty extends Property {

        private name: string;
        private projectPackage: string;

        public get Name(): string {
            return this.name;
        }

        public set Name(value: string) {
            this.name = value;
        }

        public get ProjectPackage(): string {
            return this.projectPackage;
        }

        public set ProjectPackage(value: string) {
            this.projectPackage = value;
        }

        constructor(name: string, projectPackage: string) {
            super(Enums.ControlType.App, "");
            this.Name = name;
            this.ProjectPackage = projectPackage;
        }
    }

    export class PageProperty extends Property {

        private header: boolean;
        private theme: string;
        private padding: string;

        public get Padding(): string {
            return this.padding;
        }

        public set Padding(value: string) {
            this.padding = value;
        }

        public get Header(): boolean {
            return this.header;
        }

        public set Header(value: boolean) {
            this.header = value;
        }

        public get Theme(): string {
            return this.theme;
        }

        public set Theme(value: string) {
            this.theme = value;
        }

        constructor(id: string) {
            super(Enums.ControlType.Page, id);
            this.header = false;
            this.theme = 'default';
            this.padding = '10px';
        }
    }

    export class HeaderProperty extends Property {

        private title: string;
        private theme: string;

        public get Title(): string {
            return this.title;
        }

        public set Title(value: string) {
            this.title = value;
        }

        public get Theme(): string {
            return this.theme;
        }

        public set Theme(value: string) {
            this.theme = value;
        }

        constructor(id: string) {
            super(Enums.ControlType.Header, id);
            this.Title = 'Header';
        }
    }

    export class ButtonProperty extends Property {

        private text: string;
        private inline: boolean;
        private corners: boolean;
        private mini: boolean;
        private theme: string;

        public get Text(): string {
            return this.text;
        }

        public set Text(value: string) {
            this.text = value;
        }

        public get Inline(): boolean {
            return this.inline;
        }

        public get InlineString(): string {
            return this.inline ? "true" : "false";
        }

        public set Inline(value: boolean) {
            this.inline = value;
        }

        public get Corners(): boolean {
            return this.corners;
        }

        public get CornersString(): string {
            return this.corners ? "true" : "false";
        }

        public set Corners(value: boolean) {
            this.corners = value;
        }

        public get Mini(): boolean {
            return this.mini;
        }

        public get MiniString(): string {
            return this.mini ? "true" : "false";
        }

        public set Mini(value: boolean) {
            this.mini = value;
        }

        public get Theme(): string {
            return this.theme;
        }

        public set Theme(value: string) {
            this.theme = value;
        }

        constructor(id: string) {
            super(Enums.ControlType.Button, id);
            this.Text = "Button";
            this.Inline = false;
            this.Corners = true;
            this.Mini = false;
            this.Theme = 'default';
        }
    }

    export class InputProperty extends Property {

        private title: string;
        private inline: boolean;
        private corners: boolean;
        private mini: boolean;
        private theme: string;
        private placeholder: string;
        private name: string;

        public get Title(): string {
            return this.title;
        }

        public set Title(value: string) {
            this.title = value;
        }

        public get Inline(): boolean {
            return this.inline;
        }

        public set Inline(value: boolean) {
            this.inline = value;
        }

        public get Corners(): boolean {
            return this.corners;
        }

        public set Corners(value: boolean) {
            this.corners = value;
        }

        public get Mini(): boolean {
            return this.mini;
        }

        public set Mini(value: boolean) {
            this.mini = value;
        }

        public get Theme(): string {
            return this.theme;
        }

        public set Theme(value: string) {
            this.theme = value;
        }

        public get Placeholder(): string {
            return this.placeholder;
        }

        public set Placeholder(value: string) {
            this.placeholder = value;
        }

        public get Name(): string {
            return this.name;
        }

        public set Name(value: string) {
            this.name = value;
        }

        constructor(id: string) {
            super(Enums.ControlType.Input, id);
            this.Title = "Title";
            this.Inline = false;
            this.Corners = true;
            this.Mini = false;
            this.Theme = 'default';
            this.Placeholder = '';
            this.Name = '';
        }
    }
}

export =  ControlProperty;