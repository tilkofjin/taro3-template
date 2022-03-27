import Taro from "@tarojs/taro";
import { pageToLogin } from "./index";

// 状态码
const codeMessage: Record<number, string> = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户信息已失效，请重启登录',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '您请求的资源不存在，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

// 日志
const logInterceptor = (chain) => {
  const requestParams = chain.requestParams
  const { method, data, url } = requestParams
  // 是否打印日志
  const accountInfo = process.env.TARO_ENV === 'weapp' && Taro.getAccountInfoSync();
  const { envVersion }: any = accountInfo && accountInfo.miniProgram;
  const getConsole = (process.env.NODE_ENV === 'production' || envVersion === 'release') ?? false
  if (getConsole) {
    console.log(
      `请求时间: ${new Date().toLocaleString()} \n请求方式： ${method} \n请求地址：${url} \n请求数据: ${JSON.stringify(data)}`
    );
  }
  return chain.proceed(requestParams)
    .then(res => {
      if (getConsole) {
        console.log(
          `接口响应时间: ${new Date().toLocaleString()} \n响应数据: ${JSON.stringify(res?.data)}`
        );
      }
      return res
    })
}


const customInterceptor = (chain) => {
  const requestParams = chain.requestParams
  return chain.proceed(requestParams).then((res: any) => {
    // 只要请求成功，不管返回什么状态码，都走这个回调
    switch (res.data.code) {
      case 404:
        return Promise.reject(codeMessage[404])
      case 502:
        return Promise.reject(codeMessage[502])
      case 403:
        Taro.setStorageSync("token", "")
        pageToLogin()
        // TODO 根据自身业务修改
        return Promise.reject("抱歉，您没有权限访问");
      case 401:
        Taro.setStorageSync("token", "")
        pageToLogin()
        return Promise.reject(codeMessage[401])
      case 200:
        return res.data
    }
  })
}

const interceptors = [customInterceptor, logInterceptor]

export default interceptors
