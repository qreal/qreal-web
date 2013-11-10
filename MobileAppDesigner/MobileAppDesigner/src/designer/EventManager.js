define(["require", "exports", "src/util/log/Log"], function(require, exports, __Log__) {
    var Log = __Log__;

    var EventManager = (function () {
        function EventManager() {
            var _this = this;
            this.log = new Log("EventManager");
            this.log.Debug("constructor");
            $('body').on(EventManager.EVENT_TEST, function (e) {
                return _this.OnEvent(e);
            });
        }
        EventManager.prototype.Trigger = function (eventName) {
            this.log.Debug('trigger, event: ' + eventName);
            $('body').trigger(eventName);
        };

        EventManager.prototype.OnEvent = function (event) {
            this.log.Debug('OnEvent: ' + event.type);
            //this.log.DebugObj(event);
        };
        EventManager.EVENT_TEST = "test_event";
        return EventManager;
    })();

    
    return EventManager;
});
//# sourceMappingURL=EventManager.js.map
