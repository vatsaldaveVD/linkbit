import { Button, Dropdown, Flex, Tag } from "antd";
import {
  Copy,
  EllipsisVertical,
  ExternalLink,
  Pencil,
  Plus,
} from "lucide-react";
import { useState } from "react";
import UiModal from "../../shared/components/ui-modal/UiModal";
import UiToolbar from "../../shared/components/ui-toolbar/UiToolbar";
import CreateShortenLinkForm from "./components/CreateShortenLinkForm";
import UrlShortnerList from "./components/UrlShortnerList";
import useClipboard from "../../shared/utils/hooks/useClipboard";
import { useNavigate } from "react-router";

const UrlShortner = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { copyToClipboard, contextHolder } = useClipboard();
  const navigate = useNavigate();

  const handleOpen = () => setIsModalOpen(true);
  const handleClose = () => setIsModalOpen(false);
  const handleSave = () => {
    handleClose();
  };

  const copyShortLink = (record) => {
    copyToClipboard(record.shortUrl);
  };

  const columns = [
    {
      title: "Long URL",
      dataIndex: "longUrl",
    },
    {
      title: "Short URL",
      dataIndex: "shortUrl",
      render: (_, record) => {
        return (
          <Flex align="center" gap={8}>
            <span>{record.shortUrl}</span>
            <Copy
              size={18}
              cursor="pointer"
              onClick={() => copyShortLink(record)}
            />
          </Flex>
        );
      },
    },
    {
      title: "No. of Clicks",
      dataIndex: "clicks",
    },
    {
      title: "Tags",
      dataIndex: "tags",
      render: (tags) => (
        <span>
          {tags.map((tag) => {
            return <Tag key={tag}>{tag}</Tag>;
          })}
        </span>
      ),
    },
    {
      title: "Action",
      dataIndex: "analytics",
      render: (_, record) => (
        <Button
          type="text"
          size="small"
          icon={<ExternalLink size={18} />}
          iconPosition="end"
          onClick={() => navigate(`/url-shortner/${record.analytics}`)}
        >
          Analytics
        </Button>
      ),
    },
    {
      title: "Action",
      dataIndex: "",
      render: (_, record) => (
        <Button
          size="middle"
          onClick={() => console.log(record.key)}
          icon={<Pencil size={20} style={{ display: "block" }} />}
        />
      ),
    },
  ];

  const dataSource = Array.from({
    length: 0,
  }).map((_, i) => ({
    key: i,
    longUrl: `app.startinfinity.com/b/7KN${i}`,
    shortUrl: `link.joy/hkyof`,
    clicks: 20,
    tags: ["Designing"],
    analytics: `hkyof-${i}`,
  }));

  return (
    <>
      {contextHolder}

      <UrlShortnerList columns={columns} dataSource={dataSource} />
    </>
  );
};

export default UrlShortner;
