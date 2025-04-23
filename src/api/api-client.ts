import axios, { AxiosInstance, AxiosError } from "axios";
const BASE_URL = "https://finance-backend-alc7.onrender.com/api/v1/"; // Change this to your API URL
export const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // Allows sending cookies
});

// Axios Response Interceptor (Handle Token Expiry)
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as any;

    if (error.response?.status === 401 && !originalRequest._retry) {
      console.log("Iam here");
    }

    return Promise.reject(error);
  }
);
