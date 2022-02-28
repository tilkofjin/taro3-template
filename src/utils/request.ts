import Taro from "@tarojs/taro";
import { getBaseUrl, noConsole } from "@/config/env";

// 获取完整请求路径
const fullUrl = (url: string, debug?: boolean) => {
  const { baseUrl, debugUrl } = getBaseUrl();

  if (!url || url.includes('https://' || 'http://')) {
    throw new Error(`请求路径配置错误, 请正确配置请求路径后重试!~`)
  }
  return (debug && debugUrl ? debugUrl : baseUrl) + url
}

// 获取缓存数据
export const getStorage = (key: string) => {
  const res = Taro.getStorageSync(key) || ''
  return res
}

// 更新缓存数据
export const updateStorage = (key: string, data: any) => {
  try {
    return Taro.setStorageSync(key, data)
  } catch (e) {
    console.log("🚀 ~ file: request.ts ~ line 14 ~ updateStorage ~ e", e)
  }
}

// 请求方法
export const request = async (options) => {
  const token = await getStorage('token')
  const { url, data, method, header, showToast = true, autoLogin = true } = options
  const headerObj = token ? { 'content-type': 'application/json', token, ...header } : {}
  if (!token) {
    Taro.showModal({
      title: '提示',
      content: '您尚未登录或登录信息已失效，请重新登陆',
      success: function (res) {
        if (res.confirm) {
          return Taro.navigateTo({ url: '/pages/login/index' })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  } else {
    Taro.showLoading({ title: '数据加载中...' })
    return Taro.request({
      url: fullUrl(url),
      data,
      header: headerObj,
      method: method.toUpperCase(),
    }).then(res => {
      const { success, message } = res.data as Utils.ResData
      if (!success && showToast) {
        Taro.showToast({
          title: `${message}`,
          duration: 2500,
          icon: 'none'
        })
      }
    }).catch(err => {
      const { message } = err
      if (showToast) {
        Taro.showToast({
          title: message,
          icon: 'none'
        })
      }
      return Promise.reject({ ...err })
    }).finally(() => Taro.hideLoading())
  }
}

// 日志
const logInterceptor = (chain) => {
  const requestParams = chain.requestParams
  const { method, data, url } = requestParams
  if (!noConsole) {
    console.log(
      `请求时间: ${new Date().toLocaleString()} \n请求方式： ${method} \n请求地址：${url} \n请求数据: ${JSON.stringify(data)}`
    );
  }
  return chain.proceed(requestParams)
    .then(res => {
      if (!noConsole) {
        console.log(
          `接口响应时间: ${new Date().toLocaleString()} \n响应数据: ${JSON.stringify(res.data)}`
        );
      }
      return res
    })
}

Taro.addInterceptor(logInterceptor)
