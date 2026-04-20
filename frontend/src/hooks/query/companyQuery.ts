import {
  getAllCompanies,
  getAllCompaniesWithoutFilters,
} from '@/api/company.api';
import type { ICompanyParams } from '@/types/filter';
import { useQuery } from '@tanstack/react-query';

export const useCompanyQuery = (filters: ICompanyParams) => {
  return useQuery({
    queryKey: ['company', filters],
    queryFn: async () => {
      const result = await getAllCompanies(filters);
      return result;
    },
  });
};

export const useCompanyQueryAll = () => {
  return useQuery({
    queryKey: ['company'],
    queryFn: async () => {
      const result = await getAllCompaniesWithoutFilters();
      return result.data;
    },
  });
};
