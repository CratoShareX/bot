import {Plugin} from '@dxz/blueprint';
import {FullConfig} from '../../structures/Types';
import {Blacklist} from './Blacklist';
import {GenInvite} from './GenInvite';
import {Groups} from './Groups';
import {Lookup} from './Lookup';
import {Ping} from './Ping';
import {Status} from './Status';

export const UtilityPlugin = new Plugin<FullConfig>({
  name: 'Utility Plugin',
});

UtilityPlugin.register(new Ping());
UtilityPlugin.register(new Lookup());
UtilityPlugin.register(new Groups());
UtilityPlugin.register(new GenInvite());
UtilityPlugin.register(new Blacklist());
UtilityPlugin.register(new Status());
