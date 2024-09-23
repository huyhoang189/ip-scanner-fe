import createAPIServices from "./base.api";

const api = createAPIServices();

export const getAll = (payload) => {
  return api.makeRequest({
    url: `/schedules`,
    method: "GET",
  });
};

export const create = (payload) => {
  return api.makeRequest({
    url: `/schedules`,
    method: "POST",
    data: payload,
  });
};

export const update = (payload) => {
  return api.makeRequest({
    url: `/schedules/${payload?.ID}`,
    method: "PUT",
    data: payload,
  });
};
