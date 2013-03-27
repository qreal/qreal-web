define(["require", "exports", "utils/log/Log"], function(require, exports, __mLog__) {
    var mLog = __mLog__;

    
    var EventManager = (function () {
        function EventManager() {
            this.logger = new mLog.Logger("EventManager");
            this.triggers = [];
        }
        EventManager.OnShow = 'onShow';
        EventManager.OnTimer = 'onTimer';
        EventManager.OnLoginResponse = 'onLoginResponse';
        EventManager.OnPatientsResponse = 'onPatientsResponse';
        EventManager.OnAction = 'onAction';
        EventManager.prototype.addTrigger = function (trigger) {
            this.logger.log("addTrigger: " + trigger.PageId + " " + trigger.Event);
            this.logger.log('' + trigger.Trigger);
            this.triggers["trigger" + trigger.PageId + trigger.Event] = trigger;
        };
        EventManager.prototype.trigger = function (pageId, eventType) {
            this.logger.log("trigger, triggers size=" + this.triggers.length);
            var trigger = this.triggers["trigger" + pageId + eventType];
            if(trigger) {
                console.log(trigger.Trigger);
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
//@ sourceMappingURL=EventManager.js.map
