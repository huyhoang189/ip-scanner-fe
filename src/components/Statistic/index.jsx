import { Col, Row } from "antd";
import CardView from "./card";

const StatisticView = ({ data }) => {
  const width = (100 - 2) / data?.length;
  return (
    <Row
      style={{
        marginBottom: 10,
      }}
      gutter={10}
    >
      {data.map((e, i) => (
        <Col span={6} style={{ width: "100%" }}>
          <CardView item={e} width={"100%"} key={i} />
        </Col>
      ))}
    </Row>
  );
};

export default StatisticView;
