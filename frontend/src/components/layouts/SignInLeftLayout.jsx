import InputField from "../ui/Input.jsx";
import { Button, Flex, Form, Input } from "antd";
import { Typography } from "antd";
import { useState } from "react";

const { Title, Paragraph } = Typography;
const SignInLeftLayout = ({ onSignIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [form] = Form.useForm();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleSignInBtnClick = (e) => {
    e.preventDefault();
    onSignIn({ email, password });
  };
  return (
    <Flex align="start" justify="center" className="left-panel" vertical>
      <div className="form-container">
        <Typography>
          <Title className="heading">Sign In</Title>
          <Paragraph className="subtitle">
            Need account? <a href="/">Create an account</a>
          </Paragraph>
        </Typography>

        <Form layout="vertical" form={form}>
          <Form.Item label="Email" name="email">
            <Input
              type="email"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input.Password
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </Form.Item>
        </Form>
        <Button
          type="primary"
          className="btn-primary"
          onClick={handleSignInBtnClick}
        >
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
