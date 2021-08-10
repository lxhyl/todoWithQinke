import axios from "axios";

const service = axios.create({
  timeout: 10000,
  baseURL: "/todoApi",
  withCredentials: true
});

// 请求拦截处理
service.interceptors.request.use(request => {
  return request;
});

// 响应拦截
service.interceptors.response.use(
  response => {
    const code = response.status;
    if (code !== 200) {
      return Promise.reject(response);
    }
    return Promise.resolve(response.data);
  },
  err => {
    return Promise.reject(err);
  }
);

export default service;
