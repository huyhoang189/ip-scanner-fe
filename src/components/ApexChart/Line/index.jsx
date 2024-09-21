import React, { Component } from "react";
import Chart from "react-apexcharts";

export default function ApexLine({ data }) {
  console.log(data);
  const options = {
    chart: {
      id: "basic-bar",
    },
    xaxis: {
      categories: [...data?.map((e) => e?.date)],
    },
    stroke: {
      curve: "smooth",
    },
    // colors: ["#2E93fA"],
    // fill: {
    //   type: "gradient",
    // },

    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        gradientToColors: ["#2E93fA"],
        shadeIntensity: 1,
        type: "horizontal",
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100, 100, 100],
      },
    },
  };
  const series = [
    {
      name: "Số lượng",
      data: [...data?.map((e) => e?.count)],
    },
  ];
  return (
    <Chart
      options={options}
      series={series}
      type="line"
      width="100%"
      height={400}
    />
  );
}
