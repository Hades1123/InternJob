import { useState } from 'react';
import { Button, Layout } from 'antd';
import { Outlet } from 'react-router';
import { Sidebar } from './sidebar';
import { AppHeader } from './header';
import { AppFooter } from './footer';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Footer, Header } from 'antd/es/layout/layout';

const { Sider, Content } = Layout;

const contentStyle: React.CSSProperties = {
  minHeight: 'calc(100vh - 128px)',
  backgroundColor: '#f5f5f5',
};

const layoutStyle = {
  minHeight: '100vh',
};

export const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(true);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout style={layoutStyle}>
      <Sider
        width={200}
        collapsedWidth={80}
        collapsed={collapsed}
        style={{ backgroundColor: 'white' }}
      >
        <Button
          type="primary"
          onClick={toggleCollapsed}
          className="w-full mt-4"
        >
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </Button>
        <Sidebar />
      </Sider>
      <Layout>
        <Header style={{ backgroundColor: 'white', height: 64, padding: 0 }}>
          <AppHeader />
        </Header>
        <Content style={contentStyle}>
          <Outlet />
        </Content>
        <Footer style={{ backgroundColor: 'white', padding: '16px 50px' }}>
          <AppFooter />
        </Footer>
      </Layout>
    </Layout>
  );
};
