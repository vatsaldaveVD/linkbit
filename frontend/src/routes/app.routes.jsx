import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router";
import App from "../App";
import { lazy } from "react";
import ErrorPage from "../core/ErrorPage";

const Dashboard = lazy(() => import("../pages/dashboard/Dashboard"));
const UrlShortner = lazy(() => import("../pages/url-shortner/UrlShortner"));

const appRoutes = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} errorElement={<ErrorPage />}>
      <Route index element={<Dashboard />} /> {/* Default route */}
      <Route path="url-shortner" element={<UrlShortner />} />
    </Route>
  )
);

export default appRoutes;
