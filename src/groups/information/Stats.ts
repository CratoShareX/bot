import {Blueprint, Command, Message} from '@dxz/blueprint';
import {dispatch_error_embed} from '../../structures/EmbedTypes';
import {API} from '../../classes/API';
import {FullConfig} from '../../structures/Types';

export class Stats extends Command<FullConfig> {
  constructor() {
    super('stats', {
      aliases: ['statistics'],
      groups: ['User'],
    });
  }

  async callback(ctx: Message, args: string[], ref: Blueprint<FullConfig>) {
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
