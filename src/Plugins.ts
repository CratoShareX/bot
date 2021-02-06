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
    commandClass: new Ping(),
  },
  {
    commandName: 'add_domain',
    commandClass: new AddDomain(),
  },
  {
    commandName: 'delete_domain',
    commandClass: new DeleteDomain(),
  },
  {
    commandName: 'lookup',
    commandClass: new Lookup(),
  },
  {
    commandName: 'geninv',
    commandClass: new GenInvite(),
  },
  {
    commandName: 'invite_wave',
    commandClass: new InviteWave(),
  },
  {
    commandName: 'blacklist',
    commandClass: new Blacklist(),
  },
  {
    commandName: 'help',
    commandClass: new Help(),
  },
  {
    commandName: 'stats',
    commandClass: new Stats(),
  },
  {
    commandName: 'premium',
    commandClass: new Premium(),
  },
  {
    commandName: 'group_info',
    commandClass: new Groups(),
  },
];
