import type { ThemeConfig } from "antd";

const theme: ThemeConfig = {
  token: {
    colorPrimary: "#394EB4",
    fontFamily: "Nunito Sans",
    fontSize: 16,
  },
  components: {
    Button: {
      paddingInline: 15,
      controlHeight: 40,
    },
    Menu: {
      colorBgContainer: "#fff",
    },
    Layout: {
      headerBg: "#fff",
      siderBg: "#fff",
    },
    Card: {
      headerFontSize: 14,
      headerHeight: 45,
      fontWeightStrong: 800,
    },
    Modal: {
      headerBg: "#EFF0F0",
    },
    Input: {
      controlHeight: 36,
    },
  },
};

export default theme;
