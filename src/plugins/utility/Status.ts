import {Blueprint, Command, Message} from '@dxz/blueprint';
import {StatusAPI, ComponentStrings} from '../../classes/StatusAPI';
import {
  dispatch_error_embed,
  dispatch_success_embed,
} from '../../structures/EmbedTypes';
import {FullConfig} from '../../structures/Types';

export class Status extends Command<FullConfig> {
  constructor() {
    super('status', {
      aliases: ['update_status'],
      groups: ['Admin'],
    });
  }

  async callback(ctx: Message, args: string[], ref: Blueprint<FullConfig>) {
    if (!args[0] || !args[1])
      return await dispatch_error_embed(ctx, 'No arguments provided.');
    const identifier = args[0] as ComponentStrings;
    const statusApi = ref.registry.data.get('status_api') as StatusAPI;
    if (identifier === 'Website' && args[1] === '1') {
      await statusApi.operational(ctx, 'Website', 'None');
      return await dispatch_success_embed(ctx, 'Set status to `Operational`.');
    } else {
      if (!args[2])
        return await dispatch_error_embed(
          ctx,
          'Description argument not provided.'
        );
      const fullArgs = args.slice(2).join(' ');
      try {
        if (identifier === 'Website') {
          if (args[1] === '2') {
            await statusApi.maintenence(ctx, 'Website', fullArgs);
            return await dispatch_success_embed(
              ctx,
              'Set status to `Maintenence`.'
            );
          } else if (args[1] === '3') {
            await statusApi.partialOutage(ctx, 'Website', fullArgs);
            return await dispatch_success_embed(
              ctx,
              'Set status to `Partial Outage`.'
            );
          } else if (args[1] === '4') {
            await statusApi.majorOutage(ctx, 'Website', fullArgs);
            return await dispatch_success_embed(
              ctx,
              'Set status to `Major Outage`.'
            );
          } else
            return await dispatch_error_embed(
              ctx,
              'Arguments must be `1, 2, 3 or 4`.'
            );
        }
        if (identifier === 'API') {
          // Start API
          if (args[1] === '1') {
            await statusApi.operational(ctx, 'API', fullArgs);
            return await dispatch_success_embed(
              ctx,
              'Set status to `Operational`.'
            );
          } else if (args[1] === '2') {
            await statusApi.maintenence(ctx, 'API', fullArgs);
            return await dispatch_success_embed(
              ctx,
              'Set status to `Maintenence`.'
            );
          } else if (args[1] === '3') {
            await statusApi.partialOutage(ctx, 'API', fullArgs);
            return await dispatch_success_embed(
              ctx,
              'Set status to `Partial Outage`.'
            );
          } else if (args[1] === '4') {
            await statusApi.majorOutage(ctx, 'API', fullArgs);
            return await dispatch_success_embed(
              ctx,
              'Set status to `Major Outage`.'
            );
          } else
            return await dispatch_error_embed(
              ctx,
              'Arguments must be `1, 2, 3 or 4`.'
            );
        } else if (identifier === 'CDN') {
          // Start CDN
          if (args[1] === '1') {
            await statusApi.operational(ctx, 'CDN', fullArgs);
            return await dispatch_success_embed(
              ctx,
              'Set status to `Operational`.'
            );
          } else if (args[1] === '2') {
            await statusApi.maintenence(ctx, 'CDN', fullArgs);
            return await dispatch_success_embed(
              ctx,
              'Set status to `Maintenence`.'
            );
          } else if (args[1] === '3') {
            await statusApi.partialOutage(ctx, 'CDN', fullArgs);
            return await dispatch_success_embed(
              ctx,
              'Set status to `Partial Outage`.'
            );
          } else if (args[1] === '4') {
            await statusApi.majorOutage(ctx, 'CDN', fullArgs);
            return await dispatch_success_embed(
              ctx,
              'Set status to `Major Outage`.'
            );
          } else
            return await dispatch_error_embed(
              ctx,
              'Arguments must be `1, 2, 3 or 4`.'
            );
        } else if (identifier === 'Discord Bot') {
          // Start Discord Bot
          if (args[1] === '1') {
            await statusApi.operational(ctx, 'Discord Bot', fullArgs);
            return await dispatch_success_embed(
              ctx,
              'Set status to `Operational`.'
            );
          } else if (args[1] === '2') {
            await statusApi.maintenence(ctx, 'Discord Bot', fullArgs);
            return await dispatch_success_embed(
              ctx,
              'Set status to `Maintenence`.'
            );
          } else if (args[1] === '3') {
            await statusApi.partialOutage(ctx, 'Discord Bot', fullArgs);
            return await dispatch_success_embed(
              ctx,
              'Set status to `Partial Outage`.'
            );
          } else if (args[1] === '4') {
            await statusApi.majorOutage(ctx, 'Discord Bot', fullArgs);
            return await dispatch_success_embed(
              ctx,
              'Set status to `Major Outage`.'
            );
          } else
            return await dispatch_error_embed(
              ctx,
              'Arguments must be `1, 2, 3 or 4`.'
            );
        } else if (identifier === 'Media Proxy') {
          // Start Media Proxy
          if (args[1] === '1') {
            await statusApi.operational(ctx, 'Media Proxy', fullArgs);
            return await dispatch_success_embed(
              ctx,
              'Set status to `Operational`.'
            );
          } else if (args[1] === '2') {
            await statusApi.maintenence(ctx, 'Media Proxy', fullArgs);
            return await dispatch_success_embed(
              ctx,
              'Set status to `Maintenence`.'
            );
          } else if (args[1] === '3') {
            await statusApi.partialOutage(ctx, 'Media Proxy', fullArgs);
            return await dispatch_success_embed(
              ctx,
              'Set status to `Partial Outage`.'
            );
          } else if (args[1] === '4') {
            await statusApi.majorOutage(ctx, 'Media Proxy', fullArgs);
            return await dispatch_success_embed(
              ctx,
              'Set status to `Major Outage`.'
            );
          } else
            return await dispatch_error_embed(
              ctx,
              'Arguments must be `1, 2, 3 or 4`.'
            );
        } else if (identifier === 'Cloudflare') {
          // Start CF
          if (args[1] === '1') {
            await statusApi.operational(ctx, 'Cloudflare', fullArgs);
            return await dispatch_success_embed(
              ctx,
              'Set status to `Operational`.'
            );
          } else if (args[1] === '2') {
            await statusApi.maintenence(ctx, 'Cloudflare', fullArgs);
            return await dispatch_success_embed(
              ctx,
              'Set status to `Maintenence`.'
            );
          } else if (args[1] === '3') {
            await statusApi.partialOutage(ctx, 'Cloudflare', fullArgs);
            return await dispatch_success_embed(
              ctx,
              'Set status to `Partial Outage`.'
            );
          } else if (args[1] === '4') {
            await statusApi.majorOutage(ctx, 'Cloudflare', fullArgs);
            return await dispatch_success_embed(
              ctx,
              'Set status to `Major Outage`.'
            );
          } else
            return await dispatch_error_embed(
              ctx,
              'Arguments must be `1, 2, 3 or 4`.'
            );
        } else {
          return await dispatch_error_embed(
            ctx,
            "Argument doesn't match proper status."
          );
        }
      } catch (e) {
        return await dispatch_error_embed(
          ctx,
          `An error occurred whilst setting the status:\n**${e.message}**.`
        );
      }
    }
  }
}
