import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router";
import App from "../App";
import { lazy } from "react";
import ErrorPage from "../core/ErrorPage";
import SignUp from "../pages/SignUp";
import SignIn from "../pages/SignIn";
import PassReset from "../pages/PassReset";
import PassResetDone from "../pages/PassResetDone";

const Dashboard = lazy(() => import("../pages/dashboard/Dashboard"));
const UrlShortner = lazy(() => import("../pages/url-shortner/UrlShortner"));

const appRoutes = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} errorElement={<ErrorPage />}>
      <Route path="/" element={<SignUp />} />
      <Route path="/login" element={<SignIn />} />
      <Route path="/password-reset" element={<PassReset />} />
      <Route path="/password-reset-done" element={<PassResetDone />} />
      <Route index element={<Dashboard />} /> {/* Default route */}
      <Route path="url-shortner" element={<UrlShortner />} />
    </Route>
  )
);

export default appRoutes;
