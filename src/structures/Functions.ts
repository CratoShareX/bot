import {Internals} from '@dxz/blueprint';
import {FullConfig} from './Types';
import req from '@helperdiscord/centra';

export async function getGuild(ref: Internals<FullConfig>, guildId: string) {
  if (!ref.client.guilds.get(guildId)) return;
  else return ref.client.guilds.get(guildId);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function bin(data: any, ext = 'js') {
  const res = await req('https://hst.sh/documents', 'POST')
    .body(data)
    .timeout(15000)
    .send();

  if (res.statusCode === 200) {
    return `https://hst.sh/${res.json().key}.${ext}`;
  }

  return `Something went wrong while uploading data to hst.sh (status: ${res.statusCode})`;
}
