import { Flex } from "antd";
import CardView from "./card";

const StatisticView = ({ data }) => {
  const width = (100 - 2) / data?.length;
  return (
    <Flex
      style={{ width: "100%", marginBottom: 10 }}
      vertical={false}
      justify="space-between"
      align="center"
    >
      {data.map((e, i) => (
        <CardView item={e} width={width} key={i} />
      ))}
    </Flex>
  );
};

export default StatisticView;
