import { Flex, Image, Menu, Space, theme, Typography } from "antd";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { HeaderWrapper } from "./style";
import appSlice from "../../toolkits/App/slice.js";
import { MenuOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import User from "./user.jsx";
import authSlice from "../../toolkits/auth/slice.js";
import { useEffect } from "react";
const Header = () => {
  // const { token } = theme.useToken();
  // const navigate = useNavigate();

  const dispatch = useDispatch();

  const { item } = useSelector((state) => state.auths);
  const collapseSiderbar = () => {
    dispatch(appSlice.actions.toggleSiderbar());
  };

  useEffect(() => {
    dispatch(authSlice.actions.checkAuthentication());
  }, [window.location.pathname]);

  return (
    <HeaderWrapper
      style={{
        backgroundColor: "#fff",
        height: 60,
        width: "100%",
        padding: "0 10px",
        borderBottom: "1px solid #d6d9dc",
      }}
      align="center"
      justify="space-between"
    >
      <Space>
        <MenuOutlined
          onClick={collapseSiderbar}
          style={{ fontSize: 20, marginRight: 10 }}
        />
        <Typography.Text
          style={{
            // color: "#fff",
            fontSize: 19,
            fontWeight: 900,
            textTransform: "uppercase",
          }}
        >
          Hệ thống quản lý mạng máy tính quân sự trực tuyến
        </Typography.Text>
      </Space>
      <User
        logout={() => dispatch(authSlice.actions.logout())}
        sessionUser={{
          full_name: item?.FullName,
          groups: item?.Permission,
        }}
      />
    </HeaderWrapper>
  );
};

export default Header;
