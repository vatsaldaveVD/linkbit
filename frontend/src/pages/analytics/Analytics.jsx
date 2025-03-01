import {
    Button,
    Col,
    ConfigProvider,
    Empty,
    Flex,
    Row,
    Table,
    Tag,
    Typography,
  } from "antd";
  import { ChevronLeft, Download, Pencil } from "lucide-react";
  import { useNavigate, useParams } from "react-router";
  import UiToolbar from "../../shared/components/ui-toolbar/UiToolbar";
  import Device from "./components/Device";
  import Location from "./components/Location";
  import Timezone from "./components/Timezone";
  import { useState } from "react";
  
  const Analytics = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [ellipsis, setEllipsis] = useState(true);
  
    const titleStyle = { fontSize: 13, fontWeight: 700, color: "#7A7A7A" };
    const textStyle = {
      fontSize: 15,
      fontWeight: "normal",
      color: "#000",
      width: ellipsis ? 250 : "auto",
    };
  
    const columns = [
      { title: "ID", dataIndex: "id", key: "id", width: 50 },
      { title: "ADDRESS", dataIndex: "address", key: "address", width: 150 },
      { title: "TIME ZONE", dataIndex: "timezone", key: "timezone", width: 100 },
      {
        title: "TIME",
        dataIndex: "time",
        key: "time",
        width: 150,
        render: (text) => {
          const dateObj = new Date(text);
          const formattedDate = new Intl.DateTimeFormat("en-GB", {
            day: "2-digit",
            month: "short",
            year: "2-digit",
          }).format(dateObj);
  
          const formattedTime = new Intl.DateTimeFormat("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          }).format(dateObj);
  
          return (
            <div>
              <span>{formattedDate}</span> <br />
              <span style={{ color: "#7A7A7A" }}>{formattedTime}</span>
            </div>
          );
        },
      },
      { title: "DEVICE", dataIndex: "device", key: "device", width: 100 },
      { title: "PLATFORM", dataIndex: "platform", key: "platform", width: 100 },
      { title: "BROWSER", dataIndex: "browser", key: "browser", width: 100 },
      { title: "VERSION", dataIndex: "version", key: "version", width: 120 },
    ];
  
    const data = Array.from({ length: 20 }, (_, index) => ({
      key: index + 1,
      id: index < 9 ? "0" + (index + 1) : index + 1,
      address: "512 Hickory Hill Dr, Nicholasville, KY, USA",
      timezone: "GMT-4",
      time: "2020-10-28T05:11:00Z",
      device: "Desktop",
      platform: "Linux",
      browser: "Chrome",
      version: "86.0.4240.75",
    }));
  
    const renderEmpty = () => {
      return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="No Data" />;
    };
  
    return (
      <>
        <UiToolbar
          title="Analytics"
          backButton={
            <Button
              type="text"
              size="small"
              icon={<ChevronLeft style={{ display: "block", marginLeft: -7 }} />}
              onClick={() => navigate(-1)}
              style={{
                padding: 0,
                fontSize: 13,
                fontWeight: 700,
                color: "#7A7A7A",
              }}
            >
              URL SHORTNER
            </Button>
          }
          button={
            <Button type="primary" icon={<Download />}>
              Download PDF
            </Button>
          }
        />
  
        <Flex align="center" gap="large" style={{ margin: "20px 0" }}>
          <Typography.Paragraph style={titleStyle}>
            SHORT URL : <span style={textStyle}>link.joy/{id}</span>
          </Typography.Paragraph>
          <Typography.Paragraph style={titleStyle}>
            <Flex align="center" gap={5}>
              LONG URL :{" "}
              <Typography.Text ellipsis={ellipsis} style={textStyle}>
                app.startinfinity.com/b/7KNV91XJZvw
              </Typography.Text>
              <Button size="small" icon={<Pencil size={16} />}></Button>
            </Flex>
          </Typography.Paragraph>
          <Typography.Paragraph style={titleStyle}>
            NO. OF CLICKS : <Tag color="volcano">20</Tag>
          </Typography.Paragraph>
        </Flex>
  
        <Row gutter={20} style={{ marginBottom: 20 }}>
          <Col span={8}>
            <Location />
          </Col>
          <Col span={8}>
            <Device />
          </Col>
          <Col span={8}>
            <Timezone />
          </Col>
        </Row>
  
        <ConfigProvider renderEmpty={renderEmpty}>
          <Table columns={columns} dataSource={data} />
        </ConfigProvider>
      </>
    );
  };
  
  export default Analytics;
  