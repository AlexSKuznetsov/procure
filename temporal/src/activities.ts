import { Duration } from '@temporalio/common/lib/time';
import { PrismaClient, Prisma } from 'prisma/prisma-client';

export async function notify(lot: {
  name: string;
  description: string;
  duration: Duration;
}): Promise<string> {
  // await axios.post('', lot); // like we sendind an email
  //
  return `Procerement process for lot ${lot.name} has been finished!`;
}

export const saveLotToDb = async (lot: {
  name: string;
  description: string;
  duration: Duration;
  lotId: string;
}) => {
  const client = new PrismaClient();
  const { description, duration, name, lotId } = lot;
  try {
    const result = await client.lot.create({
      data: {
        description,
        duration,
        name,
        lotId,
      },
    });

    return result.id;
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      throw new Error(e.message);
    } else {
      throw new Error('Error while saving lot into DB');
    }
  }
};

export const changeStatus = async (lotId: string) => {
  const client = new PrismaClient();
  try {
    const lot = await client.lot.findFirst({ where: { lotId } });

    await client.lot.update({
      where: { id: lot?.id },
      data: { isFinished: true },
    });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      throw new Error(e.message);
    } else {
      throw new Error('Error while changing lot status in DB');
    }
  }
};
