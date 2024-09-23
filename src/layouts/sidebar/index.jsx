import { Flex, Image, Menu, Typography, Layout, theme, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import appSlice from "../../toolkits/App/slice.js";
import { useNavigate } from "react-router-dom";
import { SiderWrapper } from "./style.js";
import { useState } from "react";
import {
  CloudServerOutlined,
  ContactsOutlined,
  FileDoneOutlined,
  HomeOutlined,
  LeftOutlined,
  RightOutlined,
  ScanOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import logo from "../../assets/logo.png";
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
    key: "contacts",
    label: "Danh bạ",
    icon: <ContactsOutlined />,
  },
  {
    key: "reports",
    label: "Thống kê, báo cáo",
    icon: <FileDoneOutlined />,
    children: [
      {
        key: "reports-ipranges",
        label: "Thống kê dải địa chỉ IP (Scan)",
      },
      {
        key: "reports-ipranges/IDENTIFIED",
        label: "Thống kê dải IP đã định danh (Scan)",
      },
      {
        key: "reports-ipranges/UNIDENTIFIED",
        label: "Thống kê dải IP chưa định danh (Scan)",
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
      {
        key: "systems-schedules",
        label: "Lập lịch hệ thống",
      },
      {
        key: "systems-settings",
        label: "Cấu hình hệ thống",
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
  const { item } = useSelector((state) => state.auths);
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

  let router;

  if (item?.Permission !== "ADMIN") {
    router = publicRouter.filter((item) => item.key !== "systems");
  } else router = publicRouter;

  return (
    <SiderWrapper
      style={{
        backgroundColor: token?.colorBgBase,
        border: "1px solid #d6d9dc",
      }}
      collapsed={menuCollapse}
      collapsedWidth="60"
    >
      <Flex vertical align="center">
        <Image
          src={logo}
          width={40}
          preview={false}
          style={{ margin: "10px 0px" }}
        />
        <Menu
          items={router}
          mode="inline"
          onClick={onClickSelectItem}
          style={{ width: "100%" }}
          selectedKeys={
            location.pathname.split("/").filter(Boolean).length > 0
              ? location.pathname.split("/").filter(Boolean)
              : [""]
          }
          openKeys={stateOpenKeys}
          onOpenChange={onOpenChange}
        />
      </Flex>
    </SiderWrapper>
  );
};

export default Siderbar;
