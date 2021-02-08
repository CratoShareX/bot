/* eslint-disable block-scoped-var */
import {Blueprint, Command, Message} from '@dxz/blueprint';
import {getPluginList} from '../../structures/GetPluginList';
import {MessageEmbed} from 'helperis';
import {stripIndents} from 'common-tags';
import {dispatch_error_embed} from '../../structures/EmbedTypes';
import {FullConfig} from '../../structures/Types';

export class Help extends Command<FullConfig> {
  constructor() {
    super('help', {
      aliases: [],
      groups: ['User'],
    });
  }

  async callback(ctx: Message, args: string[], ref: Blueprint<FullConfig>) {
    if (args[0]) {
      try {
        const plugins = await getPluginList(ref);
        for (const {pluginCommands} of plugins) {
          // eslint-disable-next-line no-var
          var cmdList = [];
          for (const command of pluginCommands) {
            cmdList.push({
              commandName: command.value.meta.name,
              commandGroups: command.value.meta.groups,
              commandAliases: command.value.meta.aliases,
            });
          }
        }
        if (cmdList?.find(c => c.commandName === args[0])) {
          const command = cmdList?.find(c => c.commandName === args[0]);
          const embed = new MessageEmbed()
            .setTitle(`Help for ${command?.commandName}`)
            .setColor('0x03fc6b')
            .addField(
              'Aliases',
              `${
                command?.commandAliases.join(', ')
                  ? command?.commandAliases.join(', ')
                  : 'None'
              }`,
              true
            )
            .addField(
              'Groups',
              `${
                command?.commandGroups.join(', ')
                  ? command?.commandGroups.join(', ')
                  : 'Everyone'
              }`,
              true
            );
          await ctx.channel.createMessage({embed: embed.code});
          return;
        } else {
          return await dispatch_error_embed(
            ctx,
            "Couldn't find a command matching that name."
          );
        }
      } catch (e) {
        return await dispatch_error_embed(
          ctx,
          `An error occurred whilst getting command:\n**${e.message}**.`
        );
      }
    } else {
      try {
        const plugins = await getPluginList(ref);
        const embed = new MessageEmbed();
        embed.setColor('0x03fc6b');
        embed.setTitle('Help Menu');
        for (const {pluginName, pluginCommands} of plugins) {
          const cmdList = [];
          for (const command of pluginCommands) {
            cmdList.push({
              commandName: command.value.meta.name,
              commandGroups: command.value.meta.groups,
              commandAliases: command.value.meta.aliases,
            });
          }
          const pendingCmdArr: string[] = [];
          cmdList.forEach(command => {
            pendingCmdArr.push(
              `Name: **${command.commandName}**\nAliases: **${
                command.commandAliases.join(', ')
                  ? command.commandAliases.join(', ')
                  : 'None'
              }**\nGroup(s): **${
                command.commandGroups.join(', ')
                  ? command.commandGroups.join(', ')
                  : 'Everyone'
              }**`
            );
          });
          embed.addField(
            pluginName,
            stripIndents`
                            Command List:\n\n${pendingCmdArr.join('\n\n')}
                        `,
            true
          );
        }
        return await ctx.channel.createMessage({
          embed: embed.code,
        });
      } catch (e) {
        return await dispatch_error_embed(
          ctx,
          `An error occurred whilst getting help list:\n**${e.message}**.`
        );
      }
    }
  }
}
