import {Stats} from './Stats';
import {Help} from './Help';
import {Plugin} from '@dxz/blueprint';
import {FullConfig} from '../../structures/Types';

export const InformationPlugin = new Plugin<FullConfig>({
  name: 'Information Plugin',
});

InformationPlugin.register(new Help());
InformationPlugin.register(new Stats());
