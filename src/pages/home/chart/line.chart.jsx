import * as React from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import { axisClasses } from "@mui/x-charts";

const chartSetting = {
  sx: {
    // [`.${axisClasses.left} .${axisClasses.label}`]: {
    //   transform: "rotate(-90deg) translate(0px, -20px)",
    // },
    [`.${axisClasses.bottom} .${axisClasses.tickLabel}`]: {
      transform: "rotate(-10deg)",
    },
  },
};
export default function LineChart_v2({ data, width }) {
  console.log(data);
  return (
    <LineChart
      width={width - 100}
      height={400}
      series={[{ data: data.map((e) => e?.count), label: "Số lượng dải IP " }]}
      xAxis={[{ scaleType: "point", data: data.map((e) => e?.date) }]}
      slotProps={{
        legend: {
          // hidden: true,
        },
      }}
      {...chartSetting}
      grid={{ vertical: true, horizontal: true }}
    />
  );
}
