import { EventManager } from './EventManager';
export abstract class EventSubscriber<T> {

    public on?: Map<T, (...args: any[]) => boolean>;

    protected eventManager: EventManager<T>;

    constructor() {
        if(this.constructor === EventSubscriber)
            throw new TypeError(`Can't construct abstract class, please extends.`)

        this.eventManager = EventManager.getInstance();
    }

    protected setup(
        subscriber: Function,
        events: Map<T, (...args: any[]) => boolean>
    ) {
        this.on = events;
        this.eventManager.register(this, subscriber, Array.from(events.keys()));
    }

}