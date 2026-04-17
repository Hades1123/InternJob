import React, { useState } from 'react';
import { Button, Layout } from 'antd';
import { Outlet } from 'react-router';
import { Sidebar } from './sidebar';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

const { Header, Footer, Sider, Content } = Layout;

const headerStyle: React.CSSProperties = {
  textAlign: 'center',
  color: 'black',
  height: 64,
  paddingInline: 48,
  lineHeight: '64px',
  backgroundColor: 'white',
};

const contentStyle: React.CSSProperties = {
  textAlign: 'center',
  minHeight: '100vh',
  lineHeight: '120px',
  color: 'black',
  marginLeft: '15%',
};

const footerStyle: React.CSSProperties = {
  textAlign: 'center',
  color: 'black',
  backgroundColor: 'white',
};

const layoutStyle = {
  borderRadius: 8,
  overflow: 'hidden',
};

export const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  return (
    <Layout style={layoutStyle}>
      <Sider
        width="15%"
        collapsed={collapsed}
        style={{
          backgroundColor: 'white',
          position: 'fixed',
          minHeight: '100vh',
        }}
      >
        <Button type="primary" onClick={toggleCollapsed} className="w-full">
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </Button>
        <Sidebar />
      </Sider>
      <Layout>
        <Header style={headerStyle}>Header</Header>
        <Content style={contentStyle}>
          <Outlet />
        </Content>
        <Footer style={footerStyle}>Footer</Footer>
      </Layout>
    </Layout>
  );
};
