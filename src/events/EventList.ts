import {ready} from './Ready';
import {guildCreate} from './GuildCreate';
import {guildMemberUpdate} from './GuildMemberUpdate';
import {error} from './Error';

export const eventList = [
  {
    eventName: 'ready',
    eventClass: ready,
  },
  {
    eventName: 'guildCreate',
    eventClass: guildCreate,
  },
  {
    eventName: 'guildMemberUpdate',
    eventClass: guildMemberUpdate,
  },
  {
    eventName: 'error',
    eventClass: error,
  },
];
