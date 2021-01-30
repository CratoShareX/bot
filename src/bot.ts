import {Client} from './classes/Client';

const bot = new Client();

(async () => {
  await bot.init();
})();
