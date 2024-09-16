import { BarChartOutlined } from "@ant-design/icons";
import { Card, Flex, Typography } from "antd";

const CardView = ({ item, width }) => {
  return (
    <Card
      style={{
        width: `${width}%`,
        height: 100,

        // backgroundColor: "#FF8042",
      }}
    >
      <Flex vertical={false} align="center">
        {item?.icon}
        <Flex vertical>
          <Typography.Text style={{ fontWeight: "bold" }}>
            {item?.title}
          </Typography.Text>
          <Typography.Text> {item?.count}</Typography.Text>
        </Flex>
      </Flex>
      <Typography.Text>{item?.description}</Typography.Text>
    </Card>
  );
};

export default CardView;
