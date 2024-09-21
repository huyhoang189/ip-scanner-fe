import React from "react";
import Chart from "react-apexcharts";

const PieChart = ({ data }) => {
  const options = {
    chart: {
      width: "100%",
      height: "100%",
      type: "pie",
    },
    labels: ["Định danh", "Chưa định danh"],
    series: [data?.IpRangeCount, data?.UnIdentifyIpRangeCount],
    legend: {
      show: false,
    },
    dataLabels: {
      formatter(val, opts) {
        const name = opts.w.globals.labels[opts.seriesIndex];
        return [name, val.toFixed(1) + "%"];
      },
    },
    grid: {
      padding: {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
      },
    },
    theme: {
      monochrome: {
        enabled: true,
      },
    },
    plotOptions: {
      pie: {
        dataLabels: {
          offset: -5,
        },
      },
    },
  };

  return (
    <Chart
      options={options}
      series={options?.series}
      type="pie"
      width={"100%"}
    />
  );
};

export default PieChart;
