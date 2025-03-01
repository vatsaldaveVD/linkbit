import { Button, ConfigProvider, Empty, Flex, Input, Table } from "antd";
import { ListFilter, Search, Trash2, Plus } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import UiModal from "../../../shared/components/ui-modal/UiModal";
import CreateShortenLinkForm from "../components/CreateShortenLinkForm";

const UrlShortnerList = ({ columns, dataSource }) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleOpen = () => setIsModalOpen(true);
  const handleClose = () => setIsModalOpen(false);
  const handleSave = () => {
    handleClose();
  };

  const renderEmpty = () => (
    <Empty image="/no-data.png" description="No Data">
      <Button type="primary" onClick={handleOpen} icon={<Plus />}>
        Create Short URL
      </Button>
    </Empty>
  );

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const hasSelected = selectedRowKeys.length > 0;

  return (
    <>
      <Flex gap="middle" vertical>
        <Flex align="center" gap="middle">
          <Flex align="center" gap="middle">
            <Button icon={<ListFilter size={18} />} />
            <Input
              size="large"
              placeholder="Search Short URL Slug and Tag"
              prefix={<Search size={18} />}
              style={{ width: 280 }}
            />
          </Flex>
          {hasSelected && (
            <Flex align="center" gap="middle">
              <span>
                <strong>
                  {selectedRowKeys.length} item
                  {selectedRowKeys.length > 1 ? "s" : ""}
                </strong>{" "}
                Selected
              </span>
              <Button
                danger
                ghost
                onClick={() => console.log(selectedRowKeys)}
                icon={<Trash2 size={18} />}
              />
            </Flex>
          )}
        </Flex>
        <ConfigProvider renderEmpty={renderEmpty}>
          <Table
            rowSelection={rowSelection}
            columns={columns.map(({ title, ...col }) => ({
              title: title.toUpperCase(),
              ...col,
            }))}
            dataSource={dataSource}
          />
        </ConfigProvider>
      </Flex>

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

export default UrlShortnerList;
