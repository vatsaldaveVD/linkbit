import { Typography } from "antd";
import React from "react";
import InputField from "../ui/Input";
import { Button } from "antd";

const { Title, Paragraph } = Typography;

const Auth = () => {
  return (
    <div className="auth-container">
      <div className="card">
        <Typography>
          <Title className="heading">Check Your Email</Title>
          <Paragraph className="subtitle">
            We've sent a message to <b>dariatokmakova@mail.com</b> with an
            activation link and code. Follow the link or enter the code below to
            confirm your email address.
          </Paragraph>
        </Typography>
        <InputField
          label="Activation Code"
          type="password"
          placeholder="Enter 6-digit code here"
          disablePasswordToggle
          disableCriteriaCheck
        />
        <div className="auth-receive">
          <Typography>
            <Title className="heading" level={4}>
              Didn't receive the email?
            </Title>
            <Paragraph className="subtitle">
              <a>Send Email again</a> <span>or</span>{" "}
              <a href="/">Re-enter email and try again</a>
            </Paragraph>
          </Typography>
        </div>
      </div>
      <div className="auth-sign-btn">
        <Button className="sign-in-btn" href="/login">
          <span>Sign In</span>
        </Button>
      </div>
    </div>
  );
};

export default Auth;
