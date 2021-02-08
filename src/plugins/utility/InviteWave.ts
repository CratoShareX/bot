import {Blueprint, Command, Message} from '@dxz/blueprint';
import {
  dispatch_error_embed,
  dispatch_success_embed,
} from '../../structures/EmbedTypes';
import {API} from '../../classes/API';
import {FullConfig} from '../../structures/Types';

export class InviteWave extends Command<FullConfig> {
  constructor() {
    super('invite_wave', {
      aliases: ['invitewave'],
      groups: ['developer'],
    });
  }

  async callback(ctx: Message, args: string[], ref: Blueprint<FullConfig>) {
    try {
      const api = ref.registry.data.get('api') as API;
      await api.inviteWave();
      return await dispatch_success_embed(
        ctx,
        'Invite wave sent out successfully.'
      );
    } catch (e) {
      return await dispatch_error_embed(
        ctx,
        `An error occurred while generating an invite:\n**${e.message}**.`
      );
    }
  }
}
