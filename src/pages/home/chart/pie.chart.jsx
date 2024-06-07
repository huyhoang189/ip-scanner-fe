import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);
const PieChartCustome = ({ data }) => {
  const chartData = {
    labels: ["Dải địa chỉ đã định danh", "Dải địa chỉ chưa được định danh"],
    datasets: [
      {
        data: [data.IpRangeCount, data.UnIdentifyIpRangeCount],
        backgroundColor: ["#00C49F", "#FF8042"], // Adjust colors as needed
        borderColor: ["#00C49F", "#FF8042"], // Match border colors with background
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Adjust if needed
    legend: {
      labels: {
        fontSize: 16,
      },
    },
  };
  return <Pie data={chartData} options={options} height={200} width={200} />;
};

export default PieChartCustome;
