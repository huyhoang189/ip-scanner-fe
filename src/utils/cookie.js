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

const insertCookieToken = (_cookieKey, payload) => {
  const expirationDate = new Date(Date.now() + 30 * 60 * 1000); // 30 minutes
  document.cookie = `${_cookieKey}=${JSON.stringify(
    payload
  )}; expires=${expirationDate.toUTCString()}; path=/;`;
};
export { getCookieToken, clearCookieToken, insertCookieToken };
