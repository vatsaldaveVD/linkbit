import React, { useState } from "react";
import { Input, Tooltip } from "antd";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";

const InputField = ({
  label,
  type = "text",
  required = false,
  showPassword = false,
  placeholder = "",
  disablePasswordToggle = false, // New prop to disable eye icon
  disableCriteriaCheck = false, // New prop to disable criteria check
}) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [value, setValue] = useState("");

  const criteria = {
    uppercase: /[A-Z]/.test(value),
    lowercase: /[a-z]/.test(value),
    number: /[0-9]/.test(value),
    specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(value),
    length: value.length >= 7,
  };

  return (
    <>
      <div className="label-wrapper">
        <label>
          {required && <span>*</span>} {label}
        </label>
        {showPassword &&
          !disablePasswordToggle && ( // Hide eye icon if disabled
            <span
              className="eye-icon"
              onClick={() => setPasswordVisible(!passwordVisible)}
            >
              {passwordVisible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
            </span>
          )}
      </div>
      <div className="input-wrapper">
        <Input
          type={showPassword && passwordVisible ? "text" : type}
          placeholder={placeholder}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setTooltipVisible(true)}
          onBlur={() => setTooltipVisible(false)}
        />
        {type === "password" &&
          !disableCriteriaCheck && ( // Hide criteria if disabled
            <Tooltip
              title={
                <ul className="password-requirements">
                  <li>{criteria.uppercase ? "✅" : "❌"} Uppercase Letter</li>
                  <li>{criteria.lowercase ? "✅" : "❌"} Lowercase Letter</li>
                  <li>{criteria.number ? "✅" : "❌"} Number</li>
                  <li>
                    {criteria.specialChar ? "✅" : "❌"} Special Character
                  </li>
                  <li>{criteria.length ? "✅" : "❌"} Minimum 7 Characters</li>
                </ul>
              }
              visible={tooltipVisible}
              placement="right"
            ></Tooltip>
          )}
      </div>
    </>
  );
};

export default InputField;
