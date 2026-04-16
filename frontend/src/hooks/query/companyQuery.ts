import { getAllCompanies } from '@/api/company.api';
import { useQuery } from '@tanstack/react-query';

export const useCompanies = () => {
  return useQuery({
    queryKey: ['company'],
    queryFn: async () => {
      const result = await getAllCompanies();
      return result;
    },
  });
};
