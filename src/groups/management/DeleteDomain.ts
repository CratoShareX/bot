import {
  BaseConfig,
  Blueprint,
  Command,
  Executor,
  Message,
} from '@dxz/blueprint';
import {
  dispatch_error_embed,
  dispatch_success_embed,
} from '../../structures/EmbedTypes';
import {API} from '../../classes/API';

@Command({
  aliases: ['deletedomain', 'domain_delete'],
  groups: ['developer'],
  name: 'delete_domain',
})
export class DeleteDomain implements Executor {
  async callback(ctx: Message, args: string[], ref: Blueprint<BaseConfig>) {
    if (!args[0]) {
      return await dispatch_error_embed(ctx, 'Please provide a valid domain.');
    }
    try {
      const api = ref.registry.data.get('api') as API;
      await api.deleteDomain(args[0]);
    } catch (e) {
      return await dispatch_error_embed(
        ctx,
        `An error occurred whilst deleting the domain:\n**${e.message}**.`
      );
    }
    return await dispatch_success_embed(
      ctx,
      `Successfully deleted domain **${args[0]}**.`
    );
  }
}
