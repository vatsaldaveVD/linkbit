import React from "react";
import InputField from "../ui/Input.jsx";
import { Button, Flex } from "antd";
import { Typography } from "antd";

const { Title, Paragraph } = Typography;

const SignUpLeftLayout = () => {
  return (
    <Flex align="start" justify="center" className="left-panel" vertical>
      <div className="form-container">
        <Typography>
          <Title weight="300" className="heading">
            Start your 14 - days
            <br />
            free trial today
          </Title>
          <Paragraph className="subtitle">
            Try for free to explore tools you need to start,
            <br />
            run and grow your business.
          </Paragraph>
        </Typography>
        <form>
          <InputField label="Name" required />
          <InputField label="Email" required />
          <InputField label="Password" type="password" showPassword required />
          <Button type="primary" className="btn-primary" href="">
            Sign Up
          </Button>
        </form>
      </div>
    </Flex>
  );
};

export default SignUpLeftLayout;
