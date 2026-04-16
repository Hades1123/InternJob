import { checkCompany } from '@/api/company.api';
import { useMutation } from '@tanstack/react-query';
import { message } from 'antd';

export const useCompanyMutation = () => {
  const handleCheckCompany = useMutation({
    mutationFn: async (variables: { id: string; checked: boolean }) => {
      const result = await checkCompany(variables.id, variables.checked);
      return result.data;
    },
    onMutate: (variables, context) => {
      const previous = context.client.getQueryData<APIResponse<ICompany[]>>([
        'company',
      ])?.data;
      if (previous) {
        const newData = previous.map((item) =>
          item.companyId === variables.id
            ? { ...item, checked: variables.checked }
            : item
        );
        context.client.setQueryData(['company'], newData);
      }
      return { previous };
    },
    onError: (err, variables, onMutateResult, context) => {
      message.error({
        content: err.message,
      });
      context.client.setQueryData(['company'], onMutateResult?.previous);
    },
    onSuccess: (_data, _variables, _onMutateResult, context) => {
      message.success('Check thành công');
      context.client.invalidateQueries({ queryKey: ['company'] });
    },
  });

  return {
    handleCheckCompany,
  };
};
