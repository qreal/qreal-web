define(["require", "exports"], function(require, exports) {
    var Trigger = (function () {
        function Trigger(pageId, eventType, trigger) {
            this.pageId = pageId;
            this.eventType = eventType;
            this.trigger = trigger;
        }
        Trigger.OnShow = 'onShow';
        Trigger.OnTimer = 'onTimer';
        Trigger.OnLoginResponse = 'onLoginResponse';
        Trigger.OnPatientsResponse = 'onPatientsResponse';
        Object.defineProperty(Trigger.prototype, "PageId", {
            get: function () {
                return this.pageId;
            },
            enumerable: true,
            configurable: true
        });
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
