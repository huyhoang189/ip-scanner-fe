import { Layout, theme, Menu } from "antd";
import Header from "./header";
import { Outlet } from "react-router-dom";
import useWindowSize from "../hooks/useWindowSize";

const { Content, Footer } = Layout;
const MainLayout = () => {
  const { token } = theme.useToken();
  const { height } = useWindowSize();
  return (
    <Layout
      style={{
        margin: 0,
        // minHeight: 600,
        minHeight: height - 5,
        backgroundColor: token.colorBgHome,
      }}
    >
      <Header />
      <Content
        style={{
          // margin: 10,
          padding: 10,
          // background: "#FFFFFF",
          minHeight: "calc(100% - 60px - 70px)",
          // border: `solid 1px ${token.colorBorder}`,
          // borderRadius: 3,
        }}
      >
        <Outlet />
      </Content>
      <Footer
        style={{
          textAlign: "center",
          backgroundColor: token.colorBgHeader,
          color: "#fff",
        }}
      >
        ©{new Date().getFullYear()} Hệ thống quản lý giám sát dải IP trên địa
        bàn phía Nam
      </Footer>
    </Layout>
  );
};

export default MainLayout;
