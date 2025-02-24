import { useEffect, useState } from "react";
import { Button, Typography } from "antd";
import { fetchMessage } from "../services/api";

const { Title, Paragraph } = Typography;

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchMessage().then((data) => setMessage(data.message));
  }, []);

  return (
    <div style={{ padding: "50px", textAlign: "center" }}>
      <Title>React + Express Boilerplate</Title>
      <Paragraph>{message}</Paragraph>
      <Button type="primary">Click Me</Button>
    </div>
  );
}

export default App;
