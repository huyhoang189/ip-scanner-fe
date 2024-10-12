import createAPIServices from "./base.api";

const api = createAPIServices();

export const getAll = (payload) => {
  return api.makeRequest({
    url: `/ip-ranges?pageSize=${payload?.pageSize || 10}&pageNumber=${
      payload?.pageNumber || 1
    }&filter=${payload?.keyword || ""}`,
    method: "GET",
  });
};

export const getAllByDepartmentId = (payload) => {
  return api.makeRequest({
    url: `/ip-ranges/get-by-department-id/${payload?.departmentId}?pageSize=${
      payload?.pageSize || 10
    }&pageNumber=${payload?.pageNumber || 1}&filter=${
      payload?.keyword || ""
    }&sortField=${payload?.sortParams?.sortField || ""}&sortOrder=${
      payload?.sortParams?.sortOrder || ""
    }&activeStatus=${payload?.activeStatus || ""}`,
    method: "GET",
  });
};

export const create = (payload) => {
  return api.makeRequest({
    url: `/ip-ranges`,
    method: "POST",
    data: payload,
  });
};

export const update = (payload) => {
  return api.makeRequest({
    url: `/ip-ranges/${payload?.ID}`,
    method: "PUT",
    data: payload,
  });
};

export const updateDepartmentIdForIpRanges = (payload) => {
  return api.makeRequest({
    url: `/ip-ranges/update-department-for-list-ip-range`,
    method: "PUT",
    data: payload,
  });
};

export const deleteItem = (payload) => {
  return api.makeRequest({
    url: `/ip-ranges/${payload?.ID}`,
    method: "DELETE",
  });
};

export const statisticByDateRange = (payload) => {
  return api.makeRequest({
    url: `/ip-ranges/statistic-by-date-range?starttime=${payload?.startTime}&endtime=${payload?.endTime}`,
    method: "GET",
  });
};

export const statisticByIndentifyIpRange = (payload) => {
  return api.makeRequest({
    url: `/ip-ranges/statistic-by-identify-ip-range`,
    method: "GET",
  });
};
