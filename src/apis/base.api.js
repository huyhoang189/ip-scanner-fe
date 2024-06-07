import axios from "axios";
import { getCookieToken } from "../utils/cookie";
import { notification } from "antd";

const jwtInterceoptor = axios.create({
  baseURL: import.meta.env.VITE_BASE_BE_URL,
  //timeout: 30000,
});

jwtInterceoptor.interceptors.request.use((config) => {
  // //console.log(process.env)
  const cookie = getCookieToken("token");

  if (cookie?.token) config.headers.Authorization = `Bearer ${cookie?.token}`;

  return config;
});

jwtInterceoptor.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error?.response?.status === 401) {
      notification.warning({
        message: "Warning!",
        description: "Account has expired. Please log in again!",
        duration: 3000,
      });
      setTimeout(function () {
        //your code to be executed after 1 second
        window.location.href = "/login";
      }, 1000);
      return;
    } else {
      return Promise.reject(error);
    }
  }
);

const _makeRequest = (createRequest) => async (args) => {
  const _headers = args.headers ? args.headers : {};
  const body = args.body ? args.body : {};
  const defaultHeaders = {};
  args = {
    ...args,
    headers: {
      ...defaultHeaders,
      ..._headers,
    },
    body,
  };
  try {
    const { data, status } = await createRequest(args);
    return { data, status };
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export default (options = {}) => {
  const instance = axios.create({
    baseURL: options?.baseURL
      ? options?.baseURL
      : import.meta.env.VITE_BASE_BE_URL,
  });

  return {
    makeRequest: _makeRequest(jwtInterceoptor),
    makeRequestUnauthorized: _makeRequest(instance),
  };
};
