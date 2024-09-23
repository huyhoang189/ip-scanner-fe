import { useDispatch, useSelector } from "react-redux";
import settingSlice from "../../toolkits/settings/slice";
import { useEffect, useRef, useState } from "react";
import { ContentWrapper } from "../../assets/styles/contentWrapper.style";
import CustomBreadcrumb from "../../components/breadcrumb";
import CustomeTable from "../../components/Table/table";
import { UpdateButton } from "../../components/Button";
import { Card, Progress, Space, Tag } from "antd";
import ModalItem from "./modal";
import { useNavigate } from "react-router-dom";

import { PageBodyWrapper } from "../../assets/styles/pageBodyWrapper.style";

const pageHeader = {
  breadcrumb: [
    {
      title: "Trang chủ",
      href: "/",
    },
    {
      title: "Quản lý phiên quét",
    },
    {
      title: "Cấu hình tham số",
    },
  ],
};

const baseColumns = [
  {
    title: "STT",
    dataIndex: "index",
    key: "index",
    align: "center",
    width: 50,
  },
  {
    title: "SettingKey",
    dataIndex: "SettingKey",
    key: "SettingKey",
    align: "center",
  },
  {
    title: "SettingValue",
    dataIndex: "SettingValue",
    key: "SettingValue",
    align: "center",
  },
  {
    title: "Description",
    dataIndex: "Description",
    key: "Description",
    align: "center",
  },
];

const Setting = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { settings, isLoading, count, pageNumber, pageSize } = useSelector(
    (state) => state.settings
  );

  const [keyword, setKeyword] = useState("");

  const handleModal = (_item) => {
    dispatch(settingSlice.actions.toggleModal(_item));
  };

  const columns = [
    ...baseColumns,
    {
      title: "Công cụ",
      key: "tool",
      align: "center",
      width: 140,
      render: (text, record) => (
        <Space
          direction="horizontal"
          style={{ width: "100%", justifyContent: "center" }}
        >
          <UpdateButton onClick={() => handleModal(record)} />
        </Space>
      ),
    },
  ];

  //side effect
  useEffect(() => {
    dispatch(settingSlice.actions.getSettings({}));
  }, [dispatch, keyword]);

  return (
    <ContentWrapper>
      <CustomBreadcrumb items={pageHeader.breadcrumb} />

      <PageBodyWrapper>
        <CustomeTable
          data={settings}
          columns={columns}
          isLoading={isLoading}
          pagination={false}
          showHeader={false}
        />

        <ModalItem />
      </PageBodyWrapper>
    </ContentWrapper>
  );
};

export default Setting;
