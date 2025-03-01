import { message } from "antd";
import { useState } from "react";

/**
 * Custom hook to copy text to clipboard with success messages.
 * @returns {object} { copyToClipboard, contextHolder }
 */
const useClipboard = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [copiedText, setCopiedText] = useState("");

  const copyToClipboard = (text) => {
    if (!text) {
      messageApi.error("Nothing to copy!");
      return;
    }

    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopiedText(text);
        messageApi.success("Copied to clipboard");
      })
      .catch(() => {
        messageApi.error("Failed to copy");
      });
  };

  return { copyToClipboard, copiedText, contextHolder };
};

export default useClipboard;
