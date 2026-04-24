import axios from './axios.customize';

export const getUserProfile = async () => {
  const result = await axios.get<APIResponse<IUser>>(`/user`);
  return result.data;
};
