import { Card, List, Row, Col } from "antd";

const Statistics = () => {
  const data = [
    {
      title: "No. of short links",
      value: 200,
    },
    {
      title: "Total no. of click",
      value: 510,
    },
    {
      title: "Top browser use",
      value: "Chrome",
    },
  ];

  return (
    <Card title="STATISTICS" variant="borderless" style={{ height: "100%" }}>
      <List
        size="small"
        dataSource={data}
        renderItem={(item) => (
          <List.Item style={{ padding: "10px 0" }}>
            <Row style={{ width: "100%" }}>
              <Col span={12}>{item.title}</Col>
              <Col span={12}>{item.value}</Col>
            </Row>
          </List.Item>
        )}
      />
    </Card>
  );
};

export default Statistics;
