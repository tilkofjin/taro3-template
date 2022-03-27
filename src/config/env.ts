import Taro from "@tarojs/taro"

// 当前开发环境变量
export const NODE_ENV = process.env.NODE_ENV
// 当前平台环境变量
export const TARO_ENV = process.env.TARO_ENV

export const getBaseUrl = () => {
  // 获取当前帐号信息
  const accountInfo = TARO_ENV === 'weapp' && Taro.getAccountInfoSync();
  const { envVersion }: any = accountInfo && accountInfo.miniProgram;
  const baseRequest: any = {}
  if (process.env.TARO_ENV === 'weapp') {
    switch (envVersion) {
      case 'develop':
        baseRequest.baseUrl = 'https://www.xxx.com';
        baseRequest.baseImgUrl = '';
        break;
      case 'trial':
        baseRequest.baseUrl = 'https://www.xxx.com';
        baseRequest.baseImgUrl = '';
        break;
      case 'release':
        baseRequest.baseUrl = 'https://www.xxx.com';
        baseRequest.baseImgUrl = '';
        break;
    }
  }
  if (process.env.TARO_ENV === 'h5') {
    baseRequest.baseUrl = '/proxyH5';
    baseRequest.debugUrl = '/localDebugH5';
  }
  return baseRequest
}