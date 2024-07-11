import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";

export default function SessionBarChart({ width, data }) {
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

  return (
    <BarChart
      width={width - 10}
      height={300}
      series={[
        {
          data: dataSource.map((e) => e?.count),
          label: "Số phiên",
          id: "uvId",
        },
      ]}
      xAxis={[{ data: dataSource.map((e) => e?.name), scaleType: "band" }]}
      slotProps={{
        legend: {
          hidden: true,
        },
      }}
      grid={{ vertical: true, horizontal: true }}
    />
  );
}
