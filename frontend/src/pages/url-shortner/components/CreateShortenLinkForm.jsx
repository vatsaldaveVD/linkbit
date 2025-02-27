import { Form, Input, message } from "antd";
import { Copy } from "lucide-react";

const CreateShortenLinkForm = () => {
  const prefixUrl = "link.it/";
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const copyShortLink = () => {
    navigator.clipboard.writeText(prefixUrl + form.getFieldValue("shortUrl"));
    messageApi.open({
      type: "success",
      content: "Copied to clipboard",
    });
  };

  return (
    <>
      {contextHolder}
      <Form layout="vertical" form={form}>
        <Form.Item label="Paste Long URL" name="longUrl">
          <Input placeholder="https://app.later.com/featurelink/linkinbio" />
        </Form.Item>
        <Form.Item label="Short URL" name="shortUrl">
          <Input
            addonBefore={prefixUrl}
            addonAfter={
              <Copy
                size={16}
                onClick={copyShortLink}
                color="#a1a1a1"
                cursor="pointer"
              />
            }
            placeholder="hkyof"
          />
        </Form.Item>
      </Form>
    </>
  );
};

export default CreateShortenLinkForm;
