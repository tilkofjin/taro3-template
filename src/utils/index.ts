import Taro from "@tarojs/taro"
import { getBaseUrl } from "@/config/env";

const { baseUrl, baseImgUrl } = getBaseUrl();

// 获取完整请求路径
export const getFullUrl = (url: string) => {
  if (!url || url.includes('https://' || 'http://')) {
    throw new Error(`请求路径配置错误, 请正确配置请求路径后重试!~`)
  }
  return baseUrl + url
}

// 获取完整服务器图片路径
export const getFullImgUrl = (url: string) => {
  if (!url || url.includes('https://' || 'http://')) {
    throw new Error(`请求路径配置错误, 请正确配置请求路径后重试!~`)
  }
  return `${baseImgUrl}?path=${url}`
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

// 获取当前路由
export const getCurrentPageUrl = () => {
  if (process.env.TARO_ENV === 'weapp') {
    const pages = Taro.getCurrentPages()
    const currentPage = pages[pages.length - 1]
    return currentPage.route
  } else {
    const location = window.location
    return location.href
  }
}

// 跳转至登录页
export const pageToLogin = () => {
  const path = getCurrentPageUrl()
  if (!path.includes('login')) {
    Taro.navigateTo({
      url: "/pages/login/index"
    });
  }
}


/** 判断用户浏览器终端信息
 *  browser.versions.ios 判断是否是IOS设备
 */
export const browser = () => {
  if (navigator) {
    const u = navigator ? navigator.userAgent : '';
    return {
      trident: u.indexOf('Trident') > -1, // IE内核
      presto: u.indexOf('Presto') > -1, // opera内核
      webKit: u.indexOf('AppleWebKit') > -1, // 苹果、谷歌内核
      gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') === -1, // 火狐内核
      mobile: !!u.match(/AppleWebKit.*Mobile.*/), // 是否为移动终端
      ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
      android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, // android终端
      iPhone: u.indexOf('iPhone') > -1, // 是否为iPhone或者QQHD浏览器
      iPad: u.indexOf('iPad') > -1, // 是否iPad
      webApp: u.indexOf('Safari') === -1, // 是否web应该程序，没有头部与底部
      weixin: u.indexOf('MicroMessenger') > -1, // 是否微信
    };
  }
  return {}
}

// 防抖
export const debounce = (fuc: Function, delay = 1000) => {
  let timer: ReturnType<typeof setTimeout>
  return (...arg) => {
    clearTimeout(timer)
    timer = setTimeout(() => fuc.apply(this, arg), delay)
  }
}

// 节流
export const throttle = (fuc: Function, delay = 500) => {
  let previous = 0
  return (...args) => {
    const now = Date.now()
    if (now - previous > delay) {
      fuc.apply(this, args)
      previous = now
    }
  }
}
