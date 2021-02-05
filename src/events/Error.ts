import {Blueprint} from '@dxz/blueprint';
import {FullConfig} from '../structures/Types';

export async function error(
  ref: Blueprint<FullConfig>,
  err: Error,
  id: number
) {
  return ref.core.logger?.getLogger(`Shard ${id}`).error(err);
}
