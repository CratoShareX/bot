import {GroupType} from '../structures/Types';
import {Ping} from './utility/Ping';
import {AddDomain} from "./management/AddDomain";
import {DeleteDomain} from "./management/DeleteDomain";
import {Lookup} from "./utility/Lookup";
import {GenInvite} from "./utility/GenInvite";
import {InviteWave} from "./utility/InviteWave";
import {Blacklist} from "./utility/Blacklist";
import {Help} from "./information/Help";
import {Stats} from "./information/Stats";
import {Premium} from "./management/Premium";

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
  {
    commandName: 'add_domain',
    commandClass: AddDomain,
  },
  {
    commandName: 'delete_domain',
    commandClass: DeleteDomain,
  },
  {
    commandName: 'lookup',
    commandClass: Lookup,
  },
  {
    commandName: 'geninv',
    commandClass: GenInvite,
  },
  {
    commandName: 'invite_wave',
    commandClass: InviteWave,
  },
  {
    commandName: 'blacklist',
    commandClass: Blacklist
  },
  {
    commandName: 'help',
    commandClass: Help
  },
  {
    commandName: 'stats',
    commandClass: Stats
  },
  {
    commandName: 'premium',
    commandClass: Premium
  }
];
