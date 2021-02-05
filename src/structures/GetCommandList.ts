import {BaseConfig, Blueprint} from '@dxz/blueprint';
import {commandList} from '../Plugins';

export async function getCommandList(ref: Blueprint<BaseConfig>) {
  const commandArray = [];
  for (const {commandName} of commandList) {
    const command = await ref.registry.commands.meta(commandName);
    commandArray.push({
      cmdName: command.name,
      cmdAliases: command.aliases,
      cmdGroups: command.groups,
    });
  }
  return commandArray;
}
