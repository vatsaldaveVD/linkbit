import { useEffect, useState } from "react";
import { Button, Typography } from "antd";
import { fetchMessage } from "../services/api";
import Master from "./core/Master";

const { Title, Paragraph } = Typography;
function App() {
  return <Master />;
}
export default App;



