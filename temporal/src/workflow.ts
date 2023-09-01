import {
  proxyActivities,
  sleep,
  defineSignal,
  setHandler,
  Trigger,
  condition,
} from '@temporalio/workflow';
// Only import the activity types
import type * as activities from './activities';
import { BidPayload, LotPayload } from './types';

const { notify, changeStatus, saveLotToDb, addBidd } = proxyActivities<typeof activities>({
  startToCloseTimeout: '1 minute',
});

const userInteraction = new Trigger<boolean>();

export const winnerSignal = defineSignal<[bidId: string]>('winnerSignal');
export const cancelLotSignal = defineSignal('cancelSignal');

export const handleBid = defineSignal<[BidPayload]>('handleBid');

export async function startProcureProcess(lot: LotPayload): Promise<string> {
  const { lotId, duration } = lot;
  let winner: string | undefined;

  // save new lot to DB
  await saveLotToDb(lot);

  // handle cancel signal
  setHandler(cancelLotSignal, () => {
    userInteraction.resolve(true);
  });

  setHandler(winnerSignal, (bidId) => {
    winner = bidId;
  });

  // handle bids signals
  setHandler(handleBid, (payload: BidPayload) => {
    addBidd(payload);
  });

  // Event-based Race condition
  const userInteracted = await Promise.race([
    sleep(duration), // waiting lot duration
    userInteraction, // cancel lot signal
    condition(() => winner !== undefined), // winner picked
  ]);

  if (!userInteracted) {
    await changeStatus(lotId, 'finished');
    return await notify(lot, winner);
  } else {
    await changeStatus(lotId, 'terminated');
    return 'canceled';
  }
}
