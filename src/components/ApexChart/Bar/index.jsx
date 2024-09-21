import React, { Component } from "react";
import Chart from "react-apexcharts";

export default function ApexBar({ data }) {
  const dataSource = [
    {
      name: "Chưa quét",
      count: data?.NothingSessionCount,
    },
    {
      name: "Đang quét",
      count: data?.ScanningSessionCount,
    },
    {
      name: "Thành công",
      count: data?.SuccessSessionCount,
    },
  ];
  const options = {
    chart: {
      id: "basic-bar",
    },
    stroke: {
      curve: "smooth",
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        borderRadiusApplication: "end",
        horizontal: true,
      },
    },
    dataLabels: {
      enabled: false,
    },

    xaxis: {
      categories: dataSource.map((e) => e?.name),
    },
  };
  const series = [
    {
      name: "Loại",
      data: dataSource.map((e) => e?.count),
    },
  ];
  return (
    <Chart
      options={options}
      series={series}
      type="bar"
      width="100%"
      height={200}
    />
  );
}
