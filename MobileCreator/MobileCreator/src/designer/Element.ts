/// <reference path="../../lib/jquery.d.ts" />
/// <reference path="../../lib/jquerymobile.d.ts" />
import mElementPreferences = module("designer/ElementPreferences")

export class Element {
    private domElement: JQuery;
    get DomElement() {
        return this.domElement;
    }
    set DomElement(domElement: JQuery) {
        this.domElement = domElement;
    }
    private preferences: mElementPreferences.ElementPreferences;
    get Preferences() {
        return this.preferences;
    }
    set Preferences(preferences: mElementPreferences.ElementPreferences) {
        this.preferences = preferences;
    }
    constructor(domElement: JQuery) {
        this.domElement = domElement;
        this.domElement.css('margin: 0px');
    }
    public applyWidth();
    public applyWidth(dom: JQuery);
    public applyWidth(dom?: JQuery = this.domElement) {
        if (this.preferences.Width == mElementPreferences.ElementPreferences.FillParent) {
            dom.css("width", "100%");
            return;
        }
        if (this.preferences.Width == mElementPreferences.ElementPreferences.WrapContent) {
            return;
        }
        dom.css("width", this.preferences.Width + "px");
    }
    public applyHeight();
    public applyHeight(dom: JQuery);
    public applyHeight(dom?: JQuery = this.domElement) {
        if (this.preferences.Height == mElementPreferences.ElementPreferences.FillParent) {
            dom.css("height", "100%");
            return;
        }
        if (this.preferences.Height == mElementPreferences.ElementPreferences.WrapContent) {
            return;
        }
        dom.css("height", this.preferences.Height + "px");
    }
    public toXML() {
    }
    public init() {
    }
}