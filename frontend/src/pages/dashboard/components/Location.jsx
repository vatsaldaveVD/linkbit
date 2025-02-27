import { Card } from "antd";
import { Chart } from "react-google-charts";
const Location = () => {
  const data = [
    ["Country", "Clicks"],
    ["Germany", 200],
    ["United States", 300],
    ["Brazil", 400],
    ["Canada", 500],
    ["France", 600],
    ["RU", 700],
  ];

  const options = {
    fontName: "Nunito Sans",
    chartArea: {
      top: 0,
      left: 0,
    },
    tooltip: {
      textStyle: {
        fontName: "Nunito Sans",
        fontSize: 13,
      },
    },
  };

  return (
    <Card title="LOCATION" variant="borderless" style={{ height: "100%" }}>
      <Chart
        chartEvents={[
          {
            eventName: "select",
            callback: ({ chartWrapper }) => {
              const chart = chartWrapper.getChart();
              const selection = chart.getSelection();
              if (selection.length === 0) return;
              const region = data[selection[0].row + 1];
              console.log("Selected : " + region);
            },
          },
        ]}
        chartType="GeoChart"
        width="100%"
        height="300px"
        data={data}
        options={options}
      />
    </Card>
  );
};

export default Location;
