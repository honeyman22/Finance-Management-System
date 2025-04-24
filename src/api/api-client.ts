import axios, { AxiosInstance } from "axios";const BASE_URL = "http://localhost:3000/api/v1/"; // Change this to your API URL
export const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // Allows sending cookies
});
