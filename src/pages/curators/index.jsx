import { useDispatch, useSelector } from "react-redux";
import curatorSlice from "../../toolkits/curators/slice";
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
import { Progress, Space } from "antd";
import ModalItem from "./modal";
import { useNavigate, useParams } from "react-router-dom";
import { ACTION_NAME, SCAN_MODE } from "../../utils/common";
import {
  CaretRightOutlined,
  PlayCircleOutlined,
  PlaySquareOutlined,
} from "@ant-design/icons";

const pageHeader = {
  breadcrumb: [
    {
      title: "Trang chủ",
      href: "/",
    },
    {
      title: "Quản lý đơn vị",
    },
    {
      title: "Quản lý cán bộ phụ trách CNTT",
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
    title: "Tên cán bộ",
    dataIndex: "Name",
    key: "Name",
  },
  {
    title: "Chức vụ",
    dataIndex: "Position",
    key: "Position",
  },

  {
    title: "Số điện thoại di động",
    dataIndex: "MobileNumber",
    key: "MobileNumber",
  },
  {
    title: "Số điện thoại bàn",
    dataIndex: "LandlineNumber",
    key: "LandlineNumber",
  },
];

const Curator = () => {
  const dispatch = useDispatch();
  const params = useParams();

  const { id } = params;

  const { curators } = useSelector((state) => state.curators);

  const handleModal = (_item) => {
    dispatch(curatorSlice.actions.toggleModal(_item));
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
          <DeleteButton
            onConfirm={() => {
              dispatch(
                curatorSlice.actions.handleCurator({
                  item: record,
                  actionName: "DELETE",
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
      curatorSlice.actions.getCurators({
        DepartmentID: id,
      })
    );
  }, [dispatch]);

  return (
    <ContentWrapper>
      <CustomBreadcrumb items={pageHeader.breadcrumb} />
      <CustomeTable
        header={
          <Header>
            <CreateButton onClick={() => handleModal(null)} />
          </Header>
        }
        data={curators}
        columns={columns}
      />
      <ModalItem />
    </ContentWrapper>
  );
};

export default Curator;
