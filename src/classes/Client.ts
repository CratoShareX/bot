import {Blueprint} from '@dxz/blueprint';
import {join} from 'path';
import {parse as parser} from 'yaml';
import {commandList, groupList} from '../groups/GroupList';
import {eventList} from '../events/EventList';
import {FullConfig} from "../structures/Types";
import {API} from "./API";

export class Client extends Blueprint<FullConfig> {
  api: API;
  constructor() {
    super(join(__dirname, '../Config.yml'), {parser});
    this.api = new API(this);
  }

  private setupCommands() {
    for (const command of commandList) {
      this.registry.commands.register(command.commandClass);
    }
  }

  private setupGroups() {
    for (const group of groupList) {
      this.registry.groups.register(group.groupName, {
        inherits: group.extends ?? undefined,
        permissions: group.groupPermissions,
      });
    }
  }

  private setupEvents() {
    for (const event of eventList) {
      // @ts-ignore
      this.registry.events.register(event.eventName, event.eventClass);
    }
  }

  async init() {
    try {
      this.setupCommands();
      this.setupGroups();
      this.setupEvents();
    } catch (e) {
      this.core.logger?.getLogger('Client').fatal(e.message);
    }
    await this.start();
  }
}
