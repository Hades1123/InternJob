import { TableData } from '@/components/dashboard/table';
import SearchInput from '@/components/dashboard/search';

export const DashboardPage = () => {
  return (
    <div className="p-16">
      <SearchInput />
      <TableData />
    </div>
  );
};
