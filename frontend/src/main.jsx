import { ConfigProvider } from "antd";
import { px2remTransformer, StyleProvider } from "@ant-design/cssinjs";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import App from "./App.jsx";
import theme from "./core/utility/constants/theme.constant.js";
import appRoutes from "./routes/app.routes";
import "./index.css";

const px2rem = px2remTransformer({
  rootValue: 16, // 16px = 1rem;
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ConfigProvider theme={theme}>
      <StyleProvider hashPriority="high" transformers={[px2rem]}>
        <RouterProvider router={appRoutes}>
          <App />
        </RouterProvider>
      </StyleProvider>
    </ConfigProvider>
  </StrictMode>
);
