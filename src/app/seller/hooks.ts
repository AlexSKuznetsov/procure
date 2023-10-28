import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { LotType } from '@/types/lot';

export const useGetSellerData = (companyId: string | undefined) => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ['sellerdata', companyId],
    queryFn: () => axios.get(`seller/api?companyId=${companyId}`),
    enabled: Boolean(companyId),
  });

  if (data) {
    return {
      lots: data.data.lots as LotType[],
    };
  }

  return { isError, isLoading };
};
