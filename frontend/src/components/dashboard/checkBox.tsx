import { useCompanyMutation } from '@/hooks/mutation/companyMutation';
import { useFilters } from '@/hooks/useFilters';
import { Checkbox } from 'antd';

const CustomCheckBox = ({ id, checked }: { id: string; checked: boolean }) => {
  const { filters } = useFilters();
  const { handleCheckCompany } = useCompanyMutation(filters);
  return (
    <Checkbox
      checked={checked}
      onChange={(e) => {
        handleCheckCompany.mutate({ id, checked: e.target.checked });
      }}
    />
  );
};

export default CustomCheckBox;
