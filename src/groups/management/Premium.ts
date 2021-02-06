import {Blueprint, Command, Message} from '@dxz/blueprint';
import {
  dispatch_error_embed,
  dispatch_success_embed,
} from '../../structures/EmbedTypes';
import {API} from '../../classes/API';
import {FullConfig} from '../../structures/Types';

export class Premium extends Command<FullConfig> {
  constructor() {
    super('premium', {
      aliases: [],
      groups: ['developer'],
    });
  }

  async callback(ctx: Message, args: string[], ref: Blueprint<FullConfig>) {
    if (!args[0]) {
      return await dispatch_error_embed(
        ctx,
        'No argument provided for member.'
      );
    }
    if (!isNaN(parseInt(args[0]))) {
      return await dispatch_error_embed(ctx, 'UID is not a number.');
    }
    try {
      const uid = parseInt(args[0]);
      const api = ref.registry.data.get('api') as API;
      await api.premium(uid);
      return await dispatch_success_embed(ctx, `Added **${uid}** as premium.`);
    } catch (e) {
      return await dispatch_error_embed(
        ctx,
        `An error occurred while trying to premium a user:\n**${e.message}**.`
      );
    }
  }
}
