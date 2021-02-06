import {Blueprint, Command, Message} from '@dxz/blueprint';
import {stripIndents} from 'common-tags';
import {FullConfig} from '../../structures/Types';

export class Ping extends Command<FullConfig> {
  constructor() {
    super('ping', {
      aliases: [],
      groups: ['User'],
    });
  }

  async callback(ctx: Message, args: string[], ref: Blueprint<FullConfig>) {
    const msg = await ctx.channel.createMessage('Pinging...');
    await msg.delete();
    return await ctx.channel.createMessage({
      embed: {
        title: 'Ping Information',
        color: 0x32a852,
        description: stripIndents`
          > Shard Latency: \`${
            ref.core.client.guilds.get(<string>ctx.guildID)?.shard.latency
          }ms\`
          > Message Latency: \`${msg.timestamp - ctx.timestamp}ms\`
        `,
      },
    });
  }
}
