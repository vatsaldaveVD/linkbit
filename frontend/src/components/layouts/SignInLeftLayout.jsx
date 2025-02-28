import React from "react";
import InputField from "../ui/Input.jsx";
import { Button, Flex } from "antd";
import { Typography } from "antd";

const { Title, Paragraph } = Typography;

const SignInLeftLayout = () => {
  return (
    <Flex align="start" justify="center" className="left-panel" vertical>
      <div className="form-container">
        <Typography>
          <Title className="heading">Sign In</Title>
          <Paragraph className="subtitle">
            Need account? <a href="/">Create an account</a>
          </Paragraph>
        </Typography>
        <InputField label="Email" required />
        <InputField label="Password" type="password" showPassword required />
        <div className="fail">
          <span id="fail"></span>
        </div>
        <Button type="primary" className="btn-primary">
          Sign In
        </Button>
        <div className="forget-password">
          <a href="/password-reset">Forget Password?</a>
        </div>
      </div>
    </Flex>
  );
};

export default SignInLeftLayout;
