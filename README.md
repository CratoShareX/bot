![Crato.gg](https://assets.crato.gg/logo.png)
## Crato.gg (Bot)

### Setup
⚠️ Please note that support is not provided for self hosting.
- First, edit the `Config.yml` file in the `src` folder and provide values for each of the required arguments. An example config is found below:
```yaml
bot:
  prefix: '<'
  token: ''
  options:
    compress: true
    intents:
      - guildMessages
      - directMessages
      - guilds

logging:
  appenders:
    default: {type: 'stdout'}
  categories:
    default: {appenders: ['default'], level: 'debug'}

crato:
  baseURL: ''
  apiKey: ''
  boosterRole: ''
  boostChannel: ''

mode: prod # Keep this at prod (usually)

developers:
  - '100690330336129024'
  - '438888690652020737'
```
- Then, run `pnpm i` to install all the dependencies *(Note: if you don't have pnpm, install it using `npm i -g pnpm`).*
- After finishing the installation, run `npm run build`, then **copy the `Config.yml` into the `dist` folder.**
- Finally, run `npm start` to run the bot, you should see this: `[2021-01-31T01:25:05.810] [INFO] Client - Connected to Discord!`

### License
This repo is licensed under the `GNU General Public License v3.0` license.
