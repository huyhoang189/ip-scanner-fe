import { useEffect, useState } from "react";
import { ContentWrapper } from "../../assets/styles/contentWrapper.style";
import CustomBreadcrumb from "../../components/breadcrumb";
import statisticSlice from "../../toolkits/statistics/slice";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  Col,
  Divider,
  Flex,
  Row,
  Space,
  Statistic,
  Typography,
} from "antd";
import PieChartCustome from "./chart/pie.chart";
import LineChart from "./chart/line.chart";
import {
  ArrowUpOutlined,
  BarChartOutlined,
  CloudSyncOutlined,
  FileUnknownFilled,
  GlobalOutlined,
  PartitionOutlined,
  ScanOutlined,
} from "@ant-design/icons";
import StatisticView from "../../components/Statistic";
import useResizeObserver from "../../hooks/useResizeObserver";
// import SimpleBarChart from "./chart/department.chart";
// import SessionBarChart from "./chart/sessions.chart";
import Scanning from "./scanning";
import ApexLine from "../../components/ApexChart/Line";
import ApexPie from "../../components/ApexChart/Pie";
import ApexBar from "../../components/ApexChart/Bar";
const pageHeader = {
  breadcrumb: [
    {
      title: "Trang chủ",
      href: "/",
    },
  ],
};

const getTimeRange = () => {
  // Get current date
  const currentDate = new Date();

  // Calculate duration for 30 days
  const duration = 30 * 24 * 60 * 60 * 1000; // Milliseconds for 30 days
  const duration_date = 24 * 60 * 60 * 1000; // Milliseconds for 1 day

  // Subtract duration from current date to get previous date
  const previousDate = new Date(currentDate.getTime() - duration);

  // Format dates in dd/mm/yyyy using helper function
  const formattedPreviousDate = formatDate(previousDate);
  const formattedCurrentDate = formatDate(currentDate);

  let dates = [];
  for (let i = 0; i < 32; i++) {
    let item = formatDate(new Date(previousDate.getTime() + i * duration_date));
    dates.push(item);
  }

  return {
    startTime: formattedPreviousDate,
    endTime: formattedCurrentDate,
    dates,
  };
};

const formatDate = (date) => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
};

const Home = () => {
  const dispatch = useDispatch();
  const { countIpRange, countWithDateRange, overview, sessions } = useSelector(
    (state) => state.statistics
  );

  const [lineBarRef, lineBarWidth] = useResizeObserver();
  const [pieRef, pieWidth] = useResizeObserver();

  const [lineData, setLineData] = useState([]);

  useEffect(() => {
    const time = getTimeRange();
    const { startTime, endTime } = time;
    dispatch(statisticSlice.actions.getCountIpRange());
    dispatch(
      statisticSlice.actions.getCountWithDateRange({ startTime, endTime })
    );
    dispatch(statisticSlice.actions.getOverview());
    dispatch(statisticSlice.actions.getSessions());
  }, [dispatch]);

  useEffect(() => {
    if (countWithDateRange) {
      const time = getTimeRange();
      const { dates } = time;
      let data = dates.map((e) => ({
        date: e,
        count: countWithDateRange[e] || 0,
      }));

      data.map((e, i) => {
        if (i === 0)
          data[i].count =
            parseInt(data[i].count) +
              parseInt(countWithDateRange["SrcCount"]) || 0;
        else
          data[i].count =
            parseInt(data[i].count) + parseInt(data[i - 1].count) || 0;
      });

      setLineData(data);
    }
  }, [countWithDateRange]);

  return (
    <ContentWrapper>
      <CustomBreadcrumb items={pageHeader.breadcrumb} />
      <StatisticView
        data={[
          {
            title: "Đơn vị trên địa bàn",
            count: overview?.DepartmentCount,
            icon: (
              <PartitionOutlined
                style={{
                  fontSize: "30px",
                  color: "#fff",
                  margin: "0 10px 0 0",
                  backgroundColor: "#007bff",
                  padding: 10,
                  borderRadius: 10,
                }}
              />
            ),
            path: "/systems/systems-departments",
          },
          // {
          //   title: "Tổng số dải địa chỉ",
          //   count: overview?.IpRangeCount + countIpRange?.IpRangeCount,
          //   icon: (
          //     <GlobalOutlined
          //       style={{
          //         fontSize: "30px",
          //         color: "#fff",
          //         margin: "0 10px 0 0",
          //         backgroundColor: "#36BA98",
          //         padding: 10,
          //         borderRadius: 10,
          //       }}
          //     />
          //   ),
          //   path: "/ipranges",
          // },
          {
            title: "Dải địa chỉ đã được định danh",
            count: countIpRange?.IpRangeCount,
            icon: (
              <GlobalOutlined
                style={{
                  fontSize: "30px",
                  color: "#fff",
                  margin: "0 10px 0 0",
                  backgroundColor: "#36BA98",
                  padding: 10,
                  borderRadius: 10,
                }}
              />
            ),
            path: "/ipranges",
          },
          {
            title: "Dải địa chỉ chưa định danh",
            count: overview?.StrangeIpRangeCount,
            icon: (
              <FileUnknownFilled
                style={{
                  fontSize: "30px",
                  color: "#fff",
                  margin: "0 10px 0 0",
                  backgroundColor: "#FF8042",
                  padding: 10,
                  borderRadius: 10,
                }}
              />
            ),
            path: "/reports/reports-ipranges/UNIDENTIFIED",
          },
          {
            title: "Tổng số phiên quét",
            count: overview?.SessionCount,
            icon: (
              <ScanOutlined
                style={{
                  fontSize: "30px",
                  color: "#fff",
                  margin: "0 10px 0 0",
                  backgroundColor: "#939185",
                  padding: 10,
                  borderRadius: 10,
                }}
              />
            ),
            path: "/sessions",
          },
        ]}
      />

      <Row gutter={16} style={{ marginBottom: 10 }}>
        <Col span={18}>
          <Flex vertical style={{ width: "100%" }} gap={10}>
            <Card ref={lineBarRef}>
              <Typography.Text style={{ fontWeight: "bold" }}>
                Biểu đồ phát hiện số lượng dải địa chỉ mới trong 30 ngày
              </Typography.Text>
              {/* <LineChart data={lineData} width={Math.round(lineBarWidth)} /> */}
              <ApexLine data={lineData} />
            </Card>
            <Card ref={lineBarRef}>
              <Typography.Text style={{ fontWeight: "bold" }}>
                Các phiên quét đang được thực hiện
              </Typography.Text>
              <Scanning />
            </Card>
          </Flex>
        </Col>
        <Col span={6}>
          <Flex vertical gap={10}>
            <Card ref={pieRef}>
              <Typography.Text style={{ fontWeight: "bold" }}>
                Biểu đồ thống kê số lượng dải địa chỉ được định danh
              </Typography.Text>

              <ApexPie data={countIpRange} />
            </Card>
            <Card>
              <Typography.Text style={{ fontWeight: "bold" }}>
                Biểu đồ thống kê trạng thái phiên quét
              </Typography.Text>
              <ApexBar data={sessions} />
            </Card>
          </Flex>
        </Col>
      </Row>
    </ContentWrapper>
  );
};
export default Home;
