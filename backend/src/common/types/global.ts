export interface APIResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
  page?: number;
  pageSize?: number;
  total?: number;
}
