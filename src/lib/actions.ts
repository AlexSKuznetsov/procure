'use server';

import { LotType } from '@/types/lot';
import { Client, Connection } from '@temporalio/client';
import {
  startProcureProcess,
  cancelLotSignal,
  handleBid,
  winnerSignal,
} from '../../temporal/src/workflow';
import { BidPayload } from '../../temporal/src/types';
import { v4 as uuidv4 } from 'uuid';

export const handleSubmit = async (formData: LotType, companyId: string) => {
  const { description, duration, name } = formData;

  const connection = await Connection.connect({});
  const client = new Client({ connection });
  const lotId = uuidv4();

  try {
    await client.workflow.start(startProcureProcess, {
      workflowId: lotId,
      args: [{ name, description, duration, lotId, companyId }],
      taskQueue: 'start-procur',
    });
  } catch (e) {
    return new Error('Failed to start procure workflow');
  }
};

export const handleCancel = async (lotId: string) => {
  const connection = await Connection.connect({});
  const client = new Client({ connection });
  const handle = client.workflow.getHandle(lotId);

  try {
    await handle.signal(cancelLotSignal);
  } catch (e) {
    console.log('Faild to send a cancel signal', e);
  }
};

export const handleAddBid = async (lotId: string, payload: BidPayload) => {
  const connection = await Connection.connect({});
  const client = new Client({ connection });
  const handle = client.workflow.getHandle(lotId);

  try {
    await handle.signal(handleBid, payload);
  } catch (e) {
    console.log('Failed to handle bid signal', e);
  }
};

export const handleBidPick = async (lotId: string, bidId: string) => {
  const connection = await Connection.connect({});
  const client = new Client({ connection });

  const handle = client.workflow.getHandle(lotId);
  try {
    await handle.signal(winnerSignal, bidId);
  } catch (e) {
    console.log('Failed to pick a Bid', e);
  }
};
