import { Duration } from '@temporalio/common/lib/time';
import { PrismaClient, Prisma } from 'prisma/prisma-client';
import axios from 'axios';

export async function notify(lot: {
  name: string;
  description: string;
  duration: Duration;
}): Promise<string> {
  // await axios.post('', lot); // like we sendind an email

  return `Procerement process for lot ${lot.name} has been finished!`;
}

export const changeStatus = async (lotId: number) => {
  const client = new PrismaClient();

  try {
    await client.lot.update({
      where: { id: lotId },
      data: { isFinished: true },
    });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      throw new Error(e.message);
    }
  }
};
