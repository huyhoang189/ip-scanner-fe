import { Flex, Image, Menu, Space, theme, Typography } from "antd";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { HeaderWrapper } from "./style";
import appSlice from "../../toolkits/App/slice.js";
import { MenuOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import User from "./user.jsx";
const Header = () => {
  // const { token } = theme.useToken();
  // const navigate = useNavigate();
  const dispatch = useDispatch();

  const collapseSiderbar = () => {
    dispatch(appSlice.actions.toggleSiderbar());
  };

  return (
    <HeaderWrapper
      style={{
        backgroundColor: "#fff",
        height: 60,
        width: "100%",
        padding: "0 10px",
        borderBottom: "1px solid #d6d9dc",
        // borderLeft: "1px solid #d6d9dc",
      }}
      align="center"
      justify="space-between"
    >
      <Space>
        {/* <Image src={logo} width={40} preview={false} /> */}
        <MenuOutlined
          onClick={collapseSiderbar}
          style={{ fontSize: 20, marginRight: 10 }}
        />
        <Typography.Text
          style={{
            // color: "#fff",
            fontSize: 19,
            fontWeight: 900,
          }}
        >
          HỆ THỐNG GIÁM SÁT DẢI ĐỊA CHỈ IP TRÊN ĐỊA BÀN
        </Typography.Text>
      </Space>
      <User />
    </HeaderWrapper>
  );
};

export default Header;
