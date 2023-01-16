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

interface ruleRes {
  res: {
    status: number;
    data?: any;
  };
}

// 封装一个请求中间件
export function useRequest(
  url: string,
  config: ruleConfig = {
    method: "GET",
  }
): ruleRes {
  const res = reactive({
    data: {},
    status: 200,
  });

  axios(url, { ...config }).then(
    (resolve) => {
      res.data = resolve.data;
    },
    (reason) => {
      res.data = reason;
      res.status = 0;
    }
  );

  return { res };
}
