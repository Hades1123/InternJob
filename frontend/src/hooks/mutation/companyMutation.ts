import { checkCompany, likeCompany } from '@/api/company.api';
import type { ICompanyParams } from '@/types/filter';
import { useMutation } from '@tanstack/react-query';
import useApp from 'antd/es/app/useApp';

export const useCompanyMutation = (filters: ICompanyParams) => {
  const { message } = useApp();
  const handleCheckCompany = useMutation({
    mutationFn: async (variables: { id: string; checked: boolean }) => {
      const result = await checkCompany(variables.id, variables.checked);
      return result.data;
    },
    onMutate: (variables, context) => {
      context.client.cancelQueries({ queryKey: ['company', filters] });
      const previous = context.client.getQueryData<APIResponse<ICompany[]>>([
        'company',
        filters,
      ]);
      if (previous) {
        const newData = previous.data?.map((item) =>
          item.companyId === variables.id
            ? { ...item, checked: variables.checked }
            : item
        );
        context.client.setQueryData<APIResponse<ICompany[]>>(
          ['company', filters],
          {
            ...previous,
            data: newData,
          }
        );
      }
      return { previous };
    },
    onError: (err, _, onMutateResult, context) => {
      message.error({
        content: err.message,
      });
      if (onMutateResult?.previous) {
        context.client.setQueryData(
          ['company', filters],
          onMutateResult.previous
        );
      }
    },
    onSuccess: (_data, _variables, _onMutateResult, context) => {
      message.success('Success');
      context.client.invalidateQueries({ queryKey: ['company', filters] });
    },
  });

  const handleLikeCompany = useMutation({
    mutationFn: async (variables: { id: string; liked: boolean }) => {
      const result = await likeCompany(variables.id, variables.liked);
      return result.data;
    },
    onMutate: (variables, context) => {
      context.client.cancelQueries({ queryKey: ['company', filters] });
      const previous = context.client.getQueryData<APIResponse<ICompany[]>>([
        'company',
        filters,
      ]);
      if (previous) {
        const newData = previous.data?.map((item) =>
          item.companyId === variables.id
            ? { ...item, liked: variables.liked }
            : item
        );
        context.client.setQueryData<APIResponse<ICompany[]>>(
          ['company', filters],
          {
            ...previous,
            data: newData,
          }
        );
      }
      return { previous };
    },
    onError: (err, _, onMutateResult, context) => {
      message.error({
        content: err.message,
      });
      if (onMutateResult?.previous) {
        context.client.setQueryData(
          ['company', filters],
          onMutateResult.previous
        );
      }
    },
    onSuccess: (_data, _variables, _onMutateResult, context) => {
      message.success('Success');
      context.client.invalidateQueries({ queryKey: ['company', filters] });
    },
  });

  return {
    handleCheckCompany,
    handleLikeCompany,
  };
};
