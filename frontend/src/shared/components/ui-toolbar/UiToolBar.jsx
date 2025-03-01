import { Flex, Layout, Typography } from "antd";

const UiToolbar = ({ title, backButton, button }) => {
  const { Header } = Layout;
  const headerStyles = {
    display: "flex",
    marginBottom: 20,
    padding: "0 0 0 2px",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "transparent",
  };

  return (
    <Header style={headerStyles}>
      <Flex vertical>
        {backButton}
        <Typography.Title
          level={4}
          style={{ margin: backButton ? "5px 0 0 0" : 0 }}
        >
          {title}
        </Typography.Title>
      </Flex>
      {button}
    </Header>
  );
};

export default UiToolbar;
