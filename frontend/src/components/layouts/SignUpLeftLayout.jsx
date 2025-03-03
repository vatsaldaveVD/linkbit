import React, { useState } from "react";
import InputField from "../ui/Input.jsx";
import { Button, Flex, Form, Input } from "antd";
import { Typography } from "antd";

const { Title, Paragraph } = Typography;

const SignUpLeftLayout = ({ onSignUp }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
        <Form layout="vertical">
          <Form.Item label="Full Name" name="name">
            <Input type="email" value={name} onChange={setName} required />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input type="email" value={email} onChange={setEmail} required />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input.Password value={password} onChange={setPassword} required />
          </Form.Item>
          <Button
            type="primary"
            className="btn-primary"
            onClick={onSignUp(name, email, password)}
          >
            Sign Up
          </Button>
        </Form>
      </div>
    </Flex>
  );
};

export default SignUpLeftLayout;
