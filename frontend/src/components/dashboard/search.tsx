import { useCompanyQuery } from '@/hooks/query/companyQuery';
import { useFilters } from '@/hooks/useFilters';
import { Button, Card, Col, Input, Row, Typography, type GetProps } from 'antd';
type SearchProps = GetProps<typeof Input.Search>;

const { Search } = Input;

const CustomSearch = () => {
  const { filters, setFilter, resetFilters } = useFilters();
  const { data } = useCompanyQuery(filters);

  const onSearch: SearchProps['onSearch'] = (value, _e, _info) => {
    setFilter('techStacks', value);
  };
  return (
    <Card style={{ marginBottom: '1rem' }}>
      <Row align={'middle'}>
        <Col span={20}>
          <Search
            placeholder="Nhập tên công nghệ mà bạn muốn tìm. Ví dụ: react,javascript,..."
            allowClear
            enterButton="Search"
            size="large"
            onSearch={onSearch}
            style={{ marginBottom: 10 }}
          />
        </Col>
        <Col span={4}>
          <Button onClick={() => resetFilters()}>reset</Button>
        </Col>
      </Row>
      {filters.techStacks && (
        <Typography style={{ textAlign: 'start' }}>
          Kết quả tìm kiếm cho{' '}
          <span className="font-bold text-black">"{filters.techStacks}"</span>:{' '}
          <span className="font-bold text-red-500">
            {data?.total} công ty
          </span>{' '}
        </Typography>
      )}
    </Card>
  );
};

export default CustomSearch;
