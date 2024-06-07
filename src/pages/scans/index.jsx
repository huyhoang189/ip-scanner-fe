import { useDispatch, useSelector } from "react-redux";
import scanSlice from "../../toolkits/scans/slice";
import identifySlice from "../../toolkits/identifies/slice";
import { useEffect, useRef, useState } from "react";
import { ContentWrapper } from "../../assets/styles/contentWrapper.style";
import CustomBreadcrumb from "../../components/breadcrumb";
import CustomeTable from "../../components/Table/table";
import Header from "../../components/Table/header";
import TextInput from "../../components/Form/textinput";
import {
  CreateButton,
  DeleteButton,
  UpdateButton,
} from "../../components/Button";
import { Space, Tag, Typography } from "antd";
import ModalItem from "./modal";
import IdentifyModalItem from "../identifies/modal";
import { useParams } from "react-router-dom";
import {
  LoadingOutlined,
  SyncOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import { convertTime } from "../../utils/time";

const { Text } = Typography;

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
      title: "Danh sách lệnh quét",
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
    title: "Dải IP",
    dataIndex: "Command",
    key: "Command",
  },
  // {
  //   title: "Danh sách IP",
  //   dataIndex: "Ips",
  //   key: "Ips",
  //   width: "40%",
  //   render: (text, record) => {
  //     return <Text>{record?.Ips}</Text>;
  //   },
  // },
  {
    title: "Định danh",
    dataIndex: "Identified",
    key: "Identified",
    render: (text, record) => {
      // console.log(record?.Ips, record?.Ips?.length, record?.Ips.isArray);
      return record?.Identified === "IDENTIFIED" ? (
        <Tag color="green">Đã định danh</Tag>
      ) : (
        <Tag color="red">Chưa định danh</Tag>
      );
    },
  },
  {
    title: "Trạng thái quét",
    dataIndex: "Status",
    key: "Status",

    render: (text, record) => {
      return record?.Status === "NOTHING" ? (
        <Tag color="red">Chưa quét</Tag>
      ) : record?.Status === "SCANNING" ? (
        <Tag color="yellow">Đang quét</Tag>
      ) : record?.Status === "SUCCESS" ? (
        <Tag color="green">Đã quét xong</Tag>
      ) : (
        <Tag color="red">Không phát hiện địa chỉ IP</Tag>
      );
    },
  },

  {
    title: "Thời gian hoàn thành",
    dataIndex: "UpdatedAt",
    key: "UpdatedAt",
    render: (text, record) => {
      return (record?.Status === "SUCCESS") | (record?.Status === "NOTFOUND")
        ? convertTime(record?.UpdatedAt)
        : "";
    },
  },
];

const rowClassName = (record) => {
  if (record.Status === "NOTHING") return {};

  if (
    record.Ips.length > 5 &&
    record.Status === "SUCCESS" &&
    record.Identified === "IDENTIFIED"
  )
    return { backgroundColor: "#ecf9f2" };
};

const ScanBySession = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const intervalRef = useRef();
  const { session_id } = params;

  const { scans, isLoading, count, pageNumber, pageSize } = useSelector(
    (state) => state.scans
  );
  const [keyword, setKeyword] = useState("");

  const onChangeKeywordInput = (key, event) => {
    setKeyword(event.target.value);
  };

  const handlePaginationChange = (current, pageSize) => {
    dispatch(
      scanSlice.actions.getScanBySessionIDs({
        keyword,
        pageSize: pageSize,
        pageNumber: current,
        SessionID: session_id,
      })
    );
  };

  const handleModal = (_item) => {
    dispatch(scanSlice.actions.toggleModal(_item));
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
            disabled={
              record?.Identified === "IDENTIFIED" ||
              record?.Status === "NOTFOUND"
                ? true
                : false
            }
            title="Định danh"
            name="Định danh"
            onClick={() => {
              dispatch(
                identifySlice.actions.toggleModal({
                  ...record,
                  SessionID: session_id,
                })
              );
            }}
            icon={<WarningOutlined />}
          />

          <UpdateButton
            icon={
              record?.Status === "SCANNING" ? (
                <LoadingOutlined />
              ) : (
                <SyncOutlined />
              )
            }
            title="Quét"
            name="Quét"
            onClick={() => {
              dispatch(
                scanSlice.actions.handleScan({
                  item: record,
                  actionName: "EXECUTE",
                  SessionID: session_id,
                })
              );
            }}
          />
          <DeleteButton
            onConfirm={() => {
              dispatch(
                scanSlice.actions.handleScan({
                  item: record,
                  actionName: "DELETE",
                  pageSize: pageSize,
                  pageNumber:
                    record?.key === pageSize * (pageNumber - 1) + 1
                      ? Math.max(pageNumber - 1, 1)
                      : pageNumber,
                  SessionID: session_id,
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
    // dispatch(
    //   scanSlice.actions.getScanBySessionIDs({
    //     keyword,
    //     pageSize: 10,
    //     pageNumber: 1,
    //     SessionID: session_id,
    //   })
    // );

    const fetchScans = () => {
      dispatch(
        scanSlice.actions.getScanBySessionIDs({
          keyword,
          pageSize: 10,
          pageNumber: 1,
          SessionID: session_id,
        })
      );
    };

    fetchScans(); // initial fetch

    intervalRef.current = setInterval(fetchScans, 30000); // fetch every 5 seconds

    return () => clearInterval(intervalRef.current); // clean
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
        data={scans}
        columns={columns}
        // isLoading={isLoading}
        onRow={(record) => ({
          style: rowClassName(record),
        })}
        pagination={{
          current: pageNumber,
          pageSize: pageSize,
          total: count,
          onChange: handlePaginationChange,
        }}
      />

      <ModalItem />
      <IdentifyModalItem />
    </ContentWrapper>
  );
};

export default ScanBySession;
