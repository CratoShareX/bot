import {Blueprint, Override} from '@dxz/blueprint';
import {join} from 'path';
import {parse as parser} from 'yaml';
import {commandList, groups} from '../groups/Plugins';
import {eventList} from '../events/EventList';
import {FullConfig} from "../structures/Types";
import {apiExtension} from "../structures/Extensions";

export class Client extends Blueprint<FullConfig> {
  constructor() {
    super(join(__dirname, '../Config.yml'), {parser});
  }

  private setupCommands() {
    for (const command of commandList) {
      this.registry.commands.register(command.commandClass);
    }
  }

  private setupGroups() {
    // Register the developer group, always.
    const overrides: Override[] = [];
    for (const developer of this.core.config.developers) overrides.push({type: "user", id: developer});
    this.registry.groups.register("Owners", {
      overrides,
      permissions: ["guild.administrator"]
    });
    // Then proceed to add the rest of the groups.
    for (const group of groups) {
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
      this.inject(apiExtension);
    } catch (e) {
      this.core.logger?.getLogger('Client').fatal(e.message);
    }
    await this.start();
  }
}
