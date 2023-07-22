'use server';

import { prisma } from '@/lib/prisma';
import { LotType } from '@/types/lot';
import { revalidatePath } from 'next/cache';

export const handleSubmit = async (formData: LotType) => {
  const { description, duration, name } = formData;
  try {
    const result = await prisma.lot.create({
      data: {
        description,
        duration,
        name,
        isFinished: false,
      },
    });

    revalidatePath('/buyer');
    return result.id;
  } catch (e) {
    return new Error('Failed to update database');
  }
};
