import {Blueprint} from '@dxz/blueprint';
import {FullConfig} from './Types';

export async function getPluginList(ref: Blueprint<FullConfig>) {
  const pluginArray = [];
  const plugins = ref.registry.plugins.all();
  for (const plugin of plugins) {
    pluginArray.push({
      pluginName: plugin.value.meta.name,
      pluginCommands: plugin.value.all(),
      pluginGroups: plugin.value.meta.groups,
    });
  }
  return pluginArray;
}
