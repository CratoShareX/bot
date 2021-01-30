import {ready} from './Ready';
import {messageCreate} from "./Message";

export const eventList = [
  {
    eventName: 'ready',
    eventClass: ready,
  },
  {
    eventName: "messageCreate",
    eventClass: messageCreate
  }
];
