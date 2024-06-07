const getCurrentVietnameseTime = () => {
  // Array of Vietnamese names for days and months
  const vietnameseDays = [
    "Chủ Nhật",
    "Thứ Hai",
    "Thứ Ba",
    "Thứ Tư",
    "Thứ Năm",
    "Thứ Sáu",
    "Thứ Bảy",
  ];
  const vietnameseMonths = [
    "Tháng 1",
    "Tháng 2",
    "Tháng 3",
    "Tháng 4",
    "Tháng 5",
    "Tháng 6",
    "Tháng 7",
    "Tháng 8",
    "Tháng 9",
    "Tháng 10",
    "Tháng 11",
    "Tháng 12",
  ];

  // Get current date and time
  const currentDate = new Date();

  // Extract day, month, year, hour, and minute
  const dayOfWeek = vietnameseDays[currentDate.getDay()];
  const dayOfMonth = currentDate.getDate();
  const month = vietnameseMonths[currentDate.getMonth()];
  const year = currentDate.getFullYear();
  let hour = currentDate.getHours();
  const minute = currentDate.getMinutes();

  // Determine whether it's AM or PM
  const period = hour >= 12 ? "PM" : "AM";

  // Convert hour to 12-hour format
  hour = hour % 12;
  hour = hour ? hour : 12; // If hour is 0, set it to 12

  // Format minute with leading zero if needed
  const formattedMinute = minute < 10 ? "0" + minute : minute;

  // Construct the time string
  const currentTime = `${dayOfWeek}, ${dayOfMonth} ${month} Năm ${year} ${hour}:${formattedMinute} ${period}`;

  return currentTime;
};

const convertTime = (dateStr) => {
  const dateObj = new Date(dateStr);

  // Lấy các thành phần của ngày giờ
  const day = String(dateObj.getDate()).padStart(2, "0");
  const month = String(dateObj.getMonth() + 1).padStart(2, "0"); // Tháng bắt đầu từ 0
  const year = dateObj.getFullYear();
  const hours = String(dateObj.getHours()).padStart(2, "0");
  const minutes = String(dateObj.getMinutes()).padStart(2, "0");
  const seconds = String(dateObj.getSeconds()).padStart(2, "0");
  return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
};

export { getCurrentVietnameseTime, convertTime };
