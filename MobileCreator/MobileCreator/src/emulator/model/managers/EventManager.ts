import mLog = module("utils/log/Log");
import mTrigger = module("emulator/model/logic/Trigger");

export class EventManager {

    public static OnShow = 'onShow';
    public static OnTimer = 'onTimer';
    public static OnLoginResponse = 'onLoginResponse';
    public static OnPatientsResponse = 'onPatientsResponse';
    public static OnAction = 'onAction';

    private static logger = new mLog.Logger("EventManager");

    private triggers: mTrigger.Trigger[] = [];

    constructor() { }

    public addTrigger(trigger: mTrigger.Trigger) {
        EventManager.logger.log("addTrigger: " + trigger.PageId + " " + trigger.Event);
        EventManager.logger.log(''+trigger.Trigger);
        this.triggers["trigger" + trigger.PageId + trigger.Event] = trigger;
    }


    public trigger(pageId: string, eventType: string, data?): void {
        EventManager.logger.log("trigger. pageId="+pageId+" eventType="+eventType);
        var trigger: mTrigger.Trigger = this.triggers["trigger" + pageId + eventType];
        if (trigger && trigger.Trigger) {
            console.log(trigger.Trigger);
            trigger.Trigger(data);
        }
    }

    public clear(): void {
        this.triggers = [];
    }
}
