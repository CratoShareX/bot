import {Blueprint, Command, Message} from '@dxz/blueprint';
import {
  dispatch_error_embed,
  dispatch_success_embed,
} from '../../structures/EmbedTypes';
import {API} from '../../classes/API';
import {FullConfig} from '../../structures/Types';

export class Blacklist extends Command<FullConfig> {
  constructor() {
    super('blacklist', {
      aliases: ['disable_account'],
      groups: ['Admin'],
    });
  }

  async callback(ctx: Message, args: string[], ref: Blueprint<FullConfig>) {
    if (!args[0]) {
      return await dispatch_error_embed(ctx, 'No identifier provided.');
    }
    try {
      const api = ref.registry.data.get('api') as API;
      const reason = args.slice(1).join(' ') ?? 'No Reason Provided';
      await api.blacklist(args[0] ?? ctx.mentions[0].id, reason);
      return await dispatch_success_embed(
        ctx,
        'Blacklisted user successfully.'
      );
    } catch (e) {
      return await dispatch_error_embed(
        ctx,
        `An error occurred while blacklisting the user:\n**${e.message}**.`
      );
    }
  }
}
