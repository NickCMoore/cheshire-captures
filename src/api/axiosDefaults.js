import axios from "axios";

axios.defaults.baseURL = "https://cheshire-captures-4a500dc7ab0a.herokuapp.com/";
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.withCredentials = true;