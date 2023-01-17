import axios, { type AxiosProxyConfig } from "axios";
interface ruleConfig {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  headers?: {
    [key: string]: string;
  };
  timeout?: number;
  params?: {
    [key: string]: string;
  };
  data?: { [key: string]: any };
  responseType?: "arraybuffer" | "blob" | "json" | "text";
  proxy?: AxiosProxyConfig | false;
}

// 封装一个请求中间件
export function useRequest(
  url: string,
  config: ruleConfig = {
    method: "GET",
  }
) {
  const response = axios(url, { ...config }).then(
    (res) => {
      return { ...res };
    },
    (err) => {
      return { ...err, status: -1 };
    }
  );
  return response;
}
