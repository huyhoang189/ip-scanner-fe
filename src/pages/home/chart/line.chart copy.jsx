import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const LineChart_v2 = ({ data, width }) => {
  return (
    <LineChart
      width={width - 100}
      height={400}
      data={data}
      margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 10,
      }}
    >
      <CartesianGrid strokeDasharray="5 5" />
      <XAxis dataKey="date" height={60} tick={<CustomizedAxisTick />} />
      <YAxis />
      <Tooltip />
      <Legend />

      <Line
        // type="monotone"
        dataKey="count"
        stroke="#007bff"
        label={<CustomizedLabel />}
        name="Số lượng dải IP"
      />
    </LineChart>
  );
};

export default LineChart_v2;

const CustomizedLabel = (props) => {
  const { x, y, stroke, value } = props;

  return (
    <text x={x} y={y} dy={-10} fill={stroke} fontSize={10} textAnchor="middle">
      {value}
    </text>
  );
};

const CustomizedAxisTick = (props) => {
  const { x, y, stroke, payload } = props;

  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={14}
        textAnchor="end"
        fill="#666"
        transform="rotate(-35)"
      >
        {payload.value}
      </text>
    </g>
  );
};
