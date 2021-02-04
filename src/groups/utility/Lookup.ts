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
  aliases: ['search'],
  groups: ['User'],
  name: 'lookup',
})
export class Lookup implements Executor {
  async callback(ctx: Message, args: string[], ref: Blueprint<BaseConfig>) {
    if (!args[0]) {
      return await dispatch_error_embed(ctx, 'Please provide an identifier.');
    }
    try {
      const api = ref.registry.data.get('api') as API;
      const {user} = await api.getUser(args[0] ?? ctx.mentions[0].id);
      return await ctx.channel.createMessage({
        embed: {
          title: `${user.username} - ${user.uid}`,
          url: `https://crato.gg/u/${user.uid}/`,
          fields: [
            {
              name: 'Username',
              value: user.username,
              inline: true,
            },
            {
              name: 'Last Login',
              value: new Date(user.lastLogin).toLocaleString(),
              inline: true,
            },
            {
              name: 'UID',
              value: user.uid,
              inline: true,
            },
            {
              name: 'Uploads',
              value: user.uploads,
              inline: true,
            },
            {
              name: 'Registration Date',
              value: new Date(user.registrationDate).toLocaleString(),
              inline: true,
            },
            {
              name: 'Invited By',
              value: user.invitedBy,
              inline: true,
            },
            {
              name: 'Premium',
              value: user.premium ?? 'false',
              inline: true,
            },
            {
              name: 'UUID',
              value: `||\`${user.uuid}\`||`,
              inline: true,
            },
          ],
          color: 0x03fc6b,
        },
      });
    } catch (e) {
      return await dispatch_error_embed(
        ctx,
        `An error occurred while looking up user:\n**${e.message}**.`
      );
    }
  }
}
