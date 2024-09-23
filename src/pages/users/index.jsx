import { useDispatch, useSelector } from "react-redux";
import userSlice from "../../toolkits/users/slice";
import { useEffect, useRef, useState } from "react";
import { ContentWrapper } from "../../assets/styles/contentWrapper.style";
import CustomBreadcrumb from "../../components/breadcrumb";
import CustomeTable from "../../components/Table/table";
import Header from "../../components/Table/header";
import TextInput from "../../components/Form/textinput";
import {
  CreateButton,
  DeleteButton,
  DetailButton,
  UpdateButton,
} from "../../components/Button";
import { Card, Progress, Space, Tag } from "antd";
import ModalItem from "./modal";
import { useNavigate } from "react-router-dom";
import { ACTION_NAME, SCAN_MODE } from "../../utils/common";
import {
  CaretRightOutlined,
  PlayCircleOutlined,
  PlaySquareOutlined,
  StopOutlined,
} from "@ant-design/icons";
import { convertTime } from "../../utils/time";
import { PageBodyWrapper } from "../../assets/styles/pageBodyWrapper.style";
import { render } from "react-dom";

const pageHeader = {
  breadcrumb: [
    {
      title: "Trang chủ",
      href: "/",
    },
    {
      title: "Quản trị hệ thống",
    },
    {
      title: "Người dùng hệ thống",
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
    title: "Tên đầy đủ",
    dataIndex: "FullName",
    key: "FulName",
    align: "center",
  },
  {
    title: "Tên tài khoản",
    dataIndex: "UserName",
    key: "UserName",
    align: "center",
  },
  {
    title: "Lần đăng nhập gần nhất",
    dataIndex: "LatestLogin",
    key: "LatestLogin",
    align: "center",
    render: (text, record) => {
      return convertTime(text);
    },
  },
  {
    title: "Nhóm người dùng",
    dataIndex: "Permission",
    key: "Permission",
    align: "center",
  },
  {
    title: "Trạng thái",
    dataIndex: "IsActive",
    key: "IsActive",
    align: "center",
    render: (text, record) => {
      return record?.IsActive == "ACTIVE" ? (
        <Tag color="green">Đang hoạt động</Tag>
      ) : (
        <Tag color="red">Đang khoá</Tag>
      );
    },
  },
];

const User = () => {
  const dispatch = useDispatch();

  const { users, isLoading, count, pageNumber, pageSize } = useSelector(
    (state) => state.users
  );

  const [keyword, setKeyword] = useState("");

  const onChangeKeywordInput = (key, event) => {
    setKeyword(event.target.value);
  };

  const handlePaginationChange = (current, pageSize) => {
    dispatch(
      userSlice.actions.getUsers({
        keyword,
        pageSize: pageSize,
        pageNumber: current,
      })
    );
  };

  const handleModal = (_item) => {
    dispatch(userSlice.actions.toggleModal(_item));
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
          <UpdateButton
            icon={
              record?.IsActive == "ACTIVE" ? (
                <StopOutlined style={{ color: "red" }} />
              ) : (
                <CaretRightOutlined style={{ color: "green" }} />
              )
            }
            onClick={() => {
              dispatch(
                userSlice.actions.handleUser({
                  item: {
                    ...record,
                    IsActive:
                      record?.IsActive == "ACTIVE" ? "INACTIVE" : "ACTIVE",
                  },
                  actionName: ACTION_NAME.UPDATE,
                })
              );
            }}
          />
          <UpdateButton onClick={() => handleModal(record)} />
          <DeleteButton
            onConfirm={() => {
              dispatch(
                userSlice.actions.handleUser({
                  item: record,
                  actionName: "DELETE",
                  pageSize: pageSize,
                  pageNumber:
                    record?.index === pageSize * (pageNumber - 1) + 1
                      ? Math.max(pageNumber - 1, 1)
                      : pageNumber,
                })
              );
            }}
          />
        </Space>
      ),
    },
  ];

  //side effect
  useEffect(() => {
    dispatch(
      userSlice.actions.getUsers({
        keyword,
        pageSize: 10,
        pageNumber: 1,
      })
    );
  }, [dispatch, keyword]);

  return (
    <ContentWrapper>
      <CustomBreadcrumb items={pageHeader.breadcrumb} />

      <PageBodyWrapper>
        <CustomeTable
          header={
            <Header>
              <TextInput
                placeholder={"Nhập vào từ khoá tìm kiếm"}
                onChange={onChangeKeywordInput}
                property={"keyword"}
                width={20}
              />
              <CreateButton onClick={() => handleModal(null)} />
            </Header>
          }
          data={users}
          columns={columns}
          isLoading={isLoading}
          pagination={{
            current: pageNumber,
            pageSize: pageSize,
            total: count,
            onChange: handlePaginationChange,
          }}
        />

        <ModalItem />
      </PageBodyWrapper>
    </ContentWrapper>
  );
};

export default User;
