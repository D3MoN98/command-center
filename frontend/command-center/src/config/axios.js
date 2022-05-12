import axios from "axios";
import toast from "react-hot-toast";

const badResponseCodeExceptions = [422];

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/",
  withCredentials: true,
});

// instance.headers.common["Accept"] = "application/json";
// instance.headers.common["Authorization"] = "AUTH TOKEN";
// instance.headers.post["Content-Type"] = "application/json";

axiosInstance.interceptors.request.use(
  (request) => {
    return request;
  },
  (error) => {
    toast.error("Something went wrong");
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (!badResponseCodeExceptions.includes(error.response.status)) {
      toast.error("Something went wrong");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
