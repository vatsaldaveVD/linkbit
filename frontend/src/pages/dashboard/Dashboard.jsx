import { Row, Col, Typography } from "antd";
import Statistics from "./components/Statistics";
import Location from "./components/Location";
import Device from "./components/Device";
const Dashboard = () => {
  return (
    <>
      <Row gutter={16}>
        <Col span={8}>
          <Statistics />
        </Col>
        <Col span={8}>
          <Location />
        </Col>
        <Col span={8}>
          <Device />
        </Col>
      </Row>
    </>
  );
};

export default Dashboard;
