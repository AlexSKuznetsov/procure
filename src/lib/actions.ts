'use server';

import { prisma } from '@/lib/prisma';
import { LotType } from '@/types/lot';
import { revalidatePath } from 'next/cache';
import { Client, Connection } from '@temporalio/client';
import { startProcureProcess } from '../../temporal/src/workflow';

export const handleSubmit = async (formData: LotType) => {
  const { description, duration, name } = formData;
  const connection = await Connection.connect({});
  const client = new Client({ connection });

  try {
    const result = await prisma.lot.create({
      data: {
        description,
        duration,
        name,
        isFinished: false,
      },
    });

    await client.workflow.start(startProcureProcess, {
      workflowId: 'Lot id' + ' ' + result.id,
      args: [{ name, description, duration, lotId: result.id }],
      taskQueue: 'start-procur',
    });

    revalidatePath('/buyer');
    return result.id;
  } catch (e) {
    return new Error('Failed to update database');
  }
};
