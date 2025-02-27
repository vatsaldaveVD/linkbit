import { ConfigProvider } from "antd";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import App from "./App.jsx";
import theme from "./core/utility/constants/theme.constant.js";
import appRoutes from "./routes/app.routes";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ConfigProvider theme={theme}>
      <RouterProvider router={appRoutes}>
        <App />
      </RouterProvider>
    </ConfigProvider>
  </StrictMode>
);
