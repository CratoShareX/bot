import {
  BaseConfig,
  Blueprint,
  Command,
  Executor,
  Message,
} from '@dxz/blueprint';
import {MessageEmbed} from 'helperis';
import {dispatch_error_embed} from '../../structures/EmbedTypes';

@Command({
  aliases: ['groupinfo'],
  groups: ['User'],
  name: 'group_info',
})
export class Groups implements Executor {
  async callback(ctx: Message, args: string[], ref: Blueprint<BaseConfig>) {
    if (!args[0]) {
      return await dispatch_error_embed(ctx, 'No group specified.');
    }
    try {
      const group = ref.registry.groups.item(args[0])!;
      if (!group)
        return await dispatch_error_embed(ctx, 'No group by this name exists.');
      const embed = new MessageEmbed()
        .setTitle(`Group Info - ${args[0]}`)
        .addField('Permissions', `\`${group.permissions.join('\n')}\``, false)
        .addField(
          'Inherits',
          `\`${
            group.inherits?.join('\n')
              ? group.inherits?.join('\n')
              : 'No Groups Inheritied'
          }\``,
          false
        )
        .setColor('0x03fc6b');
      return await ctx.channel.createMessage({embed: embed.code});
    } catch (e) {
      return await dispatch_error_embed(
        ctx,
        `An error occurred whilst getting group info:\n**${e.message}**.`
      );
    }
  }
}
