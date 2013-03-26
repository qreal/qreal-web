define(["require", "exports", "utils/log/Log"], function(require, exports, __mLog__) {
    var mLog = __mLog__;

    
    var EventManager = (function () {
        function EventManager() {
            this.logger = new mLog.Logger("EventManager");
            this.triggers = [];
        }
        EventManager.prototype.addTrigger = function (trigger) {
            this.triggers["trigger" + trigger.PageId + trigger.Event] = trigger;
        };
        EventManager.prototype.trigger = function (pageId, eventType) {
            var trigger = this.triggers["trigger" + pageId + eventType];
            if(trigger) {
                trigger.Trigger();
            }
        };
        EventManager.prototype.clear = function () {
            this.triggers = [];
        };
        return EventManager;
    })();
    exports.EventManager = EventManager;    
})
