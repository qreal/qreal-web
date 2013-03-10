/// <reference path="../../lib/jquery.d.ts" />
/// <reference path="../../lib/jquerymobile.d.ts" />
import mElement = module("designer/Element");
import mElementPreferences = module("designer/ElementPreferences")
import mLinearLayoutPreferences = module("designer/LinearLayoutPreferences")

export class LinearLayout extends mElement.Element {
    private preferences: mLinearLayoutPreferences.LinearLayoutPreferences;
    get Preferences() {
        return this.preferences;
    }
    set Preferences(preferences: mLinearLayoutPreferences.LinearLayoutPreferences) {
        this.preferences = preferences;
    }
    private children: mElement.Element[] = [];
    get Children() {
        return this.children;
    }
    set Children(children: mElement.Element[]) {
        this.children = children;
    }
    public addChild(child: mElement.Element) {
        this.children.push(child);
        this.DomElement.append(child.DomElement);
    }
    public removeChild(child: mElement.Element) {
        var indexToDel = -1;
        for (var i = 0; i < this.children.length; i++) {
            if (this.children[i].Preferences.Id == child.Preferences.Id) {
                indexToDel = i;
                break;
            }
        }
        this.children.splice(indexToDel, 1);
    }
    constructor(preferences: mLinearLayoutPreferences.LinearLayoutPreferences);
    constructor(preferences: mLinearLayoutPreferences.LinearLayoutPreferences, domElement: JQuery);
    constructor(preferences: mLinearLayoutPreferences.LinearLayoutPreferences, domElement?: JQuery = $("<div></div>")) {
        super(domElement);
        this.Preferences = preferences;
        this.init();
    }
    public init() {
        this.children.map(function (child) { child.init(); });
        this.applyHeight();
        this.applyWidth();
    }
    public toXML() {
        var xmlString = "";
        xmlString += "<LinearLayout \n";
        xmlString += "xmlns=\"http://schemas.android.com/apk/res/android\" \n";
        if (this.preferences.Orientation == mLinearLayoutPreferences.LinearLayoutPreferences.Horizontal) {
            xmlString += "orientation=\"horizontal\" ";
        } else {
            xmlString += "orientation=\"vertical\" ";
        }
        if (this.preferences.Width == mElementPreferences.ElementPreferences.FillParent) {
            xmlString += "layout_width=\"fill_parent\" ";
        } else if (this.preferences.Width == mElementPreferences.ElementPreferences.WrapContent) {
            xmlString += "layout_width=\"wrap_content\" ";
        } else {
            xmlString += "layout_width=\"" + this.preferences.Width + "px\" ";
        }
        if (this.preferences.Height == mElementPreferences.ElementPreferences.FillParent) {
            xmlString += "layout_height=\"fill_parent\" ";
        } else if (this.preferences.Height == mElementPreferences.ElementPreferences.WrapContent) {
            xmlString += "layout_height=\"wrap_content\" ";
        } else {
            xmlString += "layout_height=\"" + this.preferences.Width + "px\" ";
        }
        xmlString += "background=\"" + this.preferences.Background + "\"> \n"
        for (var i = 0; i < this.children.length; i++) {
            xmlString += this.children[i].toXML();
        }
        xmlString += "</LinearLayout>\n"
        return xmlString;
    }
}