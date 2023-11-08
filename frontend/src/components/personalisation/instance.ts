import axios, { AxiosResponse } from "axios";

const axiosInstance = axios.create({
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
});

let isRetry = false;

axiosInstance.interceptors.response.use(
  (config: AxiosResponse) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && error.config && !isRetry) {
      isRetry = true;
      try {
        const token = await axiosInstance.put("/pers/refrash");
        if (token) {
          localStorage.setItem("token", token.data.accessToken);
          return axiosInstance.request(originalRequest);
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log("all tokens is dead");
    }
  }
);

export default axiosInstance;
