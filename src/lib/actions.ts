'use server';

import { LotType } from '@/types/lot';
import { revalidatePath, revalidateTag } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { Client, Connection } from '@temporalio/client';
import { startProcureProcess } from '../../temporal/src/workflow';
import { v4 as uuidv4 } from 'uuid';

export const handleSubmit = async (formData: LotType) => {
  const { description, duration, name } = formData;
  const connection = await Connection.connect({});
  const client = new Client({ connection });
  const lotId = uuidv4();

  try {
    const result = await client.workflow.start(startProcureProcess, {
      workflowId: 'Lot id' + ' ' + uuidv4(),
      args: [{ name, description, duration, lotId }],
      taskQueue: 'start-procur',
    });

    // setTimeout(() => revalidatePath('/buyer'), 2000);
    return result.workflowId;
  } catch (e) {
    return new Error('Failed to start procure workflow');
  }
};

export async function revalidate(path: string) {
  revalidatePath(path);
}
