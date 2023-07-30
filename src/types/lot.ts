import { Prisma } from 'prisma/prisma-client';

// https://github.com/prisma/prisma/discussions/10928
export type LotType = Prisma.LotGetPayload<{
  include: {
    company: true;
    offers: true;
  };
}>;
