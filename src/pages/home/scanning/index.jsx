import { Progress, Tag } from "antd";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomeTable from "../../../components/Table/table";
import sessionSlice from "../../../toolkits/sessions/slice";
import { convertTime } from "../../../utils/time";
const baseColumns = [
  {
    title: "STT",
    dataIndex: "index",
    key: "index",
    align: "center",
    width: 50,
  },
  {
    title: "Tên phiên quét",
    dataIndex: "Title",
    key: "Title",
  },
  {
    title: "Lệnh",
    dataIndex: "Command",
    key: "Command",
  },
  {
    title: "Ghi chú",
    dataIndex: "Description",
    key: "Description",
  },
  {
    title: "Trạng thái",
    dataIndex: "Status",
    key: "Status",
    render: (text, record) => {
      return record?.Status === "NOTHING" ? (
        <Tag color="red">Chưa quét</Tag>
      ) : record?.Status === "SCANNING" ? (
        <Tag color="yellow">Đang quét</Tag>
      ) : (
        <Tag color="green">Đã quét xong</Tag>
      );
    },
  },

  //   {
  //     title: "Thời gian kết thúc",
  //     dataIndex: "UpdatedAt",
  //     key: "UpdatedAt",
  //     render: (text, record) => {
  //       return convertTime(text);
  //     },
  //   },
];

const Scanning = () => {
  const dispatch = useDispatch();
  const intervalRef = useRef();
  const { sessions, count } = useSelector((state) => state.sessions);

  const columns = [
    ...baseColumns,
    {
      title: "Tiến độ",
      key: "progress",
      align: "center",
      width: 100,
      render: (text, record) => {
        const percentage = Math.round((record?.Progress / record?.Count) * 100);
        const status = percentage !== 100 ? "active" : "success";

        return (
          <Progress
            percent={percentage}
            type="circle"
            size={30}
            status={status}
          />
        );
      },
    },
  ];

  //side effect
  useEffect(() => {
    const fetchScans = () => {
      dispatch(
        sessionSlice.actions.getSessions({
          pageSize: 1000,
          pageNumber: 1,
        })
      );
    };

    fetchScans(); // initial fetch

    intervalRef.current = setInterval(fetchScans, 10000); // fetch every 5 seconds

    return () => clearInterval(intervalRef.current); // clean
  }, [dispatch]);

  return (
    <CustomeTable
      data={sessions?.filter((e) => e?.Status === "SCANNING")}
      columns={columns}
      pagination={false}
    />
  );
};

export default Scanning;
