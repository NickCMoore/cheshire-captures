import axios from "axios";

axios.defaults.baseURL = "https://8000-nickcmoore-cheshirecapt-i1catxh7zvz.ws-eu116.gitpod.io/";
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.withCredentials = true;

export const axiosReq = axios.create();
export const axiosRes = axios.create();