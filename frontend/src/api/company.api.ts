import type { ICompanyParams } from '@/types/filter';
import axios from './axios.customize';

export const getAllCompanies = async (filters: ICompanyParams) => {
  const result = await axios.get<APIResponse<ICompany[]>>('/companies', {
    params: filters,
  });
  return result.data;
};

export const checkCompany = async (id: string, checked: boolean) => {
  const result = await axios.post<APIResponse<ICompany>>('/companies/checked', {
    id,
    checked,
  });
  return result.data;
};
