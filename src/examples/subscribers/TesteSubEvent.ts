import { EventsType } from './../../models/enums/Events';
import { EventSubscriber } from "../../lib";

export class TesteSubEvent extends EventSubscriber<EventsType> {


    constructor() {
        super();
        this.setup(
            TesteSubEvent,
            new Map<EventsType, (...args: any[]) => any>([
                [EventsType.EVENT_1, this.onEvent1],
                [EventsType.EVENT_2, this.onEvent2],
                [EventsType.EVENT_3, this.onEvent3],
            ])
        )
    }

    private onEvent1 = (...args: any[]) => console.log(`EVENT_1 called, args: `, ...args);
    private onEvent2 = (...args: any[]) => console.log(`EVENT_2 called, args: `, ...args);
    private onEvent3 = (arg1: any, arg2: any, arg3: any) => console.log(`EVENT_3 called, args: `, arg1, arg2, arg3);

}