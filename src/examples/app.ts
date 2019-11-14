import { TesteSubEvent } from './subscribers/TesteSubEvent';
import { TestePubEvent } from './publishers/TestePubEvent';

const publisher = TestePubEvent.getInstance();
const subscriber = new TesteSubEvent();

publisher.sendEvent1('param_event_1');
publisher.sendEvent2('param1_event_2', 'param2_event_2');
publisher.sendEvent3('param1_event_3', 'param2_event_3', 'param3_event_3');

