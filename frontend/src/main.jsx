import ReactDOM from "react-dom/client";
import { ConfigProvider } from "antd";
import App from "./App";
import theme from "../config/theme";
import "./styles/main.scss";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ConfigProvider theme={theme}>
    <App />
  </ConfigProvider>
);
