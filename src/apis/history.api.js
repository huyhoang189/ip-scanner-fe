import createAPIServices from "./base.api";

const api = createAPIServices();

export const getByIpRange = (payload) => {
  return api.makeRequest({
    url: `/histories/${payload.IpRangeID}?pageSize=${
      payload?.pageSize || 10
    }&pageNumber=${payload?.pageNumber || 1}`,
    method: "GET",
  });
};

export const create = (payload) => {
  return api.makeRequest({
    url: `/histories`,
    method: "POST",
    data: payload,
  });
};

export const creates = (payload) => {
  return api.makeRequest({
    url: `/histories/creates`,
    method: "POST",
    data: payload,
  });
};

export const deleteItem = (payload) => {
  return api.makeRequest({
    url: `/histories/${payload?.ID}`,
    method: "DELETE",
  });
};
