import {Extension} from '@dxz/blueprint';
import {FullConfig} from './Types';
import {API} from '../classes/API';

export const apiExtension: Extension<FullConfig> = (core, registry, data) => {
  const api = new API(core);
  data.register('api', api);
};
