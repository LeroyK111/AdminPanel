import { reactive } from "vue";

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
  const res = reactive({
    data: {},
    status: 0,
  });

  axios(url, { ...config }).then(
    (resolve) => {
      res.data = resolve.data;
    },
    (reason) => {
      res.status = 1;
    }
  );

  return { res };
}
