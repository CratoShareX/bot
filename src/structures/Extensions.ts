import {Extension} from '@dxz/blueprint';
import {FullConfig} from './Types';
import {API} from '../classes/API';
import {StatusAPI} from '../classes/StatusAPI';

export const apiExtension: Extension<FullConfig> = (core, registry, data) => {
  const api = new API(core);
  data.register('api', api);
};

export const statusApiExtenstion: Extension<FullConfig> = (
  core,
  registry,
  data
) => {
  const statusApi = new StatusAPI(core);
  data.register('status_api', statusApi);
};
