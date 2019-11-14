import { EventManager } from './EventManager';
import { IEventRegister } from './../models/interfaces/IEventRegister';
export abstract class EventPublisher<T> implements IEventRegister {

    protected eventManager: EventManager<T>;

    protected emit?: (event: T, ...args: any[]) => boolean;

    constructor(publisher: Function, events: T[]) {
        this.eventManager = EventManager.getInstance();
        this.eventManager.register(this, publisher, events);
    }

    public setEmitter(
        emitter: (event: T, ...args: any[]) => boolean
    ) {
        this.emit = emitter;
    }
}