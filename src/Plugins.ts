import {InformationPlugin} from './plugins/information/InformationPlugin';
import {ManagementPlugin} from './plugins/management/ManagementPlugin';
import {UtilityPlugin} from './plugins/utility/UtilityPlugin';

export const pluginList = [
  {
    pluginName: 'Information Plugin',
    pluginClass: InformationPlugin,
  },
  {
    pluginName: 'Management Plugin',
    pluginClass: ManagementPlugin,
  },
  {
    pluginName: 'Utility Plugin',
    pluginClass: UtilityPlugin,
  },
];
