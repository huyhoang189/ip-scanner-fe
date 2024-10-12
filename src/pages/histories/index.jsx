import { useDispatch, useSelector } from "react-redux";
import { ContentWrapper } from "../../assets/styles/contentWrapper.style";
import CustomBreadcrumb from "../../components/breadcrumb";
import { useParams } from "react-router-dom";
import historySlice from "../../toolkits/histories/slice";
import { render } from "react-dom";
import { DeleteButton } from "../../components/Button";
import CustomeTable from "../../components/Table/table";
import { useEffect } from "react";
import { convertTime } from "../../utils/time";

const pageHeader = {
  breadcrumb: [
    {
      title: "Trang chủ",
      href: "/",
    },
    {
      title: "Lịch sử sử dụng dải địa chỉ",
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
    title: "Dải địa chỉ",
    dataIndex: "IpRange",
    key: "IpRange",
    align: "center",
    render: (text, record) => {
      return record?.IpRange?.IpRange;
    },
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
    title: "Thời gian",
    dataIndex: "CreatedAt",
    key: "CreatedAt",
    align: "center",
    render: (text, record) => {
      return convertTime(record?.CreatedAt);
    },
  },
];

const History = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const { id } = params;
  const { histories, pageNumber, pageSize, count, isLoading } = useSelector(
    (state) => state.histories
  );

  const columns = [
    ...baseColumns,
    {
      title: "Công cụ",
      dataIndex: "tools",
      key: "tools",
      align: "center",
      render: (text, record) => {
        return (
          <DeleteButton
            onConfirm={() =>
              dispatch(
                historySlice.actions.handleHistory({
                  actionName: ACTION_NAME.DELETE,
                  item: record,
                  pageSize: pageSize,
                  pageNumber:
                    record?.index === pageSize * (pageNumber - 1) + 1
                      ? Math.max(pageNumber - 1, 1)
                      : pageNumber,
                })
              )
            }
          />
        );
      },
    },
  ];

  const handlePaginationChange = (current, pageSize) => {
    dispatch(
      historySlice.actions.getHistories({
        pageNumber: current,
        pageSize: pageSize,
        IpRangeID: id,
      })
    );
  };

  useEffect(() => {
    dispatch(
      historySlice.actions.getHistories({
        pageNumber: 1,
        pageSize: 10,
        IpRangeID: id,
      })
    );
  }, [dispatch]);

  return (
    <ContentWrapper>
      <CustomBreadcrumb items={pageHeader.breadcrumb} />
      <CustomeTable
        data={histories}
        columns={columns}
        isLoading={isLoading}
        pagination={{
          current: pageNumber,
          pageSize: pageSize,
          total: count,
          onChange: handlePaginationChange,
        }}
      />
    </ContentWrapper>
  );
};

export default History;
