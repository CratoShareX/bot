import {
  BaseConfig,
  Blueprint,
  Command,
  Executor,
  Message,
} from '@dxz/blueprint';
import {stripIndents} from 'common-tags';

@Command({
  aliases: [],
  groups: ['User'],
  name: 'ping',
})
export class Ping implements Executor {
  async callback(ctx: Message, args: string[], ref: Blueprint<BaseConfig>) {
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
