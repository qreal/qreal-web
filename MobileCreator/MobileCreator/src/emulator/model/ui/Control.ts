/// <reference path="../../../../lib/jquery.d.ts" />
/// <reference path="../../../../lib/jquerymobile.d.ts" />

export class Control {

    public id: string;
    public element: JQuery;

    constructor(id: string) {
        this.id = id;
    }

    public getElement() {
        return $("Control");
    }

    public create() {
    }
}