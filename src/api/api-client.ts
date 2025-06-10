import axios, { AxiosInstance } from "axios";
import config from "../config"; // Change this to your API URL

import Cookies from "js-cookie";

const brotherFinance = JSON.parse(Cookies.get("brotherFinance") ?? "{}");
export const api: AxiosInstance = axios.create({
  baseURL: config.BASE_URL,
  withCredentials: true, // Allows sending cookies
  headers: {
    Authorization: `Bearer ${brotherFinance?.token ?? ""}`,
  },
});
