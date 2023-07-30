'use client';

import axios from 'axios';
import { useState, useEffect } from 'react';
import { PageHeader } from '@/components/PageHeader';
import { CompanySelect } from '@/components/CompanySelect';
import { LotList } from '@/components/LotList';
import { useCompanyStore } from '@/store/store';
import { Company } from 'prisma/prisma-client';
import { LotType } from '@/types/lot';

const Seller = () => {
  const { companyId } = useCompanyStore();

  const [companies, setCompanies] = useState<Company[] | undefined>();
  const [lots, setLots] = useState<LotType[] | undefined>();

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(`http://localhost:3000/seller/api?companyId=${companyId}`);
      setCompanies(data.companies);
      setLots(data.lots as LotType[]);
    };

    getData();
  }, [companyId]);

  return (
    <div className='mt-2 h-[calc(100vh-50px)]'>
      <div className='flex items-center justify-center gap-2 pt-2'>
        <PageHeader text='Seller page' />
        {companies && <CompanySelect companies={companies} />}
      </div>

      <div className='mt-4 flex flex-col items-center space-y-2'>
        <div className='mt-2 text-yellow-500'>
          <span>List of active lots:</span>
        </div>
        {lots && lots.length > 0 && <LotList lots={lots} />}
      </div>
    </div>
  );
};

export default Seller;
