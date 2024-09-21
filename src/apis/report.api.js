import createAPIServices from "./base.api";

const api = createAPIServices();

export const getReportIpRange = (payload) => {
  return api.makeRequest({
    url: `/reports/get-report-ip-range?identifyStatus=${
      payload?.identifyStatus || "TOTAL_RECORD"
    }&pageSize=${payload?.pageSize || 10}&pageNumber=${
      payload?.pageNumber || 1
    }&filter=${payload?.keyword || ""}`,
    method: "GET",
  });
};

export const getReportSession = (payload) => {
  return api.makeRequest({
    url: `/reports/get-report-session-history?pageSize=${
      payload?.pageSize || 10
    }&pageNumber=${payload?.pageNumber || 1}&filter=${payload?.keyword || ""}`,
    method: "GET",
  });
};
