import Taro from "@tarojs/taro"

// 当前开发环境变量
const NODE_ENV = process.env.NODE_ENV
// 当前平台环境变量
const TARO_ENV = process.env.TARO_ENV

// 是否打印日志
export const noConsole = (NODE_ENV === 'production' || NODE_ENV === 'uat') ?? false

export const getBaseUrl = () => {
  const accountInfo = TARO_ENV === 'weapp' && Taro.getAccountInfoSync();  // 获取当前帐号信息
  const { envVersion }: any = accountInfo && accountInfo.miniProgram;
  const baseRequest: any = {}
  if (TARO_ENV === 'weapp') {
    switch (envVersion) {
      case 'develop':
        baseRequest.baseUrl = '';
        break;
      case 'trial':
        baseRequest.baseUrl = ``;
        break;
      case 'release':
        baseRequest.baseUrl = '';
        break;
    }
  }
  if (TARO_ENV === 'h5') {
    baseRequest.baseUrl = '/proxyH5';
    baseRequest.debugUrl = '/localDebugH5';
  }
  return baseRequest
}