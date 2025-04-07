import axios, { AxiosInstance, AxiosError } from "axios";
import Cookies from "js-cookie";
const BASE_URL = "http://localhost:3000/api/v1"; // Change this to your API URL
export const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // Allows sending cookies
});

let accessToken: string | null = null; // Store access token in memory

// Function to refresh access token
const refreshAccessToken = async () => {
  try {
    const res = await axios.post(
      `${BASE_URL}/admin/auth/refresh`,
      {},
      { withCredentials: true }
    );
    accessToken = res.data.accessToken; // Update in-memory token
    Cookies.set("accessToken", accessToken ?? "");
    return accessToken;
  } catch (error) {
    console.error("Refresh token failed, logging out...", error);
    accessToken = null;
    return null;
  }
};

// Axios Request Interceptor
// eslint-disable-next-line @typescript-eslint/no-explicit-any
api.interceptors.request.use(async (config: any) => {
  if (!config.headers) {
    config.headers = {};
  }
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

// Axios Response Interceptor (Handle Token Expiry)
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const originalRequest = error.config as any;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Prevents infinite retry loop
      accessToken = await refreshAccessToken();

      if (accessToken) {
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return api(originalRequest);
      }
    }

    return Promise.reject(error);
  }
);
