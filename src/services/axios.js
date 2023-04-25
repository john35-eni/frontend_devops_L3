import axios from "axios";

const baseURL = "http://ec2-3-94-211-7.compute-1.amazonaws.com:6565/api/v1";

const axiosInstance = axios.create({
  baseURL,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default axiosInstance;
