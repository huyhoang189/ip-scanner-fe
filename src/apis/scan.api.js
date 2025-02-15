import createAPIServices from "./base.api";

const api = createAPIServices();

export const getBySessionId = (payload) => {
  return api.makeRequest({
    url: `/scans/get-by-session-id/${payload?.SessionID}?pageSize=${
      payload?.pageSize || 10
    }&pageNumber=${payload?.pageNumber || 1}&filter=${
      payload?.keyword || ""
    }&status=${payload?.status || ""}&identifyStatus=${
      payload?.filterOption?.IdentifyStatus || "TOTAL_RECORD"
    }`,
    method: "GET",
  });
};

export const create = (payload) => {
  return api.makeRequest({
    url: `/scans`,
    method: "POST",
    data: payload,
  });
};

export const execute = (payload) => {
  return api.makeRequest({
    url: `/scans/execute/${payload?.ID}`,
    method: "GET",
    data: payload,
  });
};

export const executeAll = (payload) => {
  return api.makeRequest({
    url: `/scans/execute-all/${payload?.ID}`,
    method: "GET",
    data: payload,
  });
};

export const identify = (payload) => {
  return api.makeRequest({
    url: `/scans/identifies/${payload?.ID}`,
    method: "PUT",
    data: payload,
  });
};

export const deleteItem = (payload) => {
  return api.makeRequest({
    url: `/scans/${payload?.ID}`,
    method: "DELETE",
  });
};

export const exportFileExcel = (payload) => {
  return api.makeRequest({
    url: `/scans/export-to-excel/${payload?.ID}`,
    method: "GET",
    responseType: "blob", // Important
  });
};
