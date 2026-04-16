import axios from './axios.customize';

export const getAllCompanies = async () => {
  const result = await axios.get<APIResponse<ICompany[]>>('/companies');
  return result.data;
};
