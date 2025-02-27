import { Button, Card, Typography } from "antd";
import { Plus } from "lucide-react";
import { useState } from "react";
import UiModal from "../../shared/components/ui-modal/UiModal";
import CreateShortenLinkForm from "./components/CreateShortenLinkForm";
import { Navigate } from "react-router";

const UrlShortner = () => {
  const { Title, Paragraph } = Typography;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpen = () => setIsModalOpen(true);
  const handleClose = () => setIsModalOpen(false);
  const handleSave = () => {
    handleClose();
  };
  return (
    <>
      <Card variant="borderless">
        <Typography>
          <Title level={3}>
            No URL Retargeting for this <br /> account here yet
          </Title>
          <Paragraph>
            Some short text which explains how the <br />
            user will benefit from thisfeature.
          </Paragraph>
          <Button type="primary" onClick={handleOpen} icon={<Plus />}>
            Create Short URL
          </Button>
        </Typography>
      </Card>
      <UiModal
        isOpen={isModalOpen}
        onClose={handleClose}
        title="Create Shorten Campaign Link"
        okText="Save"
        onOk={handleSave}
        onCancel={handleClose}
      >
        <CreateShortenLinkForm />
      </UiModal>
    </>
  );
};

export default UrlShortner;
