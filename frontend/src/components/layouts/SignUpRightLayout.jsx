import React from "react";
import { Button, Flex } from "antd";

const SignUpRightLayout = () => (
  <Flex align="center" justify="center" className="right-panel" vertical>
    <Button className="sign-in-btn" href="/login">
      Sign In
    </Button>
  </Flex>
);

export default SignUpRightLayout;
