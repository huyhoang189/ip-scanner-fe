import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <Result
      // style={{ color: "#fff !important" }}
      status="404"
      title="404"
      subTitle="Xin lỗi, trang không tồn tại!"
      extra={
        <Button type="primary" onClick={() => navigate(-1)}>
          Quay lại
        </Button>
      }
    />
  );
};

export default NotFound;
