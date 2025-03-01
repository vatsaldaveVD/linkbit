import { Card } from "antd";
import UiPieChart from "../../../shared/components/ui-piechart/UiPieChart";

const Device = () => {
  const data = [
    ["Timezone", "Count"],
    ["GMT -04", 40],
    ["UTC +0", 15],
    ["GMT +08", 10],
    ["GMT +5.5", 5],
    ["UTC -04", 16],
    ["UTC -05", 10],
    ["UTC +03", 20],
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
    colors: [
      "#227C9D",
      "#8BBF9F",
      "#FFC857",
      "#F87060",
      "#8F3985",
      "#FBE2C4",
      "#413C58",
    ],
  };

  return (
    <Card title="Timezone" variant="borderless" style={{ height: "100%" }}>
      <UiPieChart data={data} options={options}></UiPieChart>
    </Card>
  );
};

export default Device;
