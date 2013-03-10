/// <reference path="../../lib/jquery.d.ts" />
/// <reference path="../../lib/knockout.d.ts" />
/// <reference path="../../lib/jquerymobile.d.ts" />
export class PropertiesEditor {
    private domElement: JQuery;
    get DomElement() {
        return this.domElement;
    }
    set DomElement(domElement: JQuery) {
        this.domElement = domElement;
    }
    constructor();
    constructor(domElement: JQuery);
    constructor(domElement?: JQuery = $("<div></div>")) {
        this.domElement = domElement;
    }
    public init() {
    }
}