import {Blueprint, Command, Message} from '@dxz/blueprint';
import {dispatch_error_embed} from '../../structures/EmbedTypes';
import {API} from '../../classes/API';
import {FullConfig} from '../../structures/Types';

export class GenInvite extends Command<FullConfig> {
  constructor() {
    super('geninv', {
      aliases: ['generate_invite'],
      groups: ['Staff'],
    });
  }

  async callback(ctx: Message, args: string[], ref: Blueprint<FullConfig>) {
    try {
      const api = ref.registry.data.get('api') as API;
      const {link, code} = await api.generateInvite();
      return await ctx.channel.createMessage({
        embed: {
          title: 'New Invite',
          url: link,
          color: 0x03fc6b,
          description: `**ID:**\n||\`${code}\`||`,
        },
      });
    } catch (e) {
      return await dispatch_error_embed(
        ctx,
        `An error occurred while generating an invite:\n**${e.message}**.`
      );
    }
  }
}
