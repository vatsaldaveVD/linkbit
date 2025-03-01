import { Card } from "antd";
import { Chart } from "react-google-charts";

const UiPieChart = ({ data, options }) => {

    return (

        <Chart
            chartType="PieChart"
            width="100%"
            height="300px"
            data={data}
            options={options}
        />
    );
};

export default UiPieChart;
