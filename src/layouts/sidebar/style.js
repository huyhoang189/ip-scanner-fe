import styled from "styled-components";
import { Layout } from "antd";
const { Sider } = Layout;
export const SiderWrapper = styled(Sider)`
  .ant-menu-light.ant-menu-root.ant-menu-inline {
    border-inline-end: 0px;
  }

  .ant-menu-light.ant-menu-root.ant-menu-vertical {
    border-inline-end: 0px;
  }

  .ant-layout-sider-children {
    border-right: 0px solid #d6d9dc;
  }
`;
