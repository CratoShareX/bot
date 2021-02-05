import {GroupType} from './Types';

export const groupArray: GroupType = [
  {key: 'Admin', groupPermissions: ['guild.administrator']},
  {key: 'User', groupPermissions: ['messages.send', 'messages.read']},
  {
    key: 'Mod',
    inherits: ['User'],
    groupPermissions: ['messages.manage'],
  },
];
