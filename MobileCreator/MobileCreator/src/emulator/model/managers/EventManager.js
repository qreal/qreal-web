var mLog = require("./utils/log/Log")

var EventManager = (function () {
    function EventManager() {
        this.triggers = [];
    }
    EventManager.OnShow = 'onShow';
    EventManager.OnTimer = 'onTimer';
    EventManager.OnLoginResponse = 'onLoginResponse';
    EventManager.OnPatientsResponse = 'onPatientsResponse';
    EventManager.OnAction = 'onAction';
    EventManager.logger = new mLog.Logger("EventManager");
    EventManager.prototype.addTrigger = function (trigger) {
        EventManager.logger.log("addTrigger: " + trigger.PageId + " " + trigger.Event);
        EventManager.logger.log('' + trigger.Trigger);
        this.triggers["trigger" + trigger.PageId + trigger.Event] = trigger;
    };
    EventManager.prototype.trigger = function (pageId, eventType, data) {
        EventManager.logger.log("trigger. pageId=" + pageId + " eventType=" + eventType);
        var trigger = this.triggers["trigger" + pageId + eventType];
        if(trigger && trigger.Trigger) {
            console.log(trigger.Trigger);
            trigger.Trigger(data);
        }
    };
    EventManager.prototype.clear = function () {
        this.triggers = [];
    };
    return EventManager;
})();
exports.EventManager = EventManager;
//@ sourceMappingURL=EventManager.js.map
