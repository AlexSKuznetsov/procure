import { Duration } from '@temporalio/common/lib/time';

export type BidPayload = {
  sellerId: string;
  price: number;
  description: string;
  condition: string;
  lotId: number;
  companyId: string;
};

export type LotPayload = {
  name: string;
  description: string;
  duration: Duration;
  lotId: string;
  companyId: string;
};
