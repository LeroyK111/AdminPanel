import axios, { type AxiosProxyConfig } from "axios";
import { reactive } from "vue";
interface ruleConfig {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  headers?: {
    [key: string]: string;
  };
  timeout?: number;
  params?: {
    [key: string]: string;
  };
  data?: { [key: string]: string };
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
  const response = reactive<any>({
    status: 0,
    data: {},
    message: "",
  });
  axios(url, { ...config }).then(
    (result) => {
      response.status = result.status;
      response.data = result.data;
    },
    (err) => {
      response.message = err.message;
      response.status = -1;
    }
  );

  return response;
}
