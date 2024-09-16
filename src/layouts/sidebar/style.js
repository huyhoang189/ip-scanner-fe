import styled from "styled-components";
import { Layout } from "antd";
const { Sider } = Layout;
export const SiderWrapper = styled(Sider)`
  .ant-menu-light.ant-menu-root.ant-menu-inline {
    border-inline-end: 0px;
  }

  .ant-layout-sider-children {
    border-right: 0px solid #d6d9dc;
  }

  .ant-menu > li > span {
    font-weight: 600;
  }

  .ant-menu > li > div > span {
    font-weight: 600;
  }

  .ant-menu-dark .ant-menu-submenu-selected > .ant-menu-submenu-title {
    background-color: #004d4d;
  }

  .trigger-sider {
    background-color: #004d4d;
  }

  .trigger-sider:hover {
    background-color: #008080;
  }
`;
