import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";

const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
const xLabels = [
  "Page A",
  "Page B",
  "Page C",
  "Page D",
  "Page E",
  "Page F",
  "Page G",
];

export default function SimpleBarChart({ width }) {
  return (
    <BarChart
      width={width - 10}
      height={300}
      series={[{ data: uData, label: "uv", id: "uvId" }]}
      xAxis={[{ data: xLabels, scaleType: "band" }]}
      slotProps={{
        legend: {
          hidden: true,
        },
      }}
    />
  );
}
