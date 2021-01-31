import {ready} from './Ready';
import {guildCreate} from "./GuildCreate";
import {guildMemberUpdate} from "./GuildMemberUpdate";

export const eventList = [
  {
    eventName: 'ready',
    eventClass: ready,
  },
  {
    eventName: 'guildCreate',
    eventClass: guildCreate
  },
  {
    eventName: 'guildMemberUpdate',
    eventClass: guildMemberUpdate
  }
];
