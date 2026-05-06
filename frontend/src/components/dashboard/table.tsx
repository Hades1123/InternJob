import { useCompanyQuery } from '@/hooks/query/companyQuery';
import { Image, Space, Table, Tag, Typography } from 'antd';
import CheckBox from './checkBox';
import { type TableProps } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { Link } from 'react-router';
import { useFilters } from '@/hooks/useFilters';
import { LikedComponent } from './liked';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { EditModal } from './edit.modal';
import { QuantityFilter } from '@/constants/constant';

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

const extractFilter = (
  filter: Record<string, unknown>,
  key: string,
): string | undefined => {
  const values = filter[key] as string[] | undefined;
  if (!values?.length) return undefined;
  return values.length === 1 ? values[0] : undefined;
};

export const TableData = () => {
  const { filters, setFilters } = useFilters();
  const { data, isLoading } = useCompanyQuery(filters);
  const [openModal, setIsOpenModal] = useState<boolean>(false);
  const [selectedCompanyId, setSelectedCompanyId] = useState<string>('');

  const handleTableChange = useCallback<
    NonNullable<TableProps<ICompany>['onChange']>
  >(
    (pagination, filter) => {
      setFilters({
        liked: extractFilter(filter, 'liked'),
        checked: extractFilter(filter, 'checked'),
        quantity: extractFilter(filter, 'stat'),
        page: pagination.current ?? 1,
        pageSize: pagination.pageSize,
      });
    },
    [setFilters],
  );

  const columns = useMemo<TableProps<ICompany>['columns']>(
    () => [
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
        title: 'Đã nộp',
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
        filters: [
          { text: 'full', value: QuantityFilter.full },
          { text: 'insufficients', value: QuantityFilter.insufficient },
        ],
      },
      {
        title: 'Hạn nộp',
        dataIndex: 'GeminiSumary',
        key: 'Deadline',
        render: (value: IGeminiSummary) => (
          <span>{value?.generalNotes ?? 'None'}</span>
        ),
      },
      {
        title: 'Actions',
        key: 'Actions',
        render: (_value, record) => (
          <Space>
            <EditOutlined
              style={{ padding: 2, cursor: 'pointer' }}
              onClick={() => {
                setIsOpenModal(true);
                setSelectedCompanyId(record.companyId);
              }}
            />
          </Space>
        ),
      },
    ],
    [],
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [filters]);

  return (
    <>
      <Table<ICompany>
        rowKey={'companyId'}
        loading={isLoading}
        columns={columns}
        dataSource={data?.data}
        tableLayout="fixed"
        scroll={{ x: 'max-content' }}
        onChange={handleTableChange}
        pagination={{
          current: data?.page,
          pageSize: data?.pageSize,
          total: data?.total,
          defaultPageSize: 10,
          defaultCurrent: 1,
          pageSizeOptions: [5, 10, 20, 50, 100],
          showTotal(total, range) {
            return `${range[0]} - ${range[1]} of ${total} companies`;
          },
        }}
      />
      <EditModal
        setCompanyId={setSelectedCompanyId}
        companyId={selectedCompanyId}
        open={openModal}
        setOpen={setIsOpenModal}
      />
    </>
  );
};
