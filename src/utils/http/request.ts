import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import NProgress from 'nprogress' // 引入nprogress插件
import 'nprogress/nprogress.css'  // 这个nprogress样式必须引入
import { message } from "antd";

interface ResponseData<T> {
  code: number;
  data: T;
  message: string;
}

const request = axios.create({
  baseURL: process.env.REACT_APP_API,
  timeout: 10000,
  headers: {},
});

// 请求拦截器函数：发送请求之前触发的函数
request.interceptors.request.use((config: AxiosRequestConfig) => {
  // 进度条显示
  NProgress.start()
  const token = localStorage.getItem("token");
  // 携带token
  if (token) {
    (config.headers as any).token = token;
  }
  return config;
});

// 响应拦截器函数：得到响应之后触发的函数
request.interceptors.response.use(
  (response: AxiosResponse<ResponseData<any>>) => {
    try {
      if (response.data.code === 200) {
        return response.data.data;
      } else {
        message.error(response.data.message);
        return Promise.reject(response.data.message);
      }
    } finally {
      // 进度条隐藏
      NProgress.done()
    }
  },
  (error) => {
    message.error(error);
    return Promise.reject(error);
  }

);

export default request;
