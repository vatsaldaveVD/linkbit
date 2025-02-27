import { Card } from "antd";
import { Chart } from "react-google-charts";

const Device = () => {
  const data = [
    ["Device", "Count"],
    ["Phone", 7],
    ["Tablet", 4],
    ["Desktop", 10],
  ];

  const options = {
    pieHole: 0.55,
    is3D: false,
    pieSliceText: "none",
    fontName: "Nunito Sans",
    fontSize: 13,
    chartArea: {
      top: 0,
      height: 250,
    },
    legend: {
      position: "bottom",
      textStyle: {
        bold: true,
      },
    },
    colors: ["#FFC857", "#F87060", "#227C9D"],
  };

  return (
    <Card title="DEVICE" variant="borderless" style={{ height: "100%" }}>
      <Chart
        chartType="PieChart"
        width="100%"
        height="300px"
        data={data}
        options={options}
      />
    </Card>
  );
};

export default Device;
