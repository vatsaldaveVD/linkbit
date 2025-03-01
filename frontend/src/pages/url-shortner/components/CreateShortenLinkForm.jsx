import { Button, Form, Input } from "antd";
import { Copy } from "lucide-react";
import useClipboard from "../../../shared/utils/hooks/useClipboard";

const CreateShortenLinkForm = () => {
  const prefixUrl = "link.it/";
  const [form] = Form.useForm();
  const { copyToClipboard, contextHolder } = useClipboard();

  const copyShortLink = () => {
    copyToClipboard(prefixUrl + form.getFieldValue("shortUrl"));
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
              <Button
                onClick={copyShortLink}
                type="text"
                size="small"
                icon={<Copy size={16} cursor="pointer" />}
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
