import { useCompanyQuery } from '@/hooks/query/companyQuery';
import { useFilters } from '@/hooks/useFilters';
import { Button, Card, Col, Input, Row, Typography } from 'antd';
import { useEffect, useState } from 'react';

const CustomSearch = () => {
  const { filters, setFilters, resetFilters } = useFilters();
  const { data } = useCompanyQuery(filters);
  const [name, setName] = useState<string>('');
  const [position, setPosition] = useState<string>('');
  const [techStacks, setTechStacks] = useState<string>('');

  const onSearch = () => {
    setFilters({
      page: 1,
      techStacks,
      name,
      position,
    });
  };

  const handleClearInputs = () => {
    setName('');
    setPosition('');
    setTechStacks('');
  };

  useEffect(() => {
    setName(filters.name ?? '');
    setPosition(filters.position ?? '');
    setTechStacks(filters.techStacks ?? '');
  }, [filters]);

  return (
    <Card style={{ marginBottom: '1rem' }}>
      <Row gutter={[10, 0]} align={'middle'}>
        <Col span={8}>
          <Typography.Title level={5} style={{ textAlign: 'start' }}>
            Tên công ty
          </Typography.Title>
          <Input
            placeholder="Nhập tên công ty"
            allowClear
            size="large"
            style={{ marginBottom: 10 }}
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </Col>
        <Col span={8}>
          <Typography.Title level={5} style={{ textAlign: 'start' }}>
            Tên vị trí
          </Typography.Title>
          <Input
            placeholder="Nhập tên công nghệ mà bạn muốn tìm. Ví dụ: react,javascript,..."
            allowClear
            size="large"
            style={{ marginBottom: 10 }}
            onChange={(e) => setPosition(e.target.value)}
            value={position}
          />
        </Col>
        <Col span={8}>
          <Typography.Title level={5} style={{ textAlign: 'start' }}>
            Công nghệ
          </Typography.Title>
          <Input
            placeholder="Nhập tên công nghệ mà bạn muốn tìm. Ví dụ: react,javascript,..."
            allowClear
            size="large"
            style={{ marginBottom: 10 }}
            onChange={(event) => setTechStacks(event.target.value)}
            value={techStacks}
          />
        </Col>
      </Row>
      <Row style={{ gap: 10, marginBottom: 10 }}>
        <Button onClick={onSearch} color="primary" variant="solid">
          Search
        </Button>
        <Button color="red" variant="filled" onClick={handleClearInputs}>
          Clear all inputs
        </Button>
        <Button onClick={() => resetFilters()}>Reset</Button>
      </Row>
      {data?.data?.length !== 0 && (
        <Typography style={{ textAlign: 'start' }}>
          Kết quả tìm kiếm:{' '}
          <span className="font-bold text-red-500">
            {data?.total} công ty
          </span>{' '}
        </Typography>
      )}
    </Card>
  );
};

export default CustomSearch;
