export class Trigger {
    public static OnShow = 'onShow';

    private eventType: string;
    private trigger: Function;

    constructor(eventType: string, trigger: Function) {
        this.eventType = eventType;
        this.trigger = trigger;
    }

    get Event(): string {
        return this.eventType;
    }

    get Trigger(): Function {
        return this.trigger;
    }
}