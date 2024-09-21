import createAPIServices from "./base.api";

const api = createAPIServices();

export const getAll = (payload) => {
  return api.makeRequest({
    url: `/curators/get-by-department/${payload.DepartmentID}`,
    method: "GET",
  });
};

export const getAllByDepartmentId = (payload) => {
  return api.makeRequest({
    url: `/curators/get-by-departments/${payload.departmentId}?pageSize=${
      payload?.pageSize || 10
    }&pageNumber=${payload?.pageNumber || 1}&filter=${payload?.keyword || ""}`,
    method: "GET",
  });
};

export const create = (payload) => {
  return api.makeRequest({
    url: `/curators`,
    method: "POST",
    data: payload,
  });
};

export const update = (payload) => {
  return api.makeRequest({
    url: `/curators/${payload?.ID}`,
    method: "PUT",
    data: payload,
  });
};

export const deleteItem = (payload) => {
  return api.makeRequest({
    url: `/curators/${payload?.ID}`,
    method: "DELETE",
  });
};
