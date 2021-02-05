import {bindHooks, Blueprint} from '@dxz/blueprint';
import {join} from 'path';
import {parse as parser} from 'yaml';
import {commandList} from '../Plugins';
import {eventList} from '../events/EventList';
import {FullConfig} from '../structures/Types';
import {apiExtension} from '../structures/Extensions';

export class Client extends Blueprint<FullConfig> {
  constructor() {
    super(join(__dirname, '../Config.yml'), {parser});
  }

  private setupCommands() {
    for (const {commandClass} of commandList) {
      this.registry.commands.register(commandClass);
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
      if (this.core.config.mode === 'dev')
        bindHooks(
          [this.registry.commands, this.registry.events, this.registry.groups],
          callback => console.log(callback)
        );
      this.setupCommands();
      this.setupEvents();
      this.inject(apiExtension);
    } catch (e) {
      this.core.logger?.getLogger('Client').fatal(e.message);
    }
    await this.start();
  }
}
