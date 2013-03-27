define(["require", "exports"], function(require, exports) {
    
    var Action = (function () {
        function Action() { }
        Object.defineProperty(Action.prototype, "ActionType", {
            get: function () {
                return this.actionType;
            },
            set: function (actionType) {
                this.actionType = actionType;
            },
            enumerable: true,
            configurable: true
        });
        Action.prototype.toXML = function () {
            return "";
        };
        Action.prototype.show = function (domElement) {
        };
        return Action;
    })();
    exports.Action = Action;    
})
//@ sourceMappingURL=Action.js.map
