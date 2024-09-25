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
import { DetailButton } from "../../../components/Button";
import { FileExcelOutlined } from "@ant-design/icons";
import axios from "axios";
import { getCookieToken } from "../../../utils/cookie";
import { TOKEN_VERIFY } from "../../../utils/common";

const pageHeader = {
  breadcrumb: [
    {
      title: "Trang chủ",
      href: "/",
    },
    // {
    //   title: "Thống kê dải địa chỉ IP",
    // },
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
    title: "Thời gian hoàn thành",
    dataIndex: "UpdatedAt",
    key: "UpdatedAt",
    align: "center",
    render: (text, record) => {
      return convertTime(record?.UpdatedAt);
    },
  },
  {
    title: "Đơn vị",
    dataIndex: "DepartmentName",
    key: "DepartmentName",
  },
];

const ReportIpRange = () => {
  const dispatch = useDispatch();
  const params = useParams();

  const [keyword, setKeyword] = useState("");
  const { pageSize, pageNumber, count, reportIpRanges } = useSelector(
    (state) => state.reports
  );

  const handlePaginationChange = (current, pageSize) => {
    dispatch(
      reportSlice.actions.getReportIpRange({
        keyword: keyword,
        pageSize: pageSize,
        pageNumber: current,
        identifyStatus: params?.type || "TOTAL_RECORD",
      })
    );
  };

  const exportFile = async () => {
    try {
      const user = getCookieToken(TOKEN_VERIFY);
      const response = await axios.get(
        `${
          import.meta.env.VITE_BASE_BE_URL
        }/reports/export-report-ip-range?identifyStatus=${
          params?.type || "TOTAL_RECORD"
        }&filter=${keyword || ""}`,
        {
          responseType: "blob", // Important
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
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

  useEffect(() => {
    dispatch(
      reportSlice.actions.getReportIpRange({
        keyword: keyword,
        pageSize: pageSize,
        pageNumber: pageNumber,
        identifyStatus: params?.type || "TOTAL_RECORD",
      })
    );
  }, [dispatch, params]);

  return (
    <ContentWrapper>
      <CustomBreadcrumb
        items={[
          ...pageHeader.breadcrumb,
          {
            title: `Thống kê dải địa chỉ IP (${
              params?.type == "IDENTIFIED"
                ? "Danh sách dải địa chỉ đã được định danh"
                : params?.type == "UNIDENTIFIED"
                ? "Danh sách dải địa chỉ chưa được định danh"
                : "Tất cả"
            })`,
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
          data={reportIpRanges}
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

export default ReportIpRange;
