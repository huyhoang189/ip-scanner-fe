import createAPIServices from "./base.api";

const api = createAPIServices();

export const statisticOverview = (payload) => {
  return api.makeRequest({
    url: `/statistics/overview`,
    method: "GET",
  });
};

export const statisticSessions = (payload) => {
  return api.makeRequest({
    url: `/statistics/sessions`,
    method: "GET",
  });
};
