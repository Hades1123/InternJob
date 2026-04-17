import { useCompanyMutation } from '@/hooks/mutation/companyMutation';
import { useCompanyQuery } from '@/hooks/query/companyQuery';
import { useFilters } from '@/hooks/useFilters';
import { Checkbox } from 'antd';

const CustomCheckBox = ({ id }: { id: string }) => {
  const { handleCheckCompany } = useCompanyMutation();
  const { filters } = useFilters();
  const { data } = useCompanyQuery(filters);
  return (
    <Checkbox
      checked={data?.data?.find((item) => item.companyId === id)?.checked}
      onChange={(e) => {
        handleCheckCompany.mutate({ id, checked: e.target.checked });
      }}
    />
  );
};

export default CustomCheckBox;
