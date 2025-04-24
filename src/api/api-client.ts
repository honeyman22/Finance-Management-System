import axios, { AxiosInstance } from "axios";
import config from "../config";
// Change this to your API URL
export const api: AxiosInstance = axios.create({
  baseURL: config.BASE_URL,
  withCredentials: true, // Allows sending cookies
});
