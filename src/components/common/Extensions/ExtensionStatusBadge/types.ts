import { MessageDescriptor } from 'react-intl';
import { SimpleMessageValues } from '~types';

export type ExtensionStatusBadgeMode =
  | 'coming-soon'
  | 'not-installed'
  | 'enabled'
  | 'disabled'
  | 'deprecated'
  | 'governance'
  | 'new'
  | 'staking'
  | 'finalizable'
  | 'claimed'
  | 'payments';

export interface ExtensionStatusBadgeProps {
  mode?: ExtensionStatusBadgeMode;
  text?: MessageDescriptor | string;
  textValues?: SimpleMessageValues;
}
