# EVENT MANAGER
Message handler core. Define a pattern for internal messages on application and manage who and how messages are published and listened.
The pattern is a publisher/subscriber implementation that use the EventEmitter javascript library.

# Model
The enumerator for supported events. Add new events on this enumerator.

```typescript
export enum EventsType {
    EVENT_1 = 'EVENT_1',
    EVENT_2 = 'EVENT_2',
    EVENT_3 = 'EVENT_3',
}
```

# EventPublisher
The base abstract class for publishers. To implement a publisher you need to register published events on his initialization, calling the constructor of super class with supported events. Like this sample:

```typescript
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
```

# EventSubscriber
The bas abstract class for subscribers. The subscriber implementation need to setup the listen events, calling a protected setup function, preferably on the constructor, with the listened events and respective function callbacks. Like this sample:

```typescript
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
```