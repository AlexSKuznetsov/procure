import { proxyActivities, sleep } from '@temporalio/workflow';
// Only import the activity types
import type * as activities from './activities';
import { Duration } from '@temporalio/common/lib/time';

const { notify, changeStatus, saveLotToDb } = proxyActivities<
  typeof activities
>({
  startToCloseTimeout: '1 minute',
});

/** A workflow that simply calls an activity */
export async function startProcureProcess(lot: {
  name: string;
  description: string;
  duration: Duration;
  lotId: string;
}): Promise<string> {
  await saveLotToDb(lot);
  await sleep(lot.duration);
  await changeStatus(lot.lotId);
  return await notify(lot);
}
