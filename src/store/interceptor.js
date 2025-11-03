import Axios from "axios";
import { baseApi } from "../../config";

// Base API URL
const BASE_URL = baseApi;

// Common Request Interceptor
const attachAuthToken = async (config) => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    config.headers.authorization = accessToken;
  }
  return config;
};

// Common Error Handler
const handleErrorResponse = (error) => {
  const statusCode =
    error?.response?.status || error?.message?.split(" ").pop();
  switch (parseInt(statusCode, 10)) {
    case 401:
      localStorage.clear();
      window.location.href = "/auth/sign-in";
      break;
    case 404:
    case 400:
      throw error?.response;
    case 405:
      throw new Error("Method is not allowed");
    case 500:
      throw new Error(
        "Server is facing technical difficulties. Please contact the administrator."
      );
    default:
      throw error;
  }
};

// Create Axios Instances
export const http = Axios.create({
  baseURL: BASE_URL,
  headers: { Accept: "application/json" },
});

export const formData_instance = Axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

// Attach Interceptors to Instances
[http, formData_instance].forEach((instance) => {
  // Request Interceptor
  instance.interceptors.request.use(attachAuthToken);

  // Response Interceptor
  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      handleErrorResponse(error);
      return Promise.reject(error);
    }
  );
});
