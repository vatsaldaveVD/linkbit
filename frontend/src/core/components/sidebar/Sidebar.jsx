import {
  LayoutGrid,
  Link2,
  CircleHelp,
  Settings,
  CircleUserRound,
} from "lucide-react";
import { Layout, Menu, Flex } from "antd";
import { Link } from "react-router";
import ROUTES from "../../utility/constants/routes.constant";
const Sidebar = ({ collapsed, setTitle }) => {
  const { Sider } = Layout;

  const logoUrl = collapsed ? "public/logo-icon.svg" : "public/logo.svg";
  const logoStyles = collapsed ? { maxWidth: 35 } : { maxWidth: 135 };

  const menuItems = [
    {
      label: <Link to={ROUTES.DASHBOARD.URL}>{ROUTES.DASHBOARD.LABEL}</Link>,
      key: "1",
      icon: <LayoutGrid />,
      onClick: () => {
        setTitle(ROUTES.DASHBOARD.LABEL);
      },
    },
    {
      label: (
        <Link to={ROUTES.URL_SHORTNER.URL}>{ROUTES.URL_SHORTNER.LABEL}</Link>
      ),
      key: "2",
      icon: <Link2 />,
      onClick: () => {
        setTitle(ROUTES.URL_SHORTNER.LABEL);
      },
    },
  ];
  const menuItemsBottom = [
    {
      label: <Link to={ROUTES.HELP.URL}>{ROUTES.HELP.LABEL}</Link>,
      key: "3",
      icon: <CircleHelp />,
    },
    {
      label: <Link to={ROUTES.SETTINGS.URL}>{ROUTES.SETTINGS.LABEL}</Link>,
      key: "4",
      icon: <Settings />,
    },
    {
      label: <Link to={ROUTES.PROFILE.URL}>{ROUTES.PROFILE.LABEL}</Link>,
      key: "5",
      icon: <CircleUserRound />,
    },
  ];

  return (
    <Sider trigger={null} collapsible width={230} collapsed={collapsed}>
      <Flex
        justify="center"
        style={{
          height: 64,
          padding: "15px 0",
        }}
      >
        <img src={logoUrl} alt="LinkBit" style={logoStyles} />
      </Flex>
      <Flex
        vertical
        style={{ height: "calc(100% - 64px)" }}
        justify="space-between"
      >
        <Menu
          mode="inline"
          items={menuItems}
          inlineIndent={15}
          defaultSelectedKeys={["1"]}
          style={{ padding: "0 10px", marginTop: 18, border: 0 }}
        />

        <Menu
          mode="inline"
          items={menuItemsBottom}
          inlineIndent={15}
          defaultSelectedKeys={["1"]}
          style={{ padding: "0 10px", marginTop: 18, border: 0 }}
        />
      </Flex>
    </Sider>
  );
};

export default Sidebar;
