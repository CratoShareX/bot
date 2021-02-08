import {Blueprint, Command, Message} from '@dxz/blueprint';
import {MessageEmbed} from 'helperis';
import {FullConfig} from '../../structures/Types';
import util from 'util';
import {dispatch_error_embed} from '../../structures/EmbedTypes';
import {bin} from '../../structures/Functions';

export class Eval extends Command<FullConfig> {
  constructor() {
    super('eval', {
      aliases: ['exec'],
      groups: ['developer'],
    });
  }

  async callback(ctx: Message, args: string[], ref: Blueprint<FullConfig>) {
    const privates = [ref.core.config.bot.token, ref.core.config.crato.apiKey];

    if (!args[0])
      return await dispatch_error_embed(ctx, 'No arguments provided.');

    const code = args.slice(0).join(' ');

    const symbolRegex = /(\.|\\|\?)/g;

    const evalRegex = new RegExp(
      `(${privates.reduce(
        (a, p = '') =>
          `${a}${a ? '|' : ''}${p.replace(
            symbolRegex,
            (match, capture) => '\\' + capture
          )}`,
        ''
      )})`,
      'g'
    );

    let result;
    const startTime = Date.now();

    try {
      result = await eval(code);
    } catch (err) {
      result = err;
    }
    const stopTime = Date.now();

    let output: string;

    if (result instanceof Error || result instanceof Promise)
      output = String(result);
    else output = util.inspect(result);

    if (output.length > 1024) {
      const link = await bin(output.replace(evalRegex, 'REDACTED'));
      const embed = new MessageEmbed()
        .setTitle(`Time Taken: **${stopTime - startTime}** milliseconds`)
        .setDescription(`Output: **${link}**`)
        .setColor(result instanceof Error ? '0xff0000' : '0xff00');
      return ctx.channel.createMessage({embed: embed.code});
    }

    const embed = new MessageEmbed()
      .setAuthor('Evaluation', ctx.author.avatarURL)
      .setTitle(`Time taken: **${stopTime - startTime}** milliseconds`)
      .setColor(result instanceof Error ? '0xff0000' : '0xff00')
      .addField('Input', `\`\`\`js\n${code}\`\`\``)
      .addField(
        result instanceof Error ? 'Error' : 'Output',
        `\`\`\`js\n${output.replace(evalRegex, 'REDACTED')}\`\`\``
      )
      .setFooter(
        'Type: ' +
          (result instanceof Array
            ? 'array'
            : result instanceof Error
            ? 'error'
            : typeof result)
      );

    return ctx.channel.createMessage({embed: embed.code});
  }
}
