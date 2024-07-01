import { useDispatch, useSelector } from "react-redux";
import sessionSlice from "../../toolkits/sessions/slice";
import scanSlice from "../../toolkits/scans/slice";
import { useEffect, useState } from "react";
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
import { Progress, Space } from "antd";
import ModalItem from "./modal";
import { useNavigate } from "react-router-dom";
import { ACTION_NAME, SCAN_MODE } from "../../utils/common";
import {
  CaretRightOutlined,
  PlayCircleOutlined,
  PlaySquareOutlined,
} from "@ant-design/icons";
import { render } from "react-dom";
const pageHeader = {
  breadcrumb: [
    {
      title: "Trang chủ",
      href: "/",
    },
    {
      title: "Quản lý phiên quét",
    },
  ],
};

const baseColumns = [
  {
    title: "STT",
    dataIndex: "key_table",
    key: "key_table",
    align: "center",
    width: 50,
  },
  {
    title: "Tên phiên quét",
    dataIndex: "Title",
    key: "Title",
  },
  {
    title: "Lệnh",
    dataIndex: "Command",
    key: "Command",
  },
  {
    title: "Chế độ quét",
    dataIndex: "Mode",
    key: "Mode",
    render: (text, record) => {
      return SCAN_MODE[text];
    },
  },
  {
    title: "Ghi chú",
    dataIndex: "Description",
    key: "Description",
  },

  // {
  //   title: "Tiến độ",
  //   dataIndex: "Progress",
  //   key: "Progress",
  // },
];

const Session = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { sessions, isLoading, count, pageNumber, pageSize } = useSelector(
    (state) => state.sessions
  );

  const [keyword, setKeyword] = useState("");

  const onChangeKeywordInput = (key, event) => {
    setKeyword(event.target.value);
  };

  const handlePaginationChange = (current, pageSize) => {
    dispatch(
      sessionSlice.actions.getSessions({
        keyword,
        pageSize: pageSize,
        pageNumber: current,
      })
    );
  };

  const handleModal = (_item) => {
    dispatch(sessionSlice.actions.toggleModal(_item));
  };

  const columns = [
    ...baseColumns,
    {
      title: "Tiến độ",
      key: "progress",
      align: "center",
      width: 100,
      render: (text, record) => {
        return (
          <Progress
            percent={(record?.Progress / record?.Count) * 100}
            status="active"
            type="circle"
            size={50}
          />
        );
      },
    },
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
            icon={<CaretRightOutlined />}
            title="Quét"
            onClick={() =>
              dispatch(
                scanSlice.actions.handleScan({
                  actionName: ACTION_NAME.EXECUTE_ALL,
                  item: record,
                })
              )
            }
          />
          <DetailButton onClick={() => navigate(`${record.ID}`)} />
          <UpdateButton onClick={() => handleModal(record)} />
          <DeleteButton
            onConfirm={() => {
              dispatch(
                sessionSlice.actions.handleSession({
                  item: record,
                  actionName: "DELETE",
                  pageSize: pageSize,
                  pageNumber:
                    record?.key === pageSize * (pageNumber - 1) + 1
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
      sessionSlice.actions.getSessions({
        keyword,
        pageSize: 20,
        pageNumber: 1,
      })
    );
  }, [dispatch, keyword]);

  return (
    <ContentWrapper>
      <CustomBreadcrumb items={pageHeader.breadcrumb} />

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
        data={sessions}
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
    </ContentWrapper>
  );
};

export default Session;
