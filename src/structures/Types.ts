import {BaseConfig, PermissionString} from '@dxz/blueprint';

export interface GroupType {
  groupName: string;
  extends?: string[];
  groupPermissions: PermissionString[];
}

interface CratoConfig {
  crato: {
    baseUrl: string;
    apiKey: string;
  }
}

export interface FullConfig extends CratoConfig, BaseConfig {}
