import { useCompanyMutation } from '@/hooks/mutation/companyMutation';
import { useCompanies } from '@/hooks/query/companyQuery';
import { Checkbox } from 'antd';

const CustomCheckBox = ({ id }: { id: string }) => {
  const { handleCheckCompany } = useCompanyMutation();
  const { data } = useCompanies();
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
