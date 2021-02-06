import {Blueprint} from '@dxz/blueprint';
import {commandList} from '../Plugins';
import {FullConfig} from './Types';

export async function getCommandList(ref: Blueprint<FullConfig>) {
  const commandArray = [];
  for (const {commandName} of commandList) {
    const command = await ref.registry.commands.item(commandName);
    commandArray.push({
      cmdName: command?.meta.name,
      cmdAliases: command?.meta.aliases,
      cmdGroups: command?.meta.groups,
    });
  }
  return commandArray;
}
