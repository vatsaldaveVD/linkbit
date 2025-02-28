import React from "react";
import { Typography } from "antd";

const { Title, Paragraph } = Typography;

const PassResetDone = () => {
  return (
    <div className="contain">
      <div className="auth-container">
        <div className="card">
          <Typography>
            <Title className="heading">Done and done</Title>
            <Paragraph className="subtitle">
              We've sent password reset instructions to{" "}
              <b>dariatokmakova@mail.com.</b>
            </Paragraph>
            <Paragraph className="subtitle">
              If no email is received within ten minutes, check that the
              submitted address is correct.
            </Paragraph>
          </Typography>
          <a href="/login">Return to Login</a>
        </div>
      </div>
    </div>
  );
};

export default PassResetDone;
