import { useEffect, useState } from "react";
import { Button, Typography } from "antd";
import { fetchMessage } from "../services/api";
import Master from "./core/Master";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignupPage from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import AurthenticateEmail from "./pages/AurthenticateEmail";
import PassReset from "./pages/PassReset";
import PassResetDone from "./pages/PassResetDone";

const { Title, Paragraph } = Typography;
function App() {
  return <Master />;
}

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignupPage />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/password-reset" element={<PassReset />} />
        <Route path="/password-reset-done" element={<PassResetDone />} />
      </Routes>
    </Router>
  );
};

export default App;
