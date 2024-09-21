import { BarChartOutlined } from "@ant-design/icons";
import { Card, Flex, Typography } from "antd";
import "./card.style.css";
import { useNavigate } from "react-router-dom";
const CardView = ({ item, width }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(item?.path);
  };
  return (
    <Card
      style={{
        width: `${width}%`,
        height: 100,
      }}
      className="card-view hover-card"
      onClick={() => handleClick()}
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
