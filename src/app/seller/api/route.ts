import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export const revalidate = 10;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const companyId = searchParams.get('companyId');

  const companies = await prisma.company.findMany();

  const lots = await prisma.lot.findMany({
    orderBy: { id: 'desc' },
    include: {
      company: true,
    },
    where: {
      AND: {
        status: 'in progress',
      },
      NOT: {
        companyId: companyId || '',
      },
    },
  });

  return NextResponse.json({ companies, lots });
}
