var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "designer/widgets/Element", "designer/preferences/ElementPreferences", "designer/preferences/LinearLayoutPreferences"], function(require, exports, __mElement__, __mElementPreferences__, __mLinearLayoutPreferences__) {
    var mElement = __mElement__;

    var mElementPreferences = __mElementPreferences__;

    var mLinearLayoutPreferences = __mLinearLayoutPreferences__;

    var LinearLayout = (function (_super) {
        __extends(LinearLayout, _super);
        function LinearLayout(preferences, domElement) {
            if (typeof domElement === "undefined") { domElement = $("<div></div>"); }
                _super.call(this, domElement);
            this.children = [];
            this.Preferences = preferences;
            this.init();
        }
        Object.defineProperty(LinearLayout.prototype, "Preferences", {
            get: function () {
                return this.preferences;
            },
            set: function (preferences) {
                this.preferences = preferences;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LinearLayout.prototype, "Children", {
            get: function () {
                return this.children;
            },
            set: function (children) {
                this.children = children;
            },
            enumerable: true,
            configurable: true
        });
        LinearLayout.prototype.addChild = function (child) {
            this.children.push(child);
            this.DomElement.append(child.DomElement);
        };
        LinearLayout.prototype.removeChild = function (child) {
            var indexToDel = -1;
            for(var i = 0; i < this.children.length; i++) {
                if(this.children[i].Preferences.Id == child.Preferences.Id) {
                    indexToDel = i;
                    break;
                }
            }
            this.children.splice(indexToDel, 1);
        };
        LinearLayout.prototype.init = function () {
            this.children.map(function (child) {
                child.init();
            });
            this.applyHeight();
            this.applyWidth();
        };
        LinearLayout.prototype.toXML = function () {
            var xmlString = "";
            xmlString += "<LinearLayout \n";
            xmlString += "xmlns=\"http://schemas.android.com/apk/res/android\" \n";
            if(this.preferences.Orientation == mLinearLayoutPreferences.LinearLayoutPreferences.Horizontal) {
                xmlString += "orientation=\"horizontal\" ";
            } else {
                xmlString += "orientation=\"vertical\" ";
            }
            if(this.preferences.Width == mElementPreferences.ElementPreferences.FillParent) {
                xmlString += "layout_width=\"fill_parent\" ";
            } else if(this.preferences.Width == mElementPreferences.ElementPreferences.WrapContent) {
                xmlString += "layout_width=\"wrap_content\" ";
            } else {
                xmlString += "layout_width=\"" + this.preferences.Width + "px\" ";
            }
            if(this.preferences.Height == mElementPreferences.ElementPreferences.FillParent) {
                xmlString += "layout_height=\"fill_parent\" ";
            } else if(this.preferences.Height == mElementPreferences.ElementPreferences.WrapContent) {
                xmlString += "layout_height=\"wrap_content\" ";
            } else {
                xmlString += "layout_height=\"" + this.preferences.Width + "px\" ";
            }
            xmlString += "background=\"" + this.preferences.Background + "\"> \n";
            for(var i = 0; i < this.children.length; i++) {
                xmlString += this.children[i].toXML();
            }
            xmlString += "</LinearLayout>\n";
            return xmlString;
        };
        return LinearLayout;
    })(mElement.Element);
    exports.LinearLayout = LinearLayout;    
})
