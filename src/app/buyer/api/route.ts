import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const companyId = searchParams.get('companyId');

  const lots = await prisma.lot.findMany({
    orderBy: { id: 'desc' },
    include: {
      company: true,
      offers: {
        include: {
          company: true,
        },
      },
    },
    where: {
      companyId: companyId || '',
    },
  });

  return NextResponse.json({ lots });
}
