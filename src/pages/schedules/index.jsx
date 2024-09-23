import { useDispatch, useSelector } from "react-redux";
import scheduleSlice from "../../toolkits/schedules/slice";
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
  StopOutlined,
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
      title: "Quản trị hệ thống",
    },
    {
      title: "Lập lịch hệ thống",
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
    title: "Tên dịch vụ",
    dataIndex: "ServiceName",
    key: "ServiceName",
    align: "center",
  },
  {
    title: "Thời gian bắt đầu",
    dataIndex: "StartTime",
    key: "StartTime",
    align: "center",
    render: (text, record) => {
      return convertTime(text);
    },
  },
  {
    title: "Chu kỳ (phút)",
    dataIndex: "IntervalDuration",
    key: "IntervalDuration",
    align: "center",
  },
  {
    title: "Thời gian thực hiện cuôi cùng",
    dataIndex: "LastRun",
    key: "LastRun",
    align: "center",
    render: (text, record) => {
      return convertTime(text);
    },
  },
  {
    title: "Thời gian thực hiện tiếp theo",
    dataIndex: "NextRun",
    key: "NextRun",
    align: "center",
    render: (text, record) => {
      return convertTime(text);
    },
  },
  {
    title: "Trạng thái",
    dataIndex: "Status",
    key: "Status",
    align: "center",
    width: 140,
    render: (text, record) => {
      return record?.Status == "ACTIVE" ? (
        <Tag color="green">Đang thực hiện</Tag>
      ) : (
        <Tag color="red">Đang dừng</Tag>
      );
    },
  },
];

const Schedule = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { schedules, isLoading } = useSelector((state) => state.schedules);

  const [keyword, setKeyword] = useState("");

  const handleModal = (_item) => {
    dispatch(scheduleSlice.actions.toggleModal(_item));
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
              record?.Status == "ACTIVE" ? (
                <StopOutlined style={{ color: "red" }} />
              ) : (
                <CaretRightOutlined style={{ color: "green" }} />
              )
            }
            onClick={() => {
              dispatch(
                scheduleSlice.actions.handleSchedule({
                  item: {
                    ...record,
                    Status: record?.Status == "ACTIVE" ? "INACTIVE" : "ACTIVE",
                  },
                  actionName: ACTION_NAME.UPDATE,
                })
              );
            }}
          />
          <UpdateButton onClick={() => handleModal(record)} />
        </Space>
      ),
    },
  ];

  //side effect
  useEffect(() => {
    dispatch(
      scheduleSlice.actions.getSchedules({
        keyword,
        pageSize: 30,
        pageNumber: 1,
      })
    );
  }, [dispatch]);

  return (
    <ContentWrapper>
      <CustomBreadcrumb items={pageHeader.breadcrumb} />

      <PageBodyWrapper>
        <CustomeTable
          header={
            <Header>
              <CreateButton onClick={() => handleModal(null)} />
            </Header>
          }
          data={schedules}
          columns={columns}
          isLoading={isLoading}
          pagination={false}
        />

        <ModalItem />
      </PageBodyWrapper>
    </ContentWrapper>
  );
};

export default Schedule;
