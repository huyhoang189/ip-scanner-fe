import { useDispatch, useSelector } from "react-redux";
import ipRangeSlice from "../../toolkits/ipRanges/slice";
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
import ModalUpdateItem from "./multi.modal";
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
      title: "Quản lý dải IP",
    },
    {
      title: "Quản lý danh sách IP",
    },
  ],
};

const baseColumns = [
  {
    title: "STT",
    dataIndex: "index",
    key: "index",
    width: 50,
    align: "center",
  },
  {
    title: "Dải IP",
    dataIndex: "IpRange",
    key: "IpRange",
  },
  {
    title: "Đơn vị",
    dataIndex: "Department",
    key: "Department",
    render: (text, record) => {
      return record?.Department?.FullName;
    },
  },
  {
    title: "Thời gian cập nhật",
    dataIndex: "UpdatedAt",
    key: "UpdatedAt",
    render: (text, record) => {
      return convertTime(record?.UpdatedAt);
    },
  },
];

const IpRange = () => {
  const dispatch = useDispatch();

  const {
    ipRanges,
    isLoading,
    count,
    pageNumber,
    pageSize,
    departmentNodeSelected,
    modalActive,
    modalUpdateActive,
  } = useSelector((state) => state.ipRanges);
  const { departmentTrees } = useSelector((state) => state.departments);

  // const [departmentNodeSelected, setSelectedNode] = useState({});
  const [keyword, setKeyword] = useState("");
  const [trees, setTrees] = useState([]);
  const [selectedIpRanges, setSelectedIpRanges] = useState([]);

  const onChangeKeywordInput = (key, event) => {
    setKeyword(event.target.value);
  };

  const handlePaginationChange = (current, pageSize) => {
    dispatch(
      ipRangeSlice.actions.getIpRanges({
        keyword,
        pageSize: pageSize,
        pageNumber: current,
      })
    );
  };

  const handleModal = (_item) => {
    dispatch(ipRangeSlice.actions.toggleModal(_item));
  };

  const onSelected = (e) => {
    if (e) {
      const node = getNodeByKey(trees, e[0]);
      dispatch(ipRangeSlice.actions.updateDepartmentNodeSelected(node));
    }
  };

  const rowSelection = {
    selectedRowKeys: selectedIpRanges,
    onChange: (selectedRowKeys) => {
      setSelectedIpRanges(selectedRowKeys);
    },
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
                ipRangeSlice.actions.handleIpRange({
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
    if (!modalActive && !modalUpdateActive && departmentTrees) {
      dispatch(
        ipRangeSlice.actions.getIpRanges({
          keyword,
          pageSize: 10,
          pageNumber: 1,
          departmentId: departmentNodeSelected?.value,
        })
      );
      setSelectedIpRanges([]);
    }
  }, [departmentNodeSelected, keyword, modalActive, modalUpdateActive]);

  useEffect(() => {
    if (trees && !departmentNodeSelected?.ID) {
      const node = getNodeByKey(trees, trees[0]?.key);
      dispatch(ipRangeSlice.actions.updateDepartmentNodeSelected(node));
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

  // useEffect(() => {
  //   if (modalActive == false) {
  //     setSelectedIpRanges([]);
  //   }
  // }, [modalActive]);

  return (
    <ContentWrapper>
      <CustomBreadcrumb items={pageHeader.breadcrumb} />
      <PageBodyWrapper>
        <Row gutter={16}>
          <Col span={8}>
            <TreeView treeData={trees ? trees : []} onSelected={onSelected} />
          </Col>
          <Col span={16}>
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
                    {selectedIpRanges.length > 0 && (
                      <CreateButton
                        icon={<DoubleRightOutlined />}
                        text="Cập nhật đơn vị"
                        onClick={() =>
                          dispatch(ipRangeSlice.actions.toggleModalUpdate())
                        }
                      />
                    )}
                    <CreateButton onClick={() => handleModal(null)} />
                  </Space>
                </Header>
              }
              data={ipRanges}
              columns={columns}
              isLoading={isLoading}
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
          </Col>
        </Row>

        <ModalItem />
        <ModalUpdateItem selectedIpRanges={selectedIpRanges} />
      </PageBodyWrapper>
    </ContentWrapper>
  );
};

export default IpRange;
