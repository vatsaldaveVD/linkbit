import React from "react";
import { Typography } from "antd";
import InputField from "../components/ui/Input";
import { Button } from "antd";

const { Title, Paragraph } = Typography;

const PassReset = () => {
  return (
    <div className="contain">
      <div className="auth-container">
        <div className="card">
          <Typography>
            <Title className="heading">Reset Your Password</Title>
            <Paragraph className="subtitle">
              Enter email you're using for your account
            </Paragraph>
          </Typography>
          <InputField label="Email" type="email" />
          <div className="reset-btn-wraper">
            <Button
              type="primary"
              className="btn-primary"
              href="/password-reset-done"
            >
              Reset Your Password
            </Button>
            <a href="/login">Back to Log in</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PassReset;
