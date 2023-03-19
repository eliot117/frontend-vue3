import axios from "axios";

const API = `${process.env.VUE_APP_API_URL}`;
const instance = axios.create({
  baseURL: API,
});

instance.defaults.headers.post["Content-Type"] = "application/json";

instance.interceptors.request.use(
  (configs) => {
    const config = configs;
    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;