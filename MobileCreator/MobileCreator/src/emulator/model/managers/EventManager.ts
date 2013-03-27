import mLog = module("utils/log/Log");
import mTrigger = module("emulator/model/logic/Trigger");

export class EventManager {

    public static OnShow = 'onShow';
    public static OnTimer = 'onTimer';
    public static OnLoginResponse = 'onLoginResponse';
    public static OnPatientsResponse = 'onPatientsResponse';
    public static OnAction = 'onAction';

    private logger = new mLog.Logger("EventManager");

    private triggers: mTrigger.Trigger[] = [];

    constructor() { }

    public addTrigger(trigger: mTrigger.Trigger) {
        this.logger.log("addTrigger: " + trigger.PageId + " " + trigger.Event);
        this.logger.log(''+trigger.Trigger);
        this.triggers["trigger" + trigger.PageId + trigger.Event] = trigger;
    }

    public trigger(pageId: string, eventType: string): void {
        this.logger.log("trigger, triggers size="+this.triggers.length);
        var trigger: mTrigger.Trigger = this.triggers["trigger" + pageId + eventType];
        if (trigger) {
            console.log(trigger.Trigger);
            trigger.Trigger();
        }
    }

    public clear(): void {
        this.triggers = [];
    }
}
