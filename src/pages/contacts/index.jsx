import { useDispatch, useSelector } from "react-redux";
import contactSlice from "../../toolkits/contacts/slice";
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
  UpdateButton,
} from "../../components/Button";
import { Card, Col, Row, Space, Tag } from "antd";
import ModalItem from "./modal";
import { generateTreesOnlyKey, getNodeByKey } from "../../utils/tree";
import TreeView from "../../components/TreeView";
import { convertTime } from "../../utils/time";
import { DoubleRightOutlined, SwapRightOutlined } from "@ant-design/icons";
import { PageBodyWrapper } from "../../assets/styles/pageBodyWrapper.style";
const pageHeader = {
  breadcrumb: [
    {
      title: "Trang chủ",
      href: "/",
    },
    {
      title: "Danh bạ liên hệ",
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
    title: "Di động",
    dataIndex: "MobileNumber",
    key: "MobileNumber",
  },
  {
    title: "Điện thoại bàn",
    dataIndex: "LandlineNumber",
    key: "LandlineNumber",
  },
  {
    title: "Đơn vị",
    dataIndex: "Department",
    key: "Department",
    render: (text, record) => {
      return record?.Department?.FullName;
    },
  },
];

const Contact = () => {
  const dispatch = useDispatch();

  const {
    contacts,
    isLoading,
    count,
    pageNumber,
    pageSize,
    departmentNodeSelected,
    modalActive,
  } = useSelector((state) => state.contacts);
  const { departmentTrees } = useSelector((state) => state.departments);

  const [keyword, setKeyword] = useState("");
  const [trees, setTrees] = useState([]);

  const onChangeKeywordInput = (key, event) => {
    setKeyword(event.target.value);
  };

  const handlePaginationChange = (current, pageSize) => {
    dispatch(
      contactSlice.actions.getContacts({
        keyword,
        pageSize: pageSize,
        pageNumber: current,
      })
    );
  };

  const handleModal = (_item) => {
    dispatch(contactSlice.actions.toggleModal(_item));
  };

  const onSelected = (e) => {
    if (e) {
      const node = getNodeByKey(trees, e[0]);
      dispatch(contactSlice.actions.updateDepartmentNodeSelected(node));
    }
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
                contactSlice.actions.handleContact({
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
    if (departmentNodeSelected?.ID) {
      if (!modalActive && departmentTrees) {
        dispatch(
          contactSlice.actions.getContacts({
            keyword,
            pageSize: 10,
            pageNumber: 1,
          })
        );
      }
    }
  }, [departmentNodeSelected, keyword, modalActive]);

  useEffect(() => {
    if (trees.length > 0 && !departmentNodeSelected?.ID) {
      const node = getNodeByKey(trees, trees[0]?.key);
      dispatch(contactSlice.actions.updateDepartmentNodeSelected(node));
    }
  }, [trees]);

  useEffect(() => {
    dispatch(
      departmentSlice.actions.getDepartmentTrees({
        keyword,
        pageSize: 1000,
        pageNumber: 1,
      })
    );
  }, [dispatch]);

  useEffect(() => {
    if (modalActive === false) {
      if (departmentTrees) setTrees(generateTreesOnlyKey(departmentTrees));
    }
  }, [departmentTrees]);

  return (
    <ContentWrapper>
      <CustomBreadcrumb items={pageHeader.breadcrumb} />
      <PageBodyWrapper>
        <Row gutter={16}>
          <Col span={7}>
            <TreeView treeData={trees ? trees : []} onSelected={onSelected} />
          </Col>
          <Col span={17}>
            <CustomeTable
              header={
                <Header>
                  <TextInput
                    placeholder={"Nhập vào từ khoá tìm kiếm"}
                    onChange={onChangeKeywordInput}
                    property={"keyword"}
                    width={20}
                  />
                  <Space>
                    <CreateButton onClick={() => handleModal(null)} />
                  </Space>
                </Header>
              }
              data={contacts}
              columns={columns}
              isLoading={isLoading}
              pagination={{
                current: pageNumber,
                pageSize: pageSize,
                total: count,
                onChange: handlePaginationChange,
              }}
            />
          </Col>
        </Row>

        <ModalItem />
      </PageBodyWrapper>
    </ContentWrapper>
  );
};

export default Contact;
