import axios from "axios";

// Set the base URL directly to the CodeInstitute backend address
axios.defaults.baseURL = "https://8000-nickcmoore-cheshirecapt-7hlvafv7oid.ws.codeinstitute-ide.net/";

axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.withCredentials = true;

export const axiosReq = axios.create();
export const axiosRes = axios.create();
