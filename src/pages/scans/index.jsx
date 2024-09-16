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
  DetailButton,
  UpdateButton,
} from "../../components/Button";
import { Card, Flex, Popover, Radio, Space, Tag, Typography } from "antd";
import ModalItem from "./log.modal";
import IdentifyModalItem from "../identifies/modal";
import { useParams } from "react-router-dom";
import {
  FileExcelOutlined,
  FilterFilled,
  LoadingOutlined,
  SyncOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import { convertTime } from "../../utils/time";
import { exportFileExcel } from "../../apis/scan.api";
import { saveAs } from "file-saver";
import axios from "axios";
import SelectInput from "../../components/Form/selectinput";

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
    align: "center",
  },

  {
    title: "Định danh",
    dataIndex: "Identified",
    key: "Identified",
    align: "center",
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
    align: "center",
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
    align: "center",
    render: (text, record) => {
      return (record?.Status === "SUCCESS") | (record?.Status === "NOTFOUND")
        ? convertTime(record?.UpdatedAt)
        : "";
    },
  },
  {
    title: "Đơn vị",
    dataIndex: "DepartmentName",
    key: "DepartmentName",
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

  const { scans, isLoading, count, pageNumber, pageSize, filterOption } =
    useSelector((state) => state.scans);
  const { selectedIdentify } = useSelector((state) => state?.identifies);

  const [keyword, setKeyword] = useState("");

  const onChangeKeywordInput = (key, event) => {
    setKeyword(event.target.value);
  };

  const onChangeFilterOptionScan = (key, event) => {
    if (key) {
      let clone = Object.assign({}, filterOption);
      clone[key] = event;
      dispatch(scanSlice.actions.updateFiterOptionScanInput(clone));
    }
  };

  const handlePaginationChange = (current, pageSize) => {
    dispatch(
      scanSlice.actions.getScanBySessionIDs({
        keyword,
        pageSize: pageSize,
        pageNumber: current,
        SessionID: session_id,
        status: "SUCCESS",
      })
    );
  };

  const handleModal = (_item) => {
    dispatch(scanSlice.actions.toggleModal(_item));
  };

  const exportFile = async (sessionId) => {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_BASE_BE_URL
        }/scans/export-to-excel/${sessionId}`,
        {
          responseType: "blob", // Important
        }
      );

      // Create a Blob from the response
      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      // Use FileSaver to save the file
      saveAs(blob, "export.xlsx");
    } catch (error) {
      console.error("Error downloading the file", error);
    }
  };

  const rowSelection = {
    selectedRowKeys: selectedIdentify?.IpRanges,
    onChange: (selectedRowKeys) => {
      let clone = Object.assign({}, selectedIdentify);
      clone["IpRanges"] = selectedRowKeys;
      dispatch(identifySlice.actions.updateSelectedIdentyfiInput(clone));
    },
    getCheckboxProps: (record) => ({
      disabled: record.Identified === "IDENTIFIED",
      // Column configuration not to be checked
      name: record.Identified,
    }),
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
    // const fetchScans = () => {
    dispatch(
      scanSlice.actions.getScanBySessionIDs({
        keyword,
        pageSize: 25,
        SessionID: session_id,
        status: "SUCCESS",
      })
    );
    // };
  }, [dispatch, keyword, filterOption]);

  return (
    <ContentWrapper>
      <CustomBreadcrumb items={pageHeader.breadcrumb} />
      <PageBodyWrapper>
        <CustomeTable
          header={
            <Header>
              <Space style={{ width: "100%" }}>
                <div style={{ width: 220 }}>
                  <TextInput
                    placeholder={"Nhập vào từ khoá tìm kiếm"}
                    onChange={onChangeKeywordInput}
                    property={"keyword"}
                  />
                </div>

                <div style={{ marginLeft: 10, width: 220 }}>
                  <SelectInput
                    options={[
                      { value: "IDENTIFIED", label: "Đã định danh" },
                      { value: "UNIDENTIFIED", label: "Chưa định danh" },
                      { value: "TOTAL_RECORD", label: "Tất cả" },
                    ]}
                    value={filterOption?.IdentifyStatus}
                    property={"IdentifyStatus"}
                    onChange={onChangeFilterOptionScan}
                  />
                </div>
              </Space>

              <Space>
                {selectedIdentify?.IpRanges?.length > 0 && (
                  <CreateButton
                    onClick={() => {
                      dispatch(
                        identifySlice.actions.toggleModal({
                          ...selectedIdentify,
                          SessionID: session_id,
                        })
                      );
                    }}
                    text="Định Danh"
                    icon={<WarningOutlined />}
                  />
                )}

                <DetailButton
                  onClick={() => handleModal(null)}
                  title="Chi tiết phiên quét"
                  name="Logs"
                />
                <DetailButton
                  onClick={() => exportFile(session_id)}
                  icon={<FileExcelOutlined />}
                  title="Trích xuất dữ liệu"
                  name="Trích xuất"
                />
              </Space>
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
          rowSelection={{
            type: "checkbox",
            ...rowSelection,
          }}
        />

        <ModalItem />
        <IdentifyModalItem />
      </PageBodyWrapper>
    </ContentWrapper>
  );
};

export default ScanBySession;
