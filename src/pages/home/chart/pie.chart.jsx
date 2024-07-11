import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
const PieChartCustome = ({ data, size }) => {
  const chartData = [
    {
      id: 0,
      value: data.IpRangeCount,
      label: "Dải địa chỉ đã định danh",
      color: "#36BA98",
    },
    {
      id: 1,
      value: data.UnIdentifyIpRangeCount,
      label: "Dải địa chỉ chưa được định danh",
      color: "#FF8042",
    },
  ];

  return (
    <PieChart
      series={[
        {
          data: chartData,
        },
      ]}
      height={400}
      slotProps={{
        legend: {
          direction: "row",
          position: { vertical: "bottom", horizontal: "middle" },
          // top: 200,
        },
      }}
      margin={{ top: 5, bottom: 65, left: 30, right: 30 }}
    />
  );
};

export default PieChartCustome;
