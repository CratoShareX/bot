import {AddDomain} from './AddDomain';
import {DeleteDomain} from './DeleteDomain';
import {Premium} from './Premium';
import {Eval} from './Eval';
import {Plugin} from '@dxz/blueprint';
import {FullConfig} from '../../structures/Types';

export const ManagementPlugin = new Plugin<FullConfig>({
  name: 'Management Plugin',
});

ManagementPlugin.register(new Premium());
ManagementPlugin.register(new DeleteDomain());
ManagementPlugin.register(new AddDomain());
ManagementPlugin.register(new Eval());
