import { PrismaClient, Prisma } from 'prisma/prisma-client';
import { BidPayload, LotPayload } from './types';

export async function notify(
  lot: Partial<LotPayload>,
  winner: string | undefined,
): Promise<string> {
  // await axios.post('', lot); // like we sendind an email

  if (winner) {
    const client = new PrismaClient();

    try {
      const result = await client.offer.findUnique({
        where: {
          id: winner,
        },
        include: {
          company: true,
        },
      });

      if (result) {
        return `The winner is ${result.company.name} with price: ${parseInt(
          result.price as unknown as string,
          10,
        )}`;
      }
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        throw new Error(e.message);
      } else {
        throw new Error('Error while populating winner from DB');
      }
    } finally {
      client.$disconnect();
    }
  }

  return `Procerement process for lot ${lot.name} has been finished!`;
}

export const saveLotToDb = async (lot: LotPayload) => {
  const client = new PrismaClient();
  const { description, duration, name, lotId, companyId } = lot;
  try {
    const result = await client.lot.create({
      data: {
        description,
        duration,
        name,
        lotId,
        status: 'in progress',
        company: {
          connect: {
            id: companyId,
          },
        },
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

export const changeStatus = async (lotId: string, status: string) => {
  const client = new PrismaClient();
  try {
    const lot = await client.lot.findFirst({ where: { lotId } });

    await client.lot.update({
      where: { id: lot?.id },
      data: { status },
    });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      throw new Error(e.message);
    } else {
      throw new Error('Error while changing lot status in DB');
    }
  }
};

export const addBidd = async (payload: BidPayload) => {
  const { companyId, condition, description, lotId, price } = payload;
  const client = new PrismaClient();

  try {
    await client.offer.create({
      data: {
        condition,
        description,
        price: new Prisma.Decimal(price),
        lotNumber: lotId,
        companyId: companyId,
      },
    });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      throw new Error(e.message);
    } else {
      throw new Error('Error while adding offer for lot');
    }
  }
};
