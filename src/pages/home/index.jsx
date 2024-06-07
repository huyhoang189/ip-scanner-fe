import { useEffect, useState } from "react";
import { ContentWrapper } from "../../assets/styles/contentWrapper.style";
import CustomBreadcrumb from "../../components/breadcrumb";
import statisticSlice from "../../toolkits/statistics/slice";
import { useDispatch, useSelector } from "react-redux";
import { Card, Col, Row, Space, Statistic, Typography } from "antd";
import PieChartCustome from "./chart/pie.chart";
import LineChart from "./chart/line.chart";
import {
  ArrowUpOutlined,
  BarChartOutlined,
  CloudSyncOutlined,
  GlobalOutlined,
  PartitionOutlined,
  ScanOutlined,
} from "@ant-design/icons";
import StatisticView from "../../components/Statistic";
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
  for (let i = 0; i < 31; i++) {
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
  const { countIpRange, countWithDateRange } = useSelector(
    (state) => state.statistics
  );

  const [lineData, setLineData] = useState([]);

  useEffect(() => {
    const time = getTimeRange();
    const { startTime, endTime } = time;
    dispatch(statisticSlice.actions.getCountIpRange());
    dispatch(
      statisticSlice.actions.getCountWithDateRange({ startTime, endTime })
    );
  }, [dispatch]);

  useEffect(() => {
    if (countWithDateRange) {
      const time = getTimeRange();
      const { dates } = time;
      let data = dates.map((e) => ({
        date: e,
        count: countWithDateRange[e] | 0,
      }));

      data.map((e, i) => {
        if (i === 0)
          data[i].count =
            parseInt(data[i].count) + parseInt(countWithDateRange["SrcCount"]);
        else
          data[i].count = parseInt(data[i].count) + parseInt(data[i - 1].count);
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
            count: 28,
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
            description: "Tăng so với tháng trước",
          },
          {
            title: "Dải địa chỉ IP",
            count: 6,
            icon: (
              <GlobalOutlined
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
            description: "Tăng so với tháng trước",
          },
          {
            title: "Phiên đã quét",
            count: 1,
            icon: (
              <ScanOutlined
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
            description: "Giảm so với tháng trước",
          },
          {
            title: "Phiên đang quét",
            count: 0,
            icon: (
              <CloudSyncOutlined
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
            description: "Giảm so với tháng trước",
          },
        ]}
      />
      <Row gutter={16}>
        <Col span={16}>
          <Typography.Text style={{ fontWeight: "bold" }}>
            Biểu đồ phát hiện số lượng dải địa chỉ mới trong 30 ngày
          </Typography.Text>
        </Col>
        <Col span={8}>
          <Typography.Text style={{ fontWeight: "bold" }}>
            Biểu đồ thống kê số lượng dải địa chỉ được định danh
          </Typography.Text>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={16}>
          <LineChart data={lineData} />
        </Col>
        <Col span={8}>
          <PieChartCustome data={countIpRange} />
        </Col>
      </Row>
    </ContentWrapper>
  );
};
export default Home;
