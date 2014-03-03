import Log = require("src/util/log/Log");
import IEventListener = require("src/util/events/IEventListener");

class EventManager {

    private log = new Log("EventManager");

    // Events types    
    public static EventPropertiesChanged = 'property_changed';
    public static EventAddPage = 'add_page';
    private static events = [EventManager.EventPropertiesChanged, EventManager.EventAddPage];

    private element: JQuery;
    private subscribers: Array<IEventListener>[] = [];

    constructor(element: JQuery) {
        this.log.Debug("constructor");
        this.element = element;
        EventManager.events.map((eventType) => {
            this.element.on(eventType, (e, data) => this.OnEvent(e, data));
        });
    }

    public Trigger(eventName: string, data: any): void {
        this.log.Debug('trigger, event: ' + eventName);
        this.element.trigger(eventName, data);
    }

    private OnEvent(event, data): void {
        this.log.Debug('OnEvent: ' + event.type);

        if (this.subscribers[event.type]) {
            this.subscribers[event.type].forEach(listener => listener.OnEvent(data));
        }
    }

    public AddSubscriber(eventType: string, listener: IEventListener): void {
        if (!this.subscribers[eventType]) {
            this.subscribers[eventType] = [];
        }
        this.subscribers[eventType].push(listener);
    }
}

export = EventManager;