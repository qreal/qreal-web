export class Trigger {
    public static OnShow = 'onShow';
    public static OnTimer = 'onTimer';
    public static OnLoginResponse = 'onLoginResponse';
    public static OnPatientsResponse = 'onPatientsResponse';

    private eventType: string;
    private pageId: string;
    private trigger: Function;

    constructor(pageId:string, eventType: string, trigger: Function) {
        this.pageId = pageId;
        this.eventType = eventType;
        this.trigger = trigger;
    }

    get PageId(): string {
        return this.pageId;
    }

    get Event(): string {
        return this.eventType;
    }

    get Trigger(): Function {
        return this.trigger;
    }
}