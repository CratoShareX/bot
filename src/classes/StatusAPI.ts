import {Internals, Message} from '@dxz/blueprint';
import req from '@helperdiscord/centra';
import {Guild, NewsChannel} from 'eris';
import {getGuild} from '../structures/Functions';
import {FullConfig} from '../structures/Types';
import {Req} from './API';

export enum ComponentList {
  Website = 10,
  API = 11,
  'Discord Bot' = 12,
  CDN = 13,
  Cloudflare = 14,
  'Media Proxy' = 15,
}

export type ComponentStrings = keyof typeof ComponentList;

export class StatusAPI {
  private internals: Internals<FullConfig>;
  constructor(internals: Internals<FullConfig>) {
    this.internals = internals;
  }

  private async request(data: Req) {
    try {
      const baseURL = this.internals.config.status.baseURL;
      const apiKey = this.internals.config.status.apiKey;

      const res = await req(`${baseURL}${data.endpoint}`)
        .header('X-Cachet-Token', apiKey)
        .header('Content-Type', 'application/json')
        .method(data.method)
        .body(data.body)
        .send();

      return res.json();
    } catch (e) {
      throw new Error(e.message);
    }
  }

  createAnnouncementMessage(
    guild: Guild,
    reason: string,
    status: string,
    id: ComponentStrings
  ) {
    let color: number;
    if (status === 'Partial Outage') color = 0xf77c09;
    else if (status === 'Major Outage') color = 0xf71d09;
    else if (status === 'Maintenence') color = 0xfcf005;
    else if (status === 'Operational') color = 0x6cfc05;
    else color = 0xffffff;

    if (status === 'Operational') {
      (guild?.channels.get(
        this.internals.config.crato.statusChannel
      ) as NewsChannel).editMessage('808449721973735505', {
        embed: {
          title: 'Crato Status',
          color: 0x6cfc05,
          fields: [
            {
              name: 'Zone Affected',
              value: 'None',
            },
            {
              name: 'Incident Description',
              value: 'None',
            },
          ],
        },
      });
    } else {
      (guild?.channels.get(
        this.internals.config.crato.statusChannel
      ) as NewsChannel).editMessage('808449721973735505', {
        embed: {
          title: `Crato Status - ${status}`,
          color: color,
          fields: [
            {
              name: 'Zone Affected',
              value: id,
            },
            {
              name: 'Incident Description',
              value: reason,
            },
          ],
        },
      });
    }
  }

  async partialOutage(ctx: Message, id: ComponentStrings, reason: string) {
    await this.request({
      endpoint: `/components/${ComponentList[id]}`,
      method: 'PUT',
      body: {
        status: 3,
      },
    });
    const guild = await getGuild(this.internals, <string>ctx.guildID);
    return this.createAnnouncementMessage(guild!, reason, 'Partial Outage', id);
  }

  async majorOutage(ctx: Message, id: ComponentStrings, reason: string) {
    await this.request({
      endpoint: `/components/${ComponentList[id]}`,
      method: 'PUT',
      body: {
        status: 4,
      },
    });
    const guild = await getGuild(this.internals, <string>ctx.guildID);
    return this.createAnnouncementMessage(guild!, reason, 'Major Outage', id);
  }

  async maintenence(ctx: Message, id: ComponentStrings, reason: string) {
    await this.request({
      endpoint: `/components/${ComponentList[id]}`,
      method: 'PUT',
      body: {
        status: 2,
      },
    });
    const guild = await getGuild(this.internals, <string>ctx.guildID);
    return this.createAnnouncementMessage(guild!, reason, 'Maintenence', id);
  }

  async operational(ctx: Message, id: ComponentStrings, reason: string) {
    await this.request({
      endpoint: `/components/${ComponentList[id]}`,
      method: 'PUT',
      body: {
        status: 1,
      },
    });
    const guild = await getGuild(this.internals, <string>ctx.guildID);
    return this.createAnnouncementMessage(guild!, reason, 'Operational', id);
  }
}
