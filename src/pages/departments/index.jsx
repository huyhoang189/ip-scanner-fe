import { useDispatch, useSelector } from "react-redux";
import departmentSlice from "../../toolkits/departments/slice";
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
import { Card, Space } from "antd";
import ModalItem from "./modal";
import { generateTrees } from "../../utils/tree";
import { useNavigate } from "react-router-dom";
import { render } from "react-dom";
const pageHeader = {
  breadcrumb: [
    {
      title: "Trang chủ",
      href: "/",
    },
    {
      title: "Quản lý hệ thống",
    },
    {
      title: "Quản lý danh mục đơn vị",
    },
  ],
};

const baseColumns = [
  {
    title: "Tên đơn vị",
    dataIndex: "Name",
    key: "Name",
    width: "35%",
    render: (text, record) => {
      return (
        <span style={{ ...(record?.IsCategory && { fontWeight: "bold" }) }}>
          {text}
        </span>
      );
    },
  },

  // {
  //   title: "Đơn vị cha",
  //   dataIndex: "Parent",
  //   key: "Parent",
  //   width: "10%",
  //   render: (text, record) => {
  //     return record?.Parent?.Name;
  //   },
  // },
  // {
  //   title: "Đầy đủ",
  //   dataIndex: "FullName",
  //   key: "FullName",
  //   width: "20%",
  //   render: (text, record) => {
  //     return record?.FullName;
  //   },
  // },
  {
    title: "Cấp đơn vị",
    dataIndex: "Level",
    key: "Level",
    align: "center",
    width: 200,
    render: (text, record) => {
      return record?.IsCategory ? "Không xếp hạng" : `Cấp ${record?.Level}`;
    },
  },
  {
    title: "Vị trí",
    dataIndex: "Position",
    key: "Position",
    align: "center",
    width: 100,
  },
  {
    title: "Loại",
    dataIndex: "IsCategory",
    key: "IsCategory",
    align: "center",
    render: (text, _) => {
      return text ? "Danh mục" : "Đơn vị";
    },
    width: 200,
  },
];

const Department = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { departments, isLoading, count, pageNumber, pageSize } = useSelector(
    (state) => state.departments
  );

  const [trees, setTrees] = useState([]);

  // const [keyword, setKeyword] = useState("");

  const onChangeKeywordInput = (key, event) => {
    setKeyword(event.target.value);
  };

  const handlePaginationChange = (current, pageSize) => {
    dispatch(
      departmentSlice.actions.getDepartments({
        keyword,
        pageSize: pageSize,
        pageNumber: current,
      })
    );
  };

  const handleModal = (_item) => {
    dispatch(departmentSlice.actions.toggleModal(_item));
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
          <DetailButton
            onClick={() => navigate(`${record.ID}`)}
            title="Cán bộ phụ trách"
          />
          <CreateButton
            onClick={() =>
              handleModal({
                ID: null,
                Name: "",
                Description: "",
                Position: 0,
                ParentID: record.ID,
                IsCategory: false,
                FullName: "",
              })
            }
            text=""
          />
          <UpdateButton onClick={() => handleModal(record)} />
          <DeleteButton
            onConfirm={() => {
              dispatch(
                departmentSlice.actions.handleDepartment({
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
      departmentSlice.actions.getDepartments({
        pageSize: 10000,
        pageNumber: 1,
      })
    );
  }, [dispatch]);

  useEffect(() => {
    if (departments) setTrees(generateTrees(departments));
  }, [departments]);

  return (
    <ContentWrapper>
      <CustomBreadcrumb items={pageHeader.breadcrumb} />

      <Card>
        <CustomeTable
          header={
            <Header>
              <CreateButton onClick={() => handleModal(null)} text="Thêm mới" />
            </Header>
          }
          data={trees}
          columns={columns}
          isLoading={isLoading}
          pagination={false}
        />

        {/* <ModalItem /> */}
        <ModalItem />
      </Card>
    </ContentWrapper>
  );
};

export default Department;
