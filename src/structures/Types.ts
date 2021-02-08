import {BaseConfig, Override, PermissionString} from '@dxz/blueprint';

export type GroupType = Array<{
  key: string;
  inherits?: string[];
  overrides?: Override[];
  groupPermissions: PermissionString[];
}>;

interface ICratoConfig {
  mode: 'prod' | 'dev';
  crato: {
    baseURL: string;
    apiKey: string;
    boosterRole: string;
    boostChannel: string;
    statusChannel: string;
  };
  status: {
    baseURL: string;
    apiKey: string;
  };
}

export interface FullConfig extends ICratoConfig, BaseConfig {}

export interface IPartialUser {
  user: {
    uuid: number;
    uid: number;
    username: string;
    invite: string;
    premium: boolean;
    uploads: number;
    invites: number;
    invitedBy: string;
    invitedUsers: string[];
    registrationDate: Date;
    lastLogin: Date;
    admin: boolean;
  };
}
