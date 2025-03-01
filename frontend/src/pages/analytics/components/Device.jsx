import { Card } from "antd";
import UiPieChart from "../../../shared/components/ui-piechart/UiPieChart";

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
    <Card title="Device" variant="borderless" style={{ height: "100%" }}>
      <UiPieChart data={data} options={options}></UiPieChart>
    </Card>
  );
};

export default Device;
