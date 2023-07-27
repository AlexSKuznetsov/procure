'use client';

import axios from 'axios';
import { CreateLot } from '@/components/CreateModal';
import { LotList } from '@/components/LotList';
import { PageHeader } from '@/components/PageHeader';
import { CompanySelect } from '@/components/CompanySelect';
import { useEffect, useState } from 'react';
import { useCompanyStore } from '@/store/store';
import { Company, Lot } from 'prisma/prisma-client';

const Byuer = () => {
  const { companyId } = useCompanyStore();

  console.log(companyId);

  const [companies, setCompanies] = useState<Company[] | undefined>();
  const [lots, setLots] = useState<Lot[] | undefined>();

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(`http://localhost:3000/buyer/api?companyId=${companyId}`);
      setCompanies(data.companies);
      setLots(data.lots);
    };

    getData();
  }, [companyId]);

  return (
    <div className='mt-2 h-[calc(100vh-50px)]'>
      <div className='flex items-center justify-center gap-2 pt-2'>
        <PageHeader text='Buyer page' />
        {companies && <CompanySelect companies={companies} />}
      </div>

      <div className='mt-4 flex flex-col items-center space-y-2'>
        <div className='flex w-[420px] items-end justify-between '>
          <h2 className='text-sm text-white'>Lots list:</h2>
          {companyId && <CreateLot />}
        </div>
        {lots && lots.length > 0 && <LotList lots={lots} />}
      </div>
    </div>
  );
};

export default Byuer;
