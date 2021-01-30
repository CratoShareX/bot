import {BaseConfig, Blueprint} from '@dxz/blueprint';

export async function ready(ref: Blueprint<BaseConfig>) {
  ref.core.logger?.getLogger('Client').info("Connected to Discord!");
  process.on("SIGINT", async () => await ref.destroy());
}
