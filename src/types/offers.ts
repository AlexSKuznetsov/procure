import { Prisma } from 'prisma/prisma-client';

// https://github.com/prisma/prisma/discussions/10928
export type OffersType = Prisma.OfferGetPayload<{
  include: {
    company: true;
  };
}>;
