export interface ExpenditureFormValues {
  payouts: ExpenditurePayoutFieldValue[];
  createInDomainId: number;
  fundFromDomainId: number;
}

export interface ExpenditurePayoutFieldValue {
  slotId?: number;
  recipientAddress: string;
  tokenAddress: string;
  amount: string;
  claimDelay: number;
}
