import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { LotType } from '@/types/lot';
import { QueryKeys } from '@/lib/constants';

export const useGetBuyerData = (companyId: string | undefined) => {
  const { data, isError, isLoading } = useQuery({
    queryKey: [QueryKeys.BUYER_PAGE, companyId],
    queryFn: () => axios.get(`http://localhost:3000/buyer/api?companyId=${companyId}`),
    enabled: Boolean(companyId),
  });

  if (data) {
    return {
      lots: data.data.lots as LotType[],
    };
  }

  return { isError, isLoading };
};
