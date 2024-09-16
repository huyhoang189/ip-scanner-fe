import { Line } from "@ant-design/plots";

export default function LineChart_v2({ data }) {
  return (
    <Line
      data={data}
      xField={"date"}
      yField={"count"}
      // label={{ textBaseline: "bottom" }}
      style={{ lineWidth: 2 }}
      theme="academy"
      point={{ shapeField: "square", sizeField: 2 }}
      seriesField={"division"}
    />
  );
}
