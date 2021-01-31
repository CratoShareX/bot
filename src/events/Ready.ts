import {Blueprint} from '@dxz/blueprint';
import {FullConfig} from "../structures/Types";
import {API} from "../classes/API";

export async function ready(ref: Blueprint<FullConfig>) {
  process.on("SIGINT", async () => await ref.destroy());
  const api = ref.registry.data.get("api") as API;
  // Set API Status on fire
  const {total} = await api.getFileCount();
  ref.core.client.editStatus("online", {
    name: `over ${new Intl.NumberFormat("en-US", {style: "decimal"}).format(total)} files`,
    type: 3
  });
  // Proceed to do it on an interval
  setInterval(async () => {
    const {total} = await api.getFileCount();
    ref.core.client.editStatus("online", {
      name: `over ${new Intl.NumberFormat("en-US", {style: "decimal"}).format(total)} files`,
      type: 3
    });
  }, 300000);

  ref.core.logger?.getLogger('Client').info("Connected to Discord!");
}
