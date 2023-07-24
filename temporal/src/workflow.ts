import {
  proxyActivities,
  sleep,
  defineSignal,
  setHandler,
  condition,
  Trigger,
} from '@temporalio/workflow';
// Only import the activity types
import type * as activities from './activities';
import { Duration } from '@temporalio/common/lib/time';

const { notify, changeStatus, saveLotToDb } = proxyActivities<typeof activities>({
  startToCloseTimeout: '1 minute',
});

const userInteraction = new Trigger<boolean>();
export const cancelLotSignal = defineSignal('cancelSignal');

/** A workflow that simply calls an activity */
export async function startProcureProcess(lot: {
  name: string;
  description: string;
  duration: Duration;
  lotId: string;
}): Promise<string> {
  const { lotId } = lot;

  // save new lot to DB
  await saveLotToDb(lot);

  setHandler(cancelLotSignal, () => {
    userInteraction.resolve(true);
  });

  const userInteracted = await Promise.race([sleep(lot.duration), userInteraction]);

  if (!userInteracted) {
    await changeStatus(lotId, 'finished');
    return await notify(lot);
  } else {
    await changeStatus(lotId, 'terminated');
    return 'terminated';
  }
}
