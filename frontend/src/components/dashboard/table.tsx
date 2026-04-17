import { useCompanyQuery } from '@/hooks/query/companyQuery';
import { Image, Table, Tag, Typography } from 'antd';
import CheckBox from './checkBox';
import { type TableProps } from 'antd';
import { Link } from 'react-router';
import { useFilters } from '@/hooks/useFilters';

const presets = [
  'magenta',
  'red',
  'volcano',
  'orange',
  'gold',
  'lime',
  'green',
  'cyan',
  'blue',
  'geekblue',
  'purple',
];

const columns: TableProps<ICompany & { checked: boolean }>['columns'] = [
  {
    title: 'Logo',
    dataIndex: 'companyIcon',
    key: 'companyIcon',
    render: (value) => (
      <Image
        width={50}
        alt="Logo"
        src={`${import.meta.env.VITE_COMPANY_ICON_URL}/${value}`}
      />
    ),
  },
  {
    title: 'Tên đầy đủ',
    dataIndex: 'fullName',
    key: 'fullName',
    width: 200,
    render: (value) => (
      <Link to={'/'}>
        <Typography.Text copyable>{value}</Typography.Text>
      </Link>
    ),
  },
  {
    title: 'Vị trí',
    dataIndex: 'GeminiSumary',
    key: 'GeminiSumary',
    render: (value: IGeminiSummary) => {
      const positions = value?.positions?.map((item) => item.title) ?? [];
      return positions.map((item, index) => {
        return <div key={index}>*{item}</div>;
      });
    },
  },
  {
    title: 'Công nghệ',
    dataIndex: 'allTechStacks',
    key: 'allTechStacks',
    width: 500,
    render: (value: string[]) => {
      return (
        <div className="flex flex-wrap gap-4">
          {[...new Set(value)].map((tech, index) => (
            <Tag
              key={index % value.length}
              color={presets[index % presets.length]}
              variant="filled"
            >
              {tech}
            </Tag>
          ))}
        </div>
      );
    },
  },
  {
    title: 'Ngày tạo',
    dataIndex: 'createdAt',
    key: 'createdAt',
    hidden: true,
    render: (value) => <span>{new Date(value).toDateString()}</span>,
  },
  {
    title: 'Files',
    dataIndex: 'files',
    key: 'files',
    width: 200,
    render: (value: IFile[]) => {
      return value.map((item) => (
        <div className="line-clamp-1">
          <Link
            key={item.name}
            to={`${import.meta.env.VITE_COMPANY_ICON_URL}/${item.path}`}
            target="_blank"
          >
            <span className="text-red-600">{item.fileType}:</span>
            {item.name}
          </Link>
        </div>
      ));
    },
  },
  {
    title: 'Checked',
    dataIndex: 'checked',
    key: 'checked',
    render: (_, record) => <CheckBox id={record.companyId} />,
  },
];

export const TableData = () => {
  const { filters, setFilters } = useFilters();
  const { data } = useCompanyQuery(filters);

  return (
    <Table<ICompany & { checked: boolean }>
      columns={columns}
      dataSource={data?.data}
      pagination={{
        current: data?.page,
        pageSize: data?.pageSize,
        total: data?.total,
        defaultPageSize: 10,
        defaultCurrent: 1,
        showTotal(total, range) {
          return `${range[0]} - ${range[1]} of ${total} items`;
        },
        onChange(page, pageSize) {
          setFilters({ page, pageSize });
        },
      }}
    />
  );
};
