import {GroupType} from '../structures/Types';
import {Ping} from './utility/Ping';

export const groupList: GroupType[] = [
  {
    groupName: 'User',
    groupPermissions: [
      'messages.read',
      'messages.read.history',
      'messages.send',
    ],
  },
  {
    groupName: 'Mod',
    extends: ['User'],
    groupPermissions: ['messages.manage'],
  },
  {
    groupName: 'Admin',
    groupPermissions: ['guild.administrator'],
  },
];

export const commandList = [
  {
    commandName: 'ping',
    commandClass: Ping,
  },
];
