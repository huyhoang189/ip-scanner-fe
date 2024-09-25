import { Breadcrumb, Button, Divider, Flex, Row, Space } from "antd";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCurrentVietnameseTime } from "../utils/time.js";
import { ReloadOutlined } from "@ant-design/icons";

// eslint-disable-next-line react/prop-types
const CustomBreadcrumb = ({ items = [] }) => {
  const [time, setTime] = useState(getCurrentVietnameseTime());

  const refreshData = () => {
    location.reload();
  };

  useEffect(() => {
    // setTime(getCurrentVietnameseTime())
    const interval = setInterval(() => {
      setTime(getCurrentVietnameseTime());
    }, 1000);
    return () => clearInterval(interval);
  }, [time]);

  return (
    <Row style={{ width: "100%", marginBottom: 10 }}>
      <Flex align="center" justify="space-between" style={{ width: "100%" }}>
        <Breadcrumb style={{ margin: "auto", marginLeft: 0 }}>
          {items.map((e, i) => (
            <Breadcrumb.Item key={i + 1}>
              {i + 1 === items.length ? (
                <span style={{ fontWeight: "bold" }}>{e?.title}</span>
              ) : !e?.href ? (
                <span>{e?.title}</span>
              ) : (
                <Link to={e?.href || "#"}>{e?.title}</Link>
              )}
            </Breadcrumb.Item>
          ))}
        </Breadcrumb>
        <Space>
          <Button onClick={refreshData} icon={<ReloadOutlined />}>
            Tải lại dữ liệu
          </Button>
          {time}
        </Space>
      </Flex>

      {/* <Divider style={{ marginTop: 10, marginBottom: 10 }} /> */}
    </Row>
  );
};

export default CustomBreadcrumb;
