import { Flex, Layout, theme } from "antd";
import { useState } from "react";
import { Outlet } from "react-router";
import Header from "./components/header/Header";
import Sidebar from "./components/sidebar/Sidebar";
import ROUTES from "./utility/constants/routes.constant";

const Master = () => {
  const { Content } = Layout;
  const { token } = theme.useToken();

  const [title, setTitle] = useState(ROUTES.DASHBOARD.LABEL);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Sidebar Navigation */}
      <Sidebar collapsed={collapsed} setTitle={setTitle} />
      {/* Main Content */}
      <Layout>
        <Header
          title={title}
          collapsed={collapsed}
          setCollapsed={setCollapsed}
        />
        <Content style={{ padding: "20px", overflowY: "auto" }}>
          <Flex vertical="vertical">
            <Outlet />
          </Flex>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Master;
