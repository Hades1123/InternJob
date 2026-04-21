import type { ICompanyParams } from '@/types/filter';
import axios from './axios.customize';

export const getAllCompanies = async (filters: ICompanyParams) => {
  const result = await axios.get<APIResponse<ICompany[]>>('/companies', {
    params: filters,
  });
  return result.data;
};

export const getAllCompaniesWithoutFilters = async () => {
  const result = await axios.get<APIResponse<ICompany[]>>('/companies/all');
  return result.data;
};

export const getCompanyId = async (companyId: string) => {
  const result = await axios.get<APIResponse<ICompany>>(
    `/companies/${companyId}`
  );
  return result.data;
};

export const checkCompany = async (id: string, checked: boolean) => {
  const result = await axios.post<APIResponse<ICompany>>('/companies/checked', {
    id,
    checked,
  });
  return result.data;
};

export const likeCompany = async (id: string, liked: boolean) => {
  const result = await axios.post<APIResponse<ICompany>>('/companies/liked', {
    id,
    liked,
  });
  return result.data;
};

export const updateSummaryAPI = async (payload: {
  id: string;
  allTechStacks: string[];
  generalNotes: string;
}) => {
  const result = await axios.post(`companies/summary`, payload);
  return result.data;
};
