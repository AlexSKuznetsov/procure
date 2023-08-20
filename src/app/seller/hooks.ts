import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { LotType } from '@/types/lot';

export const useGetSellerData = (companyId: string | undefined) => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ['sellerdata', companyId],
    queryFn: () => axios.get(`http://localhost:3000/seller/api?companyId=${companyId}`),
    refetchInterval: 1000 * 3,
  });

  if (data) {
    return {
      lots: data.data.lots as LotType[],
    };
  }

  return { isError, isLoading };
};
