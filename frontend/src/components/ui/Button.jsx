import React from "react";
import { Button } from "antd";

const ButtonComponent = ({
  text,
  type = "default",
  fullWidth = false,
  className = "",
  disabled = false,
}) => (
  <Button
    type={type}
    className={`btn ${className}`}
    block={fullWidth}
    disabled={disabled}
  >
    {text}
  </Button>
);

export default ButtonComponent;
