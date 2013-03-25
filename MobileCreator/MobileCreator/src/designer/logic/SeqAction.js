var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "designer/logic/Action"], function(require, exports, __mAction__) {
    var mAction = __mAction__;

    var SeqAction = (function (_super) {
        __extends(SeqAction, _super);
        function SeqAction(firstAction, secondAction) {
                _super.call(this);
            this.firstAction = firstAction;
            this.secondAction = secondAction;
        }
        Object.defineProperty(SeqAction.prototype, "FirstAction", {
            get: function () {
                return this.firstAction;
            },
            set: function (firstAction) {
                this.firstAction = firstAction;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SeqAction.prototype, "SecondAction", {
            get: function () {
                return this.secondAction;
            },
            set: function (secondAction) {
                this.secondAction = secondAction;
            },
            enumerable: true,
            configurable: true
        });
        SeqAction.prototype.toXML = function () {
            var xml = "<seq>\n";
            if(this.secondAction) {
                xml += "<first-operator>\n";
                xml += this.firstAction.toXML();
                xml += "</first-operator>\n";
            }
            if(this.secondAction) {
                xml += "<second-operator>\n";
                xml += this.secondAction.toXML();
                xml += "</second-operator>\n";
            }
            xml += "</seq>\n";
            return xml;
        };
        return SeqAction;
    })(mAction.Action);
    exports.SeqAction = SeqAction;    
})
