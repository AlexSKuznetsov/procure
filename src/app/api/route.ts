import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export const revalidate = 10;

export async function GET(request: Request) {
  const companies = await prisma.company.findMany();

  return NextResponse.json({ companies });
}
