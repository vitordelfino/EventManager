import { IEventRegister } from './../models/interfaces/IEventRegister';
import { EventsType } from './../models/enums/Events';
import { EventEmitter } from "events";
import { EventPublisher } from './EventPublisher';
import { EventSubscriber } from './EventSubscriber';

export class EventManager<T> {


    private static instance: EventManager<any>;
    private static readonly eventEmitter: EventEmitter = new EventEmitter();

    private publishers = {};

    private subscribers = {};

    private constructor() {

    }

    public static getInstance() {
        if(!this.instance) {
            this.instance = new EventManager();
        }
        return this.instance;
    }

    public register(type: IEventRegister, who: Function, events: T[]) {
        
        events.forEach(event => {

            if(EventPublisher.prototype.isPrototypeOf(type)) {
                this.publishers = this.registerEvent(
                    this.publishers,
                    who.name,
                    event
                )
            } else if (EventSubscriber.prototype.isPrototypeOf(type)) {
                this.subscribers = this.registerEvent(
                    this.subscribers,
                    who.name,
                    event
                );
                // TODO - tratar erro de implementação (undefined)
                const method = (type as EventSubscriber<T>).on!.get(event);
                EventManager.eventEmitter.addListener(event as any, method!);
            }

        });
        
        if (EventPublisher.prototype.isPrototypeOf(type)) {
            (type as EventPublisher<T>).setEmitter(this.emit);
        }

    }

    public getPublishers(): any {
        return this.publishers;
    }

    public getSubscribers(): any {
        return this.subscribers;
    }

    protected emit(event: T, ...args: any[]): boolean {
        return EventManager.eventEmitter.emit(event as any, ...args);
    }

    private registerEvent(list: any, who: string, event: T): any {
        if (!list[event]) {
            list[event] = [who];
        } else {
            list[event].push(who);
        }
        return list;
    }

}