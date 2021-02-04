import {Blueprint} from '@dxz/blueprint';
import {join} from 'path';
import {parse as parser} from 'yaml';
import {commandList} from '../Plugins';
import {eventList} from '../events/EventList';
import {FullConfig, GroupType} from '../structures/Types';
import {apiExtension} from '../structures/Extensions';

export class Client extends Blueprint<FullConfig> {
  constructor() {
    super(join(__dirname, '../Config.yml'), {parser});
  }

  private setupCommands() {
    commandList.forEach(command => {
      this.registry.commands.register(command.commandClass);
    });
  }

  private setupGroups() {
    const groupArray: GroupType = [
      {groupName: 'Admin', groupPermissions: ['guild.administrator']},
      {groupName: 'User', groupPermissions: ['messages.send', 'messages.read']},
      {
        groupName: 'Mod',
        extends: ['User'],
        groupPermissions: ['messages.manage'],
      },
    ];
    groupArray.forEach(group => {
      this.registry.groups.register(group.groupName, {
        permissions: group.groupPermissions,
        inherits: group.extends || undefined,
      });
    });
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
