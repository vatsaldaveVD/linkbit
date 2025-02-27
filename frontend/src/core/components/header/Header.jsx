import { PanelRightOpen, PanelRightClose } from "lucide-react";
import { Button, Flex, Layout, Typography } from "antd";

const Header = ({ title, collapsed, setCollapsed }) => {
  const { Header } = Layout;

  return (
    <Header style={{ padding: 0 }}>
      <Flex align="center">
        <Button
          type="text"
          icon={collapsed ? <PanelRightClose /> : <PanelRightOpen />}
          onClick={() => setCollapsed(!collapsed)}
          style={{
            fontSize: "16px",
            width: 64,
            height: 64,
          }}
        />
        <Typography.Title level={4} style={{ margin: 0 }}>
          {title}
        </Typography.Title>
      </Flex>
    </Header>
  );
};

export default Header;
