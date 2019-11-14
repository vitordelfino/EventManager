import { EventsType } from './../../models/enums/Events';
import { EventPublisher } from "../../lib";

export class TestePubEvent extends EventPublisher<EventsType> {
    

    private static instance: TestePubEvent;

    private constructor() {
        super(
            TestePubEvent,
            [
                EventsType.EVENT_1,
                EventsType.EVENT_2,
                EventsType.EVENT_3
            ]
        )
    }

    public static getInstance() {
        if(!this.instance)
            this.instance = new TestePubEvent();
        return this.instance;
    }

    public sendEvent1(...params: any[]) {
        this.emit!(EventsType.EVENT_1, ...params);
    }

    public sendEvent2(...params: any[]) {
        this.emit!(EventsType.EVENT_2, ...params);
    }

    public sendEvent3(...params: any[]) {
        this.emit!(EventsType.EVENT_3, ...params);
    }
}

