import { BarChartOutlined, FundOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { useNavigate } from 'react-router';

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  {
    key: '/',
    label: 'Dashboard',
    icon: <FundOutlined />,
  },
  {
    key: '/static',
    label: 'Static',
    icon: <BarChartOutlined />,
  },
];

export const Sidebar = () => {
  const navigate = useNavigate();
  const onClick: MenuProps['onClick'] = (e) => {
    navigate(e.key);
  };

  return (
    <>
      <Menu
        onClick={onClick}
        style={{ width: '100%', height: '100%' }}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        items={items}
      />
    </>
  );
};
