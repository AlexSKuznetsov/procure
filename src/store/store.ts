'use client';

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type CompanyState = {
  companyName: string | undefined;
  companyId: string | undefined;
};

type CompanyAction = {
  setCompanyName: (companyName: CompanyState['companyName']) => void;
  setCompanyId: (companyId: CompanyState['companyId']) => void;
};

export const useCompanyStore = create<CompanyState & CompanyAction>()(
  devtools((set) => ({
    companyName: undefined,
    companyId: undefined,
    setCompanyName: (companyName) => set(() => ({ companyName: companyName })),
    setCompanyId: (companyId) => set(() => ({ companyId: companyId })),
  })),
);
