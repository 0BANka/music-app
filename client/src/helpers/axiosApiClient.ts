import axios from "axios";

export const axiosApiClient = axios.create({
  baseURL: process.env.SERVER_URL,
});
