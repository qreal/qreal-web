var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "designer/logic/Action", "designer/logic/CodeBlock"], function(require, exports, __mAction__, __mCodeBlock__) {
    var mAction = __mAction__;

    var mCodeBlock = __mCodeBlock__;

    var IfAction = (function (_super) {
        __extends(IfAction, _super);
        function IfAction(marginLeft) {
                _super.call(this);
            this.expression = "loginSuccess";
            this.thenBlock = new mCodeBlock.CodeBlock(marginLeft + 10);
            this.elseBlock = new mCodeBlock.CodeBlock(marginLeft + 10);
        }
        IfAction.prototype.show = function () {
        };
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
        Object.defineProperty(IfAction.prototype, "ThenBlock", {
            get: function () {
                return this.thenBlock;
            },
            set: function (thenBlock) {
                this.thenBlock = thenBlock;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(IfAction.prototype, "ElseBlock", {
            get: function () {
                return this.elseBlock;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(IfAction.prototype, "ElseAction", {
            set: function (elseBlock) {
                this.elseBlock = elseBlock;
            },
            enumerable: true,
            configurable: true
        });
        IfAction.prototype.toXML = function () {
            var xml = "<if condition='" + this.expression + "'>\n";
            xml += "<then>\n";
            xml += this.thenBlock.toXML();
            xml += "</then>\n";
            if(this.elseBlock.Actions.length > 0) {
                xml += "<else>\n";
                xml += this.elseBlock.toXML();
                xml += "</else>\n";
            }
            xml += "</if>\n";
            return xml;
        };
        return IfAction;
    })(mAction.Action);
    exports.IfAction = IfAction;    
})
//@ sourceMappingURL=IfAction.js.map
