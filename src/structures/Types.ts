import {BaseConfig, PermissionString} from '@dxz/blueprint';

export interface GroupType {
  groupName: string;
  extends?: string[];
  groupPermissions: PermissionString[];
}

interface CratoConfig {
  crato: {
    baseURL: string;
    apiKey: string;
    boosterRole: string;
    boostChannel: string;
  }
}

export interface FullConfig extends CratoConfig, BaseConfig {}
