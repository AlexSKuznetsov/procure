import { prisma } from '@/lib/prisma';
import { CompanySelect } from '@/components/CompanySelect';

export default async function Home() {
  const companies = await prisma.company.findMany();

  return (
    <main className='flex h-[calc(100vh-40px)] flex-col items-center justify-center'>
      <h1 className='text-5xl font-bold text-violet-500'>Procurement App</h1>
      <h2 className='mt-4 text-2xl font-bold text-white'>Choose your Company and Role</h2>

      <div className='mt-8'>
        <CompanySelect companies={companies} />
      </div>
    </main>
  );
}
