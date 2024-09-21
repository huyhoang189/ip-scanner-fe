import { useDispatch, useSelector } from "react-redux";
import { ContentWrapper } from "../../../assets/styles/contentWrapper.style";
import CustomBreadcrumb from "../../../components/breadcrumb";
import { PageBodyWrapper } from "../../../assets/styles/pageBodyWrapper.style";
import CustomeTable from "../../../components/Table/table";
import Header from "../../../components/Table/header";
import TextInput from "../../../components/Form/textinput";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import reportSlice from "../../../toolkits/reports/slice";
import { Tag } from "antd";
import { convertTime } from "../../../utils/time";
import { SCAN_MODE } from "../../../utils/common";
import { DetailButton } from "../../../components/Button";
import {
  ExceptionOutlined,
  ExportOutlined,
  FileExcelOutlined,
} from "@ant-design/icons";
import { saveAs } from "file-saver";
import axios from "axios";

const pageHeader = {
  breadcrumb: [
    {
      title: "Trang chủ",
      href: "/",
    },
    {
      title: "Thống kê dải địa chỉ IP",
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
    title: "Nội dung",
    dataIndex: "Title",
    key: "Title",
    align: "center",
  },
  {
    title: "Lệnh quét",
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
    title: "Thời gian",
    dataIndex: "Time",
    key: "Time",
    align: "center",
    render: (text, record) => {
      return convertTime(record?.Time);
    },
  },
  {
    title: "Số lượng dải địa chỉ",
    dataIndex: "Count",
    key: "Count",
    children: [
      {
        title: "Tổng số",
        dataIndex: "Count",
        key: "Count",
        align: "center",
      },
      {
        title: "Dải định danh",
        dataIndex: "CountIdentified",
        key: "CountIdentified",
        align: "center",
      },
      {
        title: "Dải chưa định danh",
        dataIndex: "CountUnidentified",
        key: "CountUnidentified",
        align: "center",
      },
    ],
  },
];

const ReportSession = () => {
  const dispatch = useDispatch();
  const params = useParams();

  const [keyword, setKeyword] = useState("");
  const { pageSize, pageNumber, count, reportSessions } = useSelector(
    (state) => state.reports
  );

  const handlePaginationChange = (current, pageSize) => {
    dispatch(
      reportSlice.actions.getReportSession({
        keyword: keyword,
        pageSize: pageSize,
        pageNumber: current,
      })
    );
  };

  useEffect(() => {
    dispatch(
      reportSlice.actions.getReportSession({
        keyword: keyword,
        pageSize: pageSize,
        pageNumber: pageNumber,
      })
    );
  }, [dispatch]);

  const exportFile = async () => {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_BASE_BE_URL
        }/reports/export-report-session-history`,
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

  return (
    <ContentWrapper>
      <CustomBreadcrumb
        items={[
          ...pageHeader.breadcrumb,
          {
            title: "Nhật ký phiên quét",
          },
        ]}
      />

      <PageBodyWrapper>
        <CustomeTable
          header={
            <Header>
              <TextInput
                placeholder={"Nhập vào từ khoá tìm kiếm"}
                // onChange={onChangeKeywordInput}
                property={"keyword"}
                width={20}
              />
              <DetailButton
                icon={<FileExcelOutlined />}
                title="Xuất báo cáo"
                name="Xuất báo cáo"
                onClick={() => exportFile()}
              />
            </Header>
          }
          data={reportSessions}
          columns={baseColumns}
          // isLoading={isLoading}
          pagination={{
            current: pageNumber,
            pageSize: pageSize,
            total: count,
            onChange: handlePaginationChange,
          }}
        />
      </PageBodyWrapper>
    </ContentWrapper>
  );
};

export default ReportSession;
