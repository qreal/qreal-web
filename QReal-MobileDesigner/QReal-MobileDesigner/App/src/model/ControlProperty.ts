import Enums = require("src/model/Enums");

module ControlProperty {

    export class Property {

        private type: Enums.ControlType;

        public get Type(): Enums.ControlType {
            return this.type;
        }

        public set Type(value: Enums.ControlType) {
            this.type = value;
        }

        private id: string;

        public get Id(): string {
            return this.id;
        }

        public set Id(value: string) {
            this.id = value;
        }

        constructor(type: Enums.ControlType, id: string) {
            this.Type = type;
            this.Id = id;
        }
    }

    export class PageProperty extends Property {

        constructor(id: string) {
            super(Enums.ControlType.Page, id);
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

        constructor(id: string) {
            super(Enums.ControlType.Button, id);
            this.Text = "Button";
            this.Inline = false;
            this.Corners = true;
            this.Mini = false;
            this.Theme = 'c';
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
            this.Theme = 'c';
            this.Placeholder = '';
            this.Name = '';
        }
    }

}

export =  ControlProperty;