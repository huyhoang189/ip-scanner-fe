import { Layout, theme, Menu } from "antd";
import Header from "./header";
import { Outlet } from "react-router-dom";
import useWindowSize from "../hooks/useWindowSize";
import Siderbar from "./sidebar";

const { Content, Footer } = Layout;
const MainLayout = () => {
  const { token } = theme.useToken();
  const { height } = useWindowSize();
  return (
    <Layout
      style={{
        margin: 0,
        minHeight: height,
        backgroundColor: token.colorBgBase,
      }}
    >
      <Header />
      <Layout>
        <Siderbar />
        <Content
          style={{
            padding: 10,
            width: "100%",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
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
