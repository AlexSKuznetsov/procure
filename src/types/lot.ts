import { Lot } from 'prisma/prisma-client';

export type LotType = Pick<Lot, 'description' | 'duration' | 'name'>;
