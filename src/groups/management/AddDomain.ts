import {Blueprint, Command, Message} from '@dxz/blueprint';
import {
  dispatch_error_embed,
  dispatch_success_embed,
} from '../../structures/EmbedTypes';
import {API} from '../../classes/API';
import {FullConfig} from '../../structures/Types';

export class AddDomain extends Command<FullConfig> {
  constructor() {
    super('add_domain', {
      aliases: ['new_domain'],
      groups: ['developer'],
    });
  }

  async callback(ctx: Message, args: string[], ref: Blueprint<FullConfig>) {
    if (!args[0] || !args[1] || !args[2] || !args[3] || !args[4]) {
      return await dispatch_error_embed(ctx, 'Please provide all arguments.');
    }
    try {
      const api = ref.registry.data.get('api') as API;
      const domainInfo = {
        name: args[0],
        wildcard: JSON.parse(args[1]),
        donated: JSON.parse(args[2]),
        donatedBy: args[3],
        userOnly: JSON.parse(args[4]),
      };
      await api.addDomain(
        domainInfo.name,
        domainInfo.wildcard,
        domainInfo.donated,
        domainInfo.donatedBy,
        domainInfo.userOnly
      );
    } catch (e) {
      return await dispatch_error_embed(
        ctx,
        `An error occurred whilst adding the domain:\n**${e.message}**.`
      );
    }
    return await dispatch_success_embed(
      ctx,
      `Successfully added **${args[0]}** as a domain.`
    );
  }
}
