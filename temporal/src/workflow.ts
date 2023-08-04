import { proxyActivities, sleep, defineSignal, setHandler, Trigger } from '@temporalio/workflow';
// Only import the activity types
import type * as activities from './activities';
import { Duration } from '@temporalio/common/lib/time';

const { notify, changeStatus, saveLotToDb, addBidd } = proxyActivities<typeof activities>({
  startToCloseTimeout: '1 minute',
});

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

const userInteraction = new Trigger<boolean>();
export const cancelLotSignal = defineSignal('cancelSignal');

export const handleBid = defineSignal<[BidPayload]>('handleBid');

export async function startProcureProcess(lot: LotPayload): Promise<string> {
  const { lotId } = lot;

  // save new lot to DB
  await saveLotToDb(lot);

  // handle cancel signal
  setHandler(cancelLotSignal, () => {
    userInteraction.resolve(true);
  });

  // handle bids signals
  setHandler(handleBid, (payload: BidPayload) => {
    addBidd(payload);
  });

  const userInteracted = await Promise.race([sleep(lot.duration), userInteraction]);

  if (!userInteracted) {
    await changeStatus(lotId, 'finished');
    return await notify(lot);
  } else {
    await changeStatus(lotId, 'terminated');
    return 'canceled';
  }
}
