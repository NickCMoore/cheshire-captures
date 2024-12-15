import axios from "axios";

axios.defaults.baseURL =
  "https://cheshire-captures-backend-084aac6d9023.herokuapp.com/";

axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.withCredentials = true;

export const axiosReq = axios.create();
export const axiosRes = axios.create();
