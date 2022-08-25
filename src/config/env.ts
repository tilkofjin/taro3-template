import Taro from "@tarojs/taro"

export const getBaseUrl = () => {
  // 获取当前帐号信息
  const accountInfo = IS_WEAPP && Taro.getAccountInfoSync();
  const { envVersion }: any = accountInfo && accountInfo.miniProgram;
  const baseRequest: any = {}
  if (IS_WEAPP) {
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
  if (IS_H5) {
    baseRequest.baseUrl = '/api';
  }
  return baseRequest
}