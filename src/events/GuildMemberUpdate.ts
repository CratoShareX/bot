import {Blueprint, Member} from '@dxz/blueprint';
import {FullConfig} from '../structures/Types';
import {TextChannel} from 'eris';
import {API} from '../classes/API';

export async function guildMemberUpdate(
  ref: Blueprint<FullConfig>,
  member: Member
) {
  if (!member.roles.find(role => role === ref.core.config.crato.boosterRole)) {
    return;
  } else {
    try {
      const user = await member.user.getDMChannel();
      const api = ref.registry.data.get('api') as API;
      const {code} = await api.generateInvite();
      return await user.createMessage({
        embed: {
          title: 'Thanks for boosting!',
          description: `Hey! Thanks for boosting Crato. As a reward, please take this invite: **${code}**`,
          color: 0x03fc6b,
        },
      });
    } catch (e) {
      const channel = ref.core.client.getChannel(
        ref.core.config.crato.boostChannel
      ) as TextChannel;
      return await channel.createMessage(
        `Hey, <@!${member.id}>! Please DM one of the admins for your invite, as your DM's were closed. Thank you!`
      );
    }
  }
}
