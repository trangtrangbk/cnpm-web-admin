import axios from "axios";
import { BASE_URL } from "./config";

export const request = (opts = {}, optsHeader = {}) => {
  const token = localStorage.getItem("token");
  const defaultOptions = {
    ...opts,
    headers: !token
      ? optsHeader
      : {
          ...optsHeader,
          Authorization: token
        }
  };
  /*
  |--------------------------------------------------
  | Custom axios api
  |--------------------------------------------------
  */

  const axiosApi = axios.create({
    baseURL: BASE_URL,
    ...defaultOptions
  });

  return axiosApi;
};

export default request;