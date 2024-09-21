import { Layout, theme, Menu, Flex, Divider } from "antd";
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
        backgroundColor: "#fafafb",
      }}
    >
      <Siderbar />
      <Layout>
        <Header />
        <Content
          style={{
            padding: 10,
            width: "100%",
          }}
        >
          <Outlet />
        </Content>
        <Footer
          style={{
            textAlign: "center",
            // fontWeight: "bold",
            padding: 20,
            // backgroundColor: token.colorBgHeader,
            // color: "#fff",
          }}
        >
          <Divider style={{ marginTop: 10, marginBottom: 10 }} />
          <Flex
            justify="space-between"
            align="center"
            style={{ width: "100%" }}
          >
            <span>
              ©{new Date().getFullYear()} Hệ thống quản lý giám sát dải IP trên
              địa bàn phía Nam
            </span>
            <span>Cụm 23 - Trung tâm 286 - Bộ Tư lệnh 86</span>
          </Flex>
        </Footer>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
