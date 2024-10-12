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
import { Card, Col, Flex, Row, Space, Tag } from "antd";
import ModalItem from "./modal";
import ModalUpdateItem from "./multi.modal";
import { generateTreesOnlyKey, getNodeByKey } from "../../utils/tree";
import TreeView from "../../components/TreeView";
import { convertTime } from "../../utils/time";
import {
  CheckCircleOutlined,
  CiCircleFilled,
  CloseCircleOutlined,
  DoubleRightOutlined,
  SwapRightOutlined,
} from "@ant-design/icons";
import { PageBodyWrapper } from "../../assets/styles/pageBodyWrapper.style";
import SelectInput from "../../components/Form/selectinput";
const pageHeader = {
  breadcrumb: [
    {
      title: "Trang chủ",
      href: "/",
    },
    {
      title: "Quản lý danh sách dải địa chỉ IP",
    },
  ],
};

const baseColumns = [
  // {
  //   title: "STT",
  //   dataIndex: "index",
  //   key: "index",
  //   width: 50,
  //   align: "center",
  // },
  {
    // title: "Online",
    dataIndex: "IsActive",
    key: "IsActive",
    align: "center",
    width: 50,
    render: (text, record) => {
      return record?.IsActive ? (
        <CheckCircleOutlined style={{ color: "green" }} />
      ) : (
        <CloseCircleOutlined style={{ color: "red" }} />
      );
    },
    // filters: [
    //   {
    //     text: "Sử dụng",
    //     value: true,
    //   },
    //   {
    //     text: "Không sử dụng",
    //     value: false,
    //   },
    // ],
  },
  {
    title: "Dải IP",
    dataIndex: "IpRange",
    key: "IpRange",
    align: "center",
    sorter: true,
  },
  {
    title: "Đơn vị",
    dataIndex: "Department",
    key: "Department",
    render: (text, record) => {
      return record?.Department?.FullName;
    },
    sorter: true,
  },

  {
    title: "Thời gian kiểm tra",
    dataIndex: "TimeActiveRecently",
    key: "TimeActiveRecently",
    align: "center",
    render: (text, record) => {
      return convertTime(record?.TimeActiveRecently);
    },
    sorter: true,
  },
  {
    title: "Thời gian cập nhật",
    dataIndex: "CreatedAt",
    key: "CreatedAt",
    align: "center",
    render: (text, record) => {
      return convertTime(record?.CreatedAt);
    },
    sorter: true,
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
    sortParams,
    searchOptions,
  } = useSelector((state) => state.ipRanges);
  const { departmentTrees } = useSelector((state) => state.departments);

  // const [departmentNodeSelected, setSelectedNode] = useState({});
  // const [keyword, setKeyword] = useState("");
  const [trees, setTrees] = useState([]);
  const [selectedIpRanges, setSelectedIpRanges] = useState([]);

  const onChangeKeywordInput = (key, event) => {
    // setKeyword(event.target.value);
    dispatch(
      ipRangeSlice.actions.upadteSearchOptions({
        keyword: event.target.value,
      })
    );
  };

  const onChangeSelectedStatus = (key, value) => {
    dispatch(
      ipRangeSlice.actions.upadteSearchOptions({
        activeStatus: value,
      })
    );
  };

  const handlePaginationChange = (current, pageSize) => {
    dispatch(
      ipRangeSlice.actions.getIpRanges({
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

  const onChangeTable = (pagination, filters, sorter) => {
    dispatch(
      ipRangeSlice.actions.updateSortParams({
        sortField:
          sorter.field === "Department"
            ? "DepartmentID"
            : sorter.field === "IpRange"
            ? "IpRangeInt"
            : sorter.field,
        sortOrder:
          sorter.order === "ascend"
            ? "asc"
            : sorter.order === "descend"
            ? "desc"
            : null,
      })
    );
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
          pageSize: 10,
          pageNumber: 1,
          departmentId: departmentNodeSelected?.value,
        })
      );
      setSelectedIpRanges([]);
    }
  }, [departmentNodeSelected, modalActive, modalUpdateActive]);

  useEffect(() => {
    dispatch(
      ipRangeSlice.actions.getIpRanges({
        pageSize: pageSize,
        pageNumber: pageNumber,
      })
    );
  }, [sortParams, searchOptions]);

  useEffect(() => {
    if (trees && !departmentNodeSelected?.ID) {
      const node = getNodeByKey(trees, trees[0]?.key);
      dispatch(ipRangeSlice.actions.updateDepartmentNodeSelected(node));
    }
  }, [trees]);

  useEffect(() => {
    dispatch(
      departmentSlice.actions.getDepartmentTrees({
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
      <Row gutter={8}>
        <Col span={6}>
          <PageBodyWrapper style={{ marginTop: 0 }}>
            <TreeView treeData={trees ? trees : []} onSelected={onSelected} />
          </PageBodyWrapper>
        </Col>
        <Col span={18}>
          <PageBodyWrapper style={{ marginTop: 0 }}>
            <Header>
              <Flex style={{ width: 400 }} gap={10}>
                <TextInput
                  placeholder={"Tìm kiếm"}
                  onChange={onChangeKeywordInput}
                  property={"keyword"}
                  width={100}
                  value={searchOptions.keyword}
                />
                <SelectInput
                  options={[
                    {
                      label: "Tất cả",
                      value: null,
                    },
                    {
                      label: "Sử dụng",
                      value: "true",
                    },
                    {
                      label: "Không sử dụng",
                      value: "false",
                    },
                  ]}
                  width={50}
                  property={"activeStatus"}
                  value={searchOptions.activeStatus}
                  onChange={onChangeSelectedStatus}
                />
              </Flex>
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
            <CustomeTable
              // header={

              // }
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
              onChange={onChangeTable}
            />
          </PageBodyWrapper>
        </Col>
      </Row>

      <ModalItem />
      <ModalUpdateItem selectedIpRanges={selectedIpRanges} />
    </ContentWrapper>
  );
};

export default IpRange;
