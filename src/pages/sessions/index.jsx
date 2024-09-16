import { useDispatch, useSelector } from "react-redux";
import sessionSlice from "../../toolkits/sessions/slice";
import scanSlice from "../../toolkits/scans/slice";
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
} from "@ant-design/icons";
import { convertTime } from "../../utils/time";
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
    align: "center",
  },
  {
    title: "Lệnh",
    dataIndex: "Command",
    key: "Command",
    align: "center",
  },
  {
    title: "Chế độ quét",
    dataIndex: "Mode",
    key: "Mode",
    align: "center",
    render: (text, record) => {
      return SCAN_MODE[text];
    },
  },
  {
    title: "Ghi chú",
    dataIndex: "Description",
    key: "Description",
  },
  {
    title: "Trạng thái",
    dataIndex: "Status",
    key: "Status",
    align: "center",
    render: (text, record) => {
      return record?.Status === "NOTHING" ? (
        <Tag color="red">Chưa quét</Tag>
      ) : record?.Status === "SCANNING" ? (
        <Tag color="yellow">Đang quét</Tag>
      ) : (
        <Tag color="green">Đã quét xong</Tag>
      );
    },
  },

  {
    title: "Thời gian kết thúc",
    dataIndex: "UpdatedAt",
    key: "UpdatedAt",
    align: "center",
    render: (text, record) => {
      return convertTime(text);
    },
  },
];

const Session = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const intervalRef = useRef();

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
        const percentage = Math.round((record?.Progress / record?.Count) * 100);
        const status = percentage !== 100 ? "active" : "success";

        return (
          <Progress
            percent={percentage}
            type="circle"
            size={30}
            status={status}
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
          <DetailButton onClick={() => navigate(`${record.ID}`)} />
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
          <UpdateButton
            onClick={() => handleModal(record)}
            disabled={
              Math.round((record?.Progress / record?.Count) * 100) != 100
                ? true
                : false
            }
          />
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

  const exportFile = async (sessionId) => {};

  //side effect
  useEffect(() => {
    const fetchScans = () => {
      dispatch(
        sessionSlice.actions.getSessions({
          keyword,
          pageSize: 30,
          pageNumber: 1,
        })
      );
    };

    fetchScans(); // initial fetch

    intervalRef.current = setInterval(fetchScans, 5000); // fetch every 5 seconds

    return () => clearInterval(intervalRef.current); // clean
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
          data={sessions}
          columns={columns}
          // isLoading={isLoading}
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

export default Session;
