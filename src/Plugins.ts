import {Ping} from './groups/utility/Ping';
import {AddDomain} from './groups/management/AddDomain';
import {DeleteDomain} from './groups/management/DeleteDomain';
import {Lookup} from './groups/utility/Lookup';
import {GenInvite} from './groups/utility/GenInvite';
import {InviteWave} from './groups/utility/InviteWave';
import {Blacklist} from './groups/utility/Blacklist';
import {Help} from './groups/information/Help';
import {Stats} from './groups/information/Stats';
import {Premium} from './groups/management/Premium';
import {Groups} from './groups/utility/Groups';

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
    commandClass: Blacklist,
  },
  {
    commandName: 'help',
    commandClass: Help,
  },
  {
    commandName: 'stats',
    commandClass: Stats,
  },
  {
    commandName: 'premium',
    commandClass: Premium,
  },
  {
    commandName: 'group_info',
    commandClass: Groups,
  },
];
