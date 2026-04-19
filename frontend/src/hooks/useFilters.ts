import type { ICompanyParams } from '@/types/filter';
import { useSearchParams } from 'react-router';

export const useFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const filters: ICompanyParams = {
    page: Number(searchParams.get('page')) || 1,
    pageSize: Number(searchParams.get('pageSize')) || 10,
    techStacks: searchParams.get('techStacks') || undefined,
    name: searchParams.get('name') || undefined,
    position: searchParams.get('position') || undefined,
    checked: searchParams.get('checked') || undefined,
    liked: searchParams.get('liked') || undefined,
  };

  const setFilter = <K extends keyof ICompanyParams>(
    key: K,
    value: ICompanyParams[K]
  ) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set(key, String(value));
      if (key != 'page') {
        next.delete('page');
      }
      return next;
    });
  };

  const setFilters = (params: Partial<ICompanyParams>) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      Object.entries(params).map(([key, value]) => {
        if (value !== undefined && value !== '' && value !== null) {
          next.set(key, String(value));
        } else {
          next.delete(key);
        }
      });
      return next;
    });
  };

  const resetFilters = () => {
    setSearchParams(new URLSearchParams());
    window.location.reload();
  };

  return {
    searchParams,
    filters,
    setSearchParams,
    setFilter,
    setFilters,
    resetFilters,
  };
};
