import {GroupType} from './Types';

export const groupArray: GroupType = [
  {key: 'Admin', groupPermissions: ['guild.administrator']},
  {key: 'User', groupPermissions: ['messages.send', 'messages.read']},
  {
    key: 'Staff',
    inherits: ['User'],
    groupPermissions: ['members.ban'],
  },
];
