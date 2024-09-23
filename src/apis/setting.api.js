import createAPIServices from "./base.api";

const api = createAPIServices();

export const getAll = (payload) => {
  return api.makeRequest({
    url: `/settings`,
    method: "GET",
  });
};

export const create = (payload) => {
  return api.makeRequest({
    url: `/settings`,
    method: "POST",
    data: payload,
  });
};

export const update = (payload) => {
  return api.makeRequest({
    url: `/settings/${payload?.ID}`,
    method: "PUT",
    data: payload,
  });
};
