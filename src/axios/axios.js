import axios from "axios";
import { Redirect } from "react-router-dom";

const instance = axios.create({
  baseURL: "http://localhost:5000/api/v1/project",
});

instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `bearer ${token}`;
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Handling API 401 error with interceptor.
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    if (error.response.status === 401) {
      <Redirect to="/logout" />;
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

export default instance;
