import { useCompanyQuery } from '@/hooks/query/companyQuery';
import { Image, Table, Tag, Typography } from 'antd';
import CheckBox from './checkBox';
import { type TableProps } from 'antd';
import { Link } from 'react-router';
import { useFilters } from '@/hooks/useFilters';
import { LikedComponent } from './liked';
import { useEffect } from 'react';

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

const columns: TableProps<ICompany>['columns'] = [
  {
    title: 'Logo',
    dataIndex: 'companyIcon',
    key: 'companyIcon',
    width: 80,
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
    width: 250,
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
    width: 300,
    render: (value: string[]) => {
      return (
        <div className="flex flex-wrap gap-4">
          {[...new Set(value)].map((tech, index) => (
            <Tag
              key={index % value.length}
              color={presets[index % presets.length]}
              variant="filled"
            >
              {tech[0].toUpperCase() + tech.substring(1)}
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
    width: 100,
    render: (value: IFile[]) => {
      return value.map((item) => (
        <div className="line-clamp-1 max-w-32">
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
    title: 'Đã xem',
    dataIndex: 'checked',
    key: 'checked',
    width: 50,
    render: (_, record) => (
      <CheckBox id={record.companyId} checked={record.checked} />
    ),
    filters: [
      { text: 'true', value: 'true' },
      { text: 'false', value: 'false' },
    ],
  },
  {
    title: 'Like',
    dataIndex: 'liked',
    key: 'liked',
    width: 50,
    render: (value: boolean, record) => (
      <LikedComponent id={record.companyId} liked={value} />
    ),
    filters: [
      { text: 'true', value: 'true' },
      { text: 'false', value: 'false' },
    ],
  },
  {
    title: 'Num',
    dataIndex: 'stat',
    key: 'stat',
    width: 50,
    render: (value: IStat) => (
      <span>
        {value.studentAccepted}/{value.maxAcceptedStudent}
      </span>
    ),
  },
  {
    title: 'Hạn nộp',
    dataIndex: 'GeminiSumary',
    key: 'Deadline',
    render: (value: IGeminiSummary) => (
      <span>{value?.generalNotes ?? 'None'}</span>
    ),
  },
];

export const TableData = () => {
  const { filters, setFilters } = useFilters();
  const { data, isLoading } = useCompanyQuery(filters);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [filters]);

  return (
    <Table<ICompany>
      rowKey={'companyId'}
      loading={isLoading}
      columns={columns}
      dataSource={data?.data}
      tableLayout="fixed"
      scroll={{ x: 'max-content' }}
      onChange={(pagination, filter, _sorter, _extra) => {
        const likedFilter =
          filter != null
            ? filter['liked']?.length == 2
              ? undefined
              : (filter['liked']?.at(0) as string)
            : undefined;
        const checkedFilter =
          filter != null
            ? filter['checked']?.length == 2
              ? undefined
              : (filter['checked']?.at(0) as string)
            : undefined;
        setFilters({
          liked: likedFilter,
          checked: checkedFilter,
          page: pagination.current,
          pageSize: pagination.pageSize,
        });
      }}
      pagination={{
        current: data?.page,
        pageSize: data?.pageSize,
        total: data?.total,
        defaultPageSize: 10,
        defaultCurrent: 1,
        pageSizeOptions: [5, 10, 20, 50, 100],
        showTotal(total, range) {
          return `${range[0]} - ${range[1]} of ${total} items`;
        },
      }}
    />
  );
};
