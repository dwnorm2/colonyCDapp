import { Token, ColonyWallet } from '~types';

import { UserHubTabs } from '../../types';

export interface ReputationTabProps {
  onTabChange: (newTab: UserHubTabs) => void;
}

export interface BalanceProps extends Pick<ReputationTabProps, 'onTabChange'> {
  nativeToken: Token;
  wallet: ColonyWallet;
}

export interface ViewStakedButtonProps {
  isFullSize?: boolean;
  onClick: () => void;
}

export interface TotalReputationProps {
  colonyAddress: string;
  wallet: ColonyWallet;
}

export interface PendingReputationProps {
  nativeToken: Token;
  colonyAddress: string;
  wallet: ColonyWallet;
}
