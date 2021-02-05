import {Client} from './classes/Client';
import {groupArray} from './structures/Groups';

const bot = new Client();

for (const group of groupArray) {
  bot.registry.groups.register(group.key, {
    overrides: group.overrides || undefined,
    inherits: group.inherits || undefined,
    permissions: group.groupPermissions,
  });
}

(async () => {
  await bot.init();
})();
