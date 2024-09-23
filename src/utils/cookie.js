const getCookieToken = (_cookieKey) => {
  const cookies = document.cookie.split(";");
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split("=");
    if (name === _cookieKey) {
      return JSON.parse(value);
    }
  }
  return null;
};

// Function to clear the token from cookies
const clearCookieToken = (_cookieKey) => {
  document.cookie = `${_cookieKey}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

// const insertCookieToken = (_cookieKey, payload, timeExpired) => {
//   const timeExpiredSeconds = parseInt(timeExpired, 10); // Convert the string to an integer
//   const expirationTime = timeExpiredSeconds * 1000; // Convert seconds to milliseconds
//   const expirationDate = new Date(Date.now() + expirationTime); // Calculate the expiration date

//   document.cookie = `${_cookieKey}=${JSON.stringify(
//     payload
//   )}; expires=${expirationDate.toUTCString()}; path=/;`;
// };

const insertCookieToken = (_cookieKey, payload, timeExpired) => {
  // Chuyển thời gian hết hạn từ giây (UNIX timestamp) sang milliseconds
  const expirationTime = new Date(timeExpired * 1000); // timeExpired là UNIX timestamp

  // Lưu cookie với thời gian hết hạn cụ thể
  document.cookie = `${_cookieKey}=${JSON.stringify(
    payload
  )}; expires=${expirationTime.toUTCString()}; path=/;`;
};

export { getCookieToken, clearCookieToken, insertCookieToken };
