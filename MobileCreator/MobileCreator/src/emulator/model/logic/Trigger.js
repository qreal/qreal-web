define(["require", "exports"], function(require, exports) {
    var Trigger = (function () {
        function Trigger(eventType, trigger) {
            this.eventType = eventType;
            this.trigger = trigger;
        }
        Trigger.OnShow = 'onShow';
        Object.defineProperty(Trigger.prototype, "Event", {
            get: function () {
                return this.eventType;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Trigger.prototype, "Trigger", {
            get: function () {
                return this.trigger;
            },
            enumerable: true,
            configurable: true
        });
        return Trigger;
    })();
    exports.Trigger = Trigger;    
})
