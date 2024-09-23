import createAPIServices from "./base.api";

const api = createAPIServices();

export const getAll = (payload) => {
  return api.makeRequest({
    url: `/users?pageSize=${payload?.pageSize || 10}&pageNumber=${
      payload?.pageNumber || 1
    }`,
    method: "GET",
  });
};

export const create = (payload) => {
  return api.makeRequest({
    url: `/users`,
    method: "POST",
    data: payload,
  });
};

export const update = (payload) => {
  return api.makeRequest({
    url: `/users/${payload?.ID}`,
    method: "PUT",
    data: payload,
  });
};

export const deleteItem = (payload) => {
  return api.makeRequest({
    url: `/users/${payload?.ID}`,
    method: "DELETE",
  });
};

export const login = (payload) => {
  return api.makeRequestUnauthorized({
    url: `/auth/login`,
    method: "POST",
    data: payload,
  });
};
