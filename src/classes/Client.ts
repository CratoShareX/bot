import {Hook, Blueprint} from '@dxz/blueprint';
import {join} from 'path';
import {parse as parser} from 'yaml';
import {pluginList} from '../Plugins';
import {eventList} from '../events/EventList';
import {FullConfig} from '../structures/Types';
import {apiExtension, statusApiExtenstion} from '../structures/Extensions';

export class Client extends Blueprint<FullConfig> {
  constructor() {
    super(join(__dirname, '../Config.yml'), {parser});
  }

  private setupPlugins() {
    for (const {pluginClass} of pluginList) {
      this.registry.plugins.register(pluginClass);
    }
  }

  private setupEvents() {
    for (const event of eventList) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      this.registry.events.register(event.eventName, event.eventClass);
    }
  }

  async init() {
    try {
      if (this.core.config.mode === 'dev') {
        const hook = new Hook(res => console.log(res));
        hook.bind(
          this.registry.events,
          this.registry.groups,
          this.registry.plugins
        );
      }
      this.setupPlugins();
      this.setupEvents();
      this.inject(apiExtension);
      this.inject(statusApiExtenstion);
    } catch (e) {
      this.core.logger?.getLogger('Client').fatal(e.message);
    }
    await this.start();
  }
}
