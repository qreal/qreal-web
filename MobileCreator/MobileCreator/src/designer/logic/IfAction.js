var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "designer/logic/Action", "designer/logic/CodeBlock", "designer/logic/ActionTypes"], function(require, exports, __mAction__, __mCodeBlock__, __mActionTypes__) {
    var mAction = __mAction__;

    var mCodeBlock = __mCodeBlock__;

    var mActionTypes = __mActionTypes__;

    var IfAction = (function (_super) {
        __extends(IfAction, _super);
        function IfAction(marginLeft) {
                _super.call(this);
            this.marginLeft = marginLeft;
            this.ActionType = mActionTypes.ActionTypes.If;
            this.expression = "loginSuccess";
            this.thenBlock = new mCodeBlock.CodeBlock(marginLeft + 25);
            this.elseBlock = new mCodeBlock.CodeBlock(marginLeft + 25);
        }
        IfAction.prototype.showIf = function (domElement, removeButton) {
            var containDiv = $("<div data-role='controlgroup' data-type='horizontal' data-mini='true'></div>");
            containDiv.css("margin-left", this.marginLeft + "px");
            domElement.append(containDiv);
            var ifBlock = $("<a href='#' data-role='button' data-inline='true' data-mini='true'>If</a>");
            containDiv.append(ifBlock);
            ifBlock.button();
            var select = $("<select data-mini='true' data-inline='true'></select>");
            var loginSuccessOption = $("<option value='loginSuccess'>loginSucess</option>");
            select.append(loginSuccessOption);
            containDiv.append(select);
            select.selectmenu();
            containDiv.append(removeButton);
            removeButton.button();
            var thenDiv = $("<div data-role='controlgroup' data-type='horizontal' data-mini='true'></div>");
            thenDiv.css("margin-left", this.marginLeft + "px");
            domElement.append(thenDiv);
            var thenBlock = $("<a href='#' data-role='button' data-inline='true' data-mini='true'>then</a>");
            thenDiv.append(thenBlock);
            thenBlock.button();
            var thenBlockDiv = $("<div></div>");
            domElement.append(thenBlockDiv);
            this.thenBlock.show(thenBlockDiv);
            var elseDiv = $("<div data-role='controlgroup' data-type='horizontal' data-mini='true'></div>");
            elseDiv.css("margin-left", this.marginLeft + "px");
            domElement.append(elseDiv);
            var elseBlock = $("<a href='#' data-role='button' data-inline='true' data-mini='true'>else</a>");
            elseDiv.append(elseBlock);
            elseBlock.button();
            var elseBlockDiv = $("<div></div>");
            domElement.append(elseBlockDiv);
            this.elseBlock.show(elseBlockDiv);
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
