import { Flex, Image, Menu, Typography, Layout, theme, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import appSlice from "../../toolkits/App/slice.js";
import { useNavigate } from "react-router-dom";
import { SiderWrapper } from "./style.js";
import { useState } from "react";
import {
  CloudServerOutlined,
  FileDoneOutlined,
  HomeOutlined,
  LeftOutlined,
  RightOutlined,
  ScanOutlined,
  SettingOutlined,
} from "@ant-design/icons";
const { Sider } = Layout;

const publicRouter = [
  {
    key: "",
    label: "Trang chủ",
    icon: <HomeOutlined />,
  },
  {
    key: "sessions",
    label: "Quản lý phiên quét",
    icon: <ScanOutlined />,
  },

  {
    key: "ipranges",
    label: "Quản lý dải IP",
    icon: <CloudServerOutlined />,
  },
  {
    key: "reports",
    label: "Thống kê, báo cáo",
    icon: <FileDoneOutlined />,
    children: [
      {
        key: "statistics-departments",
        label: "Thống kê danh mục đơn vị",
      },
      {
        key: "reports-ipranges",
        label: "Thống kê dải địa chỉ IP",
      },
      {
        key: "reports-ipranges/IDENTIFIED",
        label: "Thống kê dải IP đã định danh",
      },
      {
        key: "reports-ipranges/UNIDENTIFIED",
        label: "Thống kê dải IP chưa định danh",
      },
      {
        key: "reports-sessions",
        label: "Thống kê nhật ký phiên quét",
      },
    ],
  },
  {
    key: "systems",
    label: "Quản lý hệ thống",
    icon: <SettingOutlined />,
    children: [
      {
        key: "systems-departments",
        label: "Danh sách đơn vị",
      },
      {
        key: "systems-users",
        label: "Danh sách tài khoản",
      },
    ],
  },
];

const getLevelKeys = (items1) => {
  const key = {};
  const func = (items2, level = 1) => {
    items2.forEach((item) => {
      if (item.key) {
        key[item.key] = level;
      }
      if (item.children) {
        func(item.children, level + 1);
      }
    });
  };
  func(items1);
  return key;
};
const levelKeys = getLevelKeys(publicRouter);

const Siderbar = () => {
  const { menuCollapse } = useSelector((state) => state.apps);
  const { token } = theme.useToken();

  const [stateOpenKeys, setStateOpenKeys] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onClickSelectItem = (e) => {
    const url = e?.keyPath.reverse().join("\\");
    navigate(url);
  };

  const onOpenChange = (openKeys) => {
    const currentOpenKey = openKeys.find(
      (key) => stateOpenKeys.indexOf(key) === -1
    );
    // open
    if (currentOpenKey !== undefined) {
      const repeatIndex = openKeys
        .filter((key) => key !== currentOpenKey)
        .findIndex((key) => levelKeys[key] === levelKeys[currentOpenKey]);
      setStateOpenKeys(
        openKeys
          // remove repeat key
          .filter((_, index) => index !== repeatIndex)
          // remove current level all child
          .filter((key) => levelKeys[key] <= levelKeys[currentOpenKey])
      );
    } else {
      // close
      setStateOpenKeys(openKeys);
    }
  };

  const collapseSiderbar = () => {
    dispatch(appSlice.actions.toggleSiderbar());
  };

  return (
    <SiderWrapper
      style={{
        backgroundColor: token?.colorBgBase,
        padding: "1px 0",
      }}
      collapsed={menuCollapse}
      breakpoint="lg"
      collapsedWidth="60"
    >
      <Flex vertical justify="space-around" style={{ height: "100%" }}>
        <Menu
          items={publicRouter}
          mode="inline"
          onClick={onClickSelectItem}
          theme="dark"
          style={{ height: "100%" }}
          selectedKeys={
            location.pathname.split("/").filter(Boolean).length > 0
              ? location.pathname.split("/").filter(Boolean)
              : [""]
          }
          openKeys={stateOpenKeys}
          onOpenChange={onOpenChange}
        />
        <div
          className="trigger-sider"
          style={{
            width: "100%",
            textAlign: "center",
          }}
          onClick={collapseSiderbar}
        >
          {menuCollapse ? (
            <RightOutlined style={{ height: 48, color: "#fff" }} />
          ) : (
            <LeftOutlined style={{ height: 48, color: "#fff" }} />
          )}
        </div>
      </Flex>
    </SiderWrapper>
  );
};

export default Siderbar;
