import {BaseConfig, Override, PermissionString} from '@dxz/blueprint';

export type GroupType = Array<{
  key: string;
  inherits?: string[];
  overrides?: Override[];
  groupPermissions: PermissionString[];
}>;

interface CratoConfig {
  mode: 'prod' | 'dev';
  crato: {
    baseURL: string;
    apiKey: string;
    boosterRole: string;
    boostChannel: string;
  };
}

export interface FullConfig extends CratoConfig, BaseConfig {}
