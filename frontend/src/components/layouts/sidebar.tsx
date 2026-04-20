import { BarChartOutlined, FundOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';

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
  const { pathname } = useLocation();
  const [currentKey, setCurrentKey] = useState<string>('/');

  const onClick: MenuProps['onClick'] = (e) => {
    navigate(e.key);
    setCurrentKey(e.key);
  };

  useEffect(() => {
    setCurrentKey(pathname);
  }, [pathname]);

  return (
    <>
      <Menu
        onClick={onClick}
        style={{ width: '100%', height: '100%' }}
        defaultSelectedKeys={[currentKey]}
        selectedKeys={[currentKey]}
        mode="inline"
        items={items}
      />
    </>
  );
};
