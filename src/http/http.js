import axios from "axios";
import cookie from "react-cookies";
const BASE_URI = import.meta.env.VITE_BACKEND_BASE_URI;
const BASE_URI_V2 = import.meta.env.VITE_BACKEND_BASE_URI + "/v2";

let axiosAPI = axios.create({
  baseURL: BASE_URI,
});

// let currentToken = null;
// const updateToken = (token) => {
//   currentToken = token;
// };

axiosAPI.interceptors.request.use(
  async (config) => {
    config.headers.Authorization =
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwMTc5OWRiMTJlZTA0MDAyMzY0ZDJjOSIsImlhdCI6MTc1OTgxNjgyOCwiZXhwIjoxNzYyNDA4ODI4fQ.nBBBaowLhmZrCmsEwKWl6OLf0FpAt_6MIsPtfK17llc";

    return config;
  },
  (error) => Promise.reject(error)
);
const redirectToHome = () => {
  // TODO: add toast message
  window.location.href = "/";
};
const redirectToLogin = () => {
  // TODO: add toast message
  cookie.remove("SDPLUS_TOKEN");
  window.location.href = "/";
};
const handleError = (error) => {
  if (error?.response?.status === 403) redirectToHome();
  if (error?.response?.status === 401) redirectToLogin();
  throw error;
};
const getRequest = async (url, ...opts) => {
  try {
    return await axiosAPI.get(url, ...opts);
  } catch (error) {
    handleError(error);
  }
};
const postRequest = async (url, body) => {
  try {
    return await axiosAPI.post(url, body);
  } catch (error) {
    handleError(error);
  }
};
const putRequest = async (url, body) => {
  try {
    return await axiosAPI.put(url, body);
  } catch (error) {
    handleError(error);
  }
};
const deleteRequest = async (url, data = {}) => {
  try {
    return await axiosAPI.delete(url, {
      data: data,
    });
  } catch (error) {
    handleError(error);
  }
};
const api = {
  get: getRequest,
  post: postRequest,
  put: putRequest,
  delete: deleteRequest,
};
export { api, BASE_URI, BASE_URI_V2 };
