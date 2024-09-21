import { Flex, Image, Menu, Space, theme, Typography } from "antd";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { HeaderWrapper } from "./style";
const Header = () => {
  const { token } = theme.useToken();
  const navigate = useNavigate();
  const onClickSelectItem = (e) => {
    const url = e?.keyPath.reverse().join("\\");
    navigate(url);
  };

  return (
    <HeaderWrapper
      style={{
        backgroundColor: token.colorBgHeader,

        height: 60,
        width: "100%",
        padding: "0 10px",
      }}
      align="center"
      justify="space-between"
    >
      <Space>
        <Image src={logo} width={40} preview={false} />
        <Typography.Text
          style={{
            color: "#fff",
            fontSize: 19,
            fontWeight: "bold",
          }}
        >
          HỆ THỐNG GIÁM SÁT IP TRÊN ĐỊA BÀN
        </Typography.Text>
      </Space>
      {/* <Space>
        <Menu
          selectedKeys={window.location.pathname.split("/")[1]}
          onClick={onClickSelectItem}
          mode="horizontal"
          theme={"dark"}
          style={{ width: 650 }}
          items={[
            {
              key: "",
              label: "Trang chủ",
            },

            {
              key: "sessions",
              label: "Quản lý phiên quét",
            },

            {
              key: "ipranges",
              label: "Quản lý dải IP",
            },
            {
              key: "statistics",
              label: "Thống kê, báo cáo",
              children: [
                {
                  key: "department",
                  label: "Thống kê danh mục đơn vị",
                },
                {
                  key: "ipranges",
                  label: "Thống kê dải địa chỉ IP",
                },
                {
                  key: "iprange-identified",
                  label: "Thống kê dải IP đã định danh",
                },
                {
                  key: "iprange-unidentified",
                  label: "Thống kê dải IP chưa định danh",
                },
                {
                  key: "sessions",
                  label: "Thống kê nhật ký phiên quét",
                },
              ],
            },

            {
              key: "systems",
              label: "Quản lý hệ thống",
              children: [
                {
                  key: "departments",
                  label: "Danh sách đơn vị",
                },
                {
                  key: "users",
                  label: "Danh sách tài khoản",
                },
              ],
            },
          ]}
        />
      </Space> */}
    </HeaderWrapper>
  );
};

export default Header;
