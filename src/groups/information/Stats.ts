import {
  BaseConfig,
  Blueprint,
  Command,
  Executor,
  Message,
} from '@dxz/blueprint';
import {dispatch_error_embed} from '../../structures/EmbedTypes';
import {API} from '../../classes/API';

@Command({
  aliases: ['count'],
  groups: ['User'],
  name: 'stats',
})
export class Stats implements Executor {
  async callback(ctx: Message, args: string[], ref: Blueprint<BaseConfig>) {
    try {
      const api = ref.registry.data.get('api') as API;
      const {totalFiles, totalUsers} = await api.getStats();
      return await ctx.channel.createMessage({
        embed: {
          title: 'Crato Statistics',
          color: 0x03fc6b,
          fields: [
            {
              name: 'Files',
              value: `\`${totalFiles}\``,
              inline: true,
            },
            {
              name: 'Users',
              value: `\`${totalUsers}\``,
              inline: true,
            },
          ],
        },
      });
    } catch (e) {
      return await dispatch_error_embed(
        ctx,
        `An error occurred while blacklisting the user:\n**${e.message}**.`
      );
    }
  }
}
