import axios from "axios";
import { path } from "../../common/routesNames";
import { getToken } from "../localstorage";

// const baseUrl = process.env.REACT_APP_BASE_API_URL;
// const baseUrl = "https://devapiv2.noduk.com/api/"; // for testing
const baseUrl = "http://localhost:8000/"; // for testing
// const baseUrl = 'https://api.noduk.com'; // for production

const axiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

const axiosMultiPartInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    Accept: 'multipart/form-data',
    'Content-Type': 'multipart/form-data',
    'Access-Control-Allow-Origin': '*',
  },
});

axiosInstance.interceptors.request.use(function (config) {
  config.headers["Authorization"] = getToken();
  return config;
});
axiosMultiPartInstance.interceptors.request.use(function (config) {
  config.headers["Authorization"] = getToken();
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { status } = error.response;
    if (status === 500) {
      window.location.href = path.errorPage;
    }
  }
);

// axiosMultiPartInstance.interceptors.request.use(function (config) {
//   config.headers['Authorization'] = getToken();
//   return config;
// });

export { axiosInstance ,axiosMultiPartInstance};
