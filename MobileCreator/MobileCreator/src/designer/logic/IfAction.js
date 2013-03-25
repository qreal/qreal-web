var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "designer/logic/Action"], function(require, exports, __mAction__) {
    var mAction = __mAction__;

    var IfAction = (function (_super) {
        __extends(IfAction, _super);
        function IfAction(expression, thenAction, elseAction) {
                _super.call(this);
            this.expression = expression;
            this.thenAction = thenAction;
            this.elseAction = elseAction;
        }
        Object.defineProperty(IfAction.prototype, "Expression", {
            get: function () {
                return this.expression;
            },
            set: function (expression) {
                this.expression = expression;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(IfAction.prototype, "ThenAction", {
            get: function () {
                return this.thenAction;
            },
            set: function (thenAction) {
                this.thenAction = thenAction;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(IfAction.prototype, "ElseAction", {
            get: function () {
                return this.elseAction;
            },
            set: function (elseAction) {
                this.elseAction = elseAction;
            },
            enumerable: true,
            configurable: true
        });
        IfAction.prototype.toXML = function () {
            var xml = "<if condition='" + this.expression + "'>\n";
            xml += "<then>\n";
            xml += this.thenAction.toXML();
            xml += "</then>\n";
            if(this.elseAction) {
                xml += "<else>\n";
                xml += this.elseAction.toXML();
                xml += "</else>\n";
            }
            xml += "</if>\n";
            return xml;
        };
        return IfAction;
    })(mAction.Action);
    exports.IfAction = IfAction;    
})
