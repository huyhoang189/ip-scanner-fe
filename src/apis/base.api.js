import axios from "axios";
import { getCookieToken } from "../utils/cookie";
import { notification } from "antd";
import { TOKEN_VERIFY } from "../utils/common";

const backendURL =
  localStorage.getItem("backendURL") || "http://localhost:8080";

const jwtInterceoptor = axios.create({
  baseURL: backendURL,
  //timeout: 30000,
});

jwtInterceoptor.interceptors.request.use((config) => {
  // //console.log(process.env)
  const cookie = getCookieToken(TOKEN_VERIFY);

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
      }, 3000);
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
  // console.log(args);

  try {
    const { data, status } = await createRequest(args);
    return { data, status };
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export default (options = {}) => {
  console.log(options);
  const instance = axios.create({
    baseURL: options?.baseURL ? options?.baseURL : backendURL,
  });

  return {
    makeRequest: _makeRequest(jwtInterceoptor),
    makeRequestUnauthorized: _makeRequest(instance),
  };
};
