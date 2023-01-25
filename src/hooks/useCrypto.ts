import dayjs from "dayjs";
import CryptoJS from "crypto-js";
import { ref } from "vue";

/**
 * @author Leroy
 * * 这里都是后端要做的事情，前端只负责接收token，存储token，发送token，一般来说不负责加密解密。
 * ! 1.获取一个散列密钥（一次性密钥(盐)，存储在数据库中）
 * ! 2.将要加密的信息，混合构造, 通常是对象，字符串，数组等。
 * ! 3.加入新的信息，用盐，再次加密。
 */

export const useAuthUser = (
  username: string = "admin",
  password: string = "admin"
) => {
  const token = ref<any>("");
  // 用户名和密码生成盐
  const key = CryptoJS.SHA256(JSON.stringify({ username, password })).toString();
  // 再获取当前时间戳，用盐生成token。
  const createToken = () => {
    const now = dayjs().unix();
    // 给与不同的权限等级，路由和再请求，就好操作不少。
    const message = JSON.stringify({ datatime: now, level: 10 });
    token.value = CryptoJS.AES.encrypt(message, key).toString();
  };
  createToken();

  // 验证token中的时间戳（这里就确保了，后端无法解密出第一层用户名和密码，但可以解密出第二层的时间戳）
  const checkTokenTimeOut = (token: string) => {
    const now = dayjs().unix();
    const message = CryptoJS.AES.decrypt(token, key);
    const old = JSON.parse(message.toString(CryptoJS.enc.Utf8));
        
    // 时间差
    if (now - old.datatime > 60 * 60 * 24) {  
      return false;
    }  
    return true;
  };

  return { token, checkTokenTimeOut };
};
