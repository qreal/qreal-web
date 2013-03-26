import mLog = module("utils/log/Log");
import mTrigger = module("emulator/model/logic/Trigger");

export class EventManager {
    private logger = new mLog.Logger("EventManager");

    private triggers: mTrigger.Trigger[] = [];

    constructor() { }

    public addTrigger(trigger: mTrigger.Trigger) {
        this.triggers["trigger" + trigger.PageId + trigger.Event] = trigger;
    }

    public trigger(pageId: string, eventType: string): void {
        var trigger: mTrigger.Trigger = this.triggers["trigger" + pageId + eventType];
        if (trigger) {
            trigger.Trigger();
        }
    }

    public clear(): void {
        this.triggers = [];
    }

}
