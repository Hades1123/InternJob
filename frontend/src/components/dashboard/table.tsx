import { useCompanies } from '@/hooks/query/companyQuery';
import { Image, Table, Tag, Typography } from 'antd';
import { Checkbox, type TableProps } from 'antd';
import { Link } from 'react-router';

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
      const positions = value.positions.map((item) => item.title);
      return positions.map((item, index) => {
        return <div key={index}>*{item}</div>;
      });
    },
  },
  {
    title: 'Công nghệ',
    dataIndex: 'allTechStacks',
    key: 'allTechStacks',
    render: (value: string[]) => {
      return (
        <div className="grid grid-cols-5 gap-4">
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
    render: (value) => <span>{new Date(value).toDateString()}</span>,
  },
  {
    title: 'Checked',
    dataIndex: 'checked',
    key: 'checked',
    render: () => <Checkbox />,
  },
];

export const TableData = () => {
  const { data } = useCompanies();
  return (
    <Table<ICompany & { checked: boolean }>
      columns={columns}
      //@ts-expect-error
      dataSource={data?.data}
    />
  );
};
