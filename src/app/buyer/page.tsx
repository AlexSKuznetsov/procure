'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { CreateLot } from '@/components/CreateModal';
import { LotList } from '@/components/LotList';
import { PageHeader } from '@/components/PageHeader';
import { CompanySelect } from '@/components/CompanySelect';
import { useCompanyStore } from '@/store/store';
import { Company } from 'prisma/prisma-client';
import { LotType } from '@/types/lot';

const Byuer = () => {
  const { companyId } = useCompanyStore();

  const [companies, setCompanies] = useState<Company[] | undefined>();
  const [lots, setLots] = useState<LotType[] | undefined>();

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(`http://localhost:3000/buyer/api?companyId=${companyId}`);
      setCompanies(data.companies as Company[]);
      setLots(data.lots as LotType[]);
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
        <div className='flex w-[420px] items-end justify-between pt-2'>
          <h2 className='text-md text-yellow-500'>Lots list:</h2>
          {companyId && <CreateLot />}
        </div>
        {lots && lots.length > 0 && <LotList lots={lots} />}
      </div>
    </div>
  );
};

export default Byuer;
