import { prisma } from '@/lib/prisma';
import { PageHeader } from '@/components/PageHeader';
import { CompanySelect } from '@/components/CompanySelect';

const Seller = async () => {
  const companies = await prisma.company.findMany();

  return (
    <div className='mt-2 h-[calc(100vh-50px)]'>
      <div className='flex items-center justify-center gap-2 pt-2'>
        <PageHeader text='Buyer page' />
        <CompanySelect companies={companies} />
      </div>
    </div>
  );
};

export default Seller;
