import Taro from "@tarojs/taro"

// 获取当前路由
export const getCurRoute = () => {
  if (process.env.TARO_ENV === 'weapp') {
    const curPages = Taro.getCurrentPages()
    return curPages[curPages.length - 1].route
  } else {
    const location = window.location
    console.log("🚀 ~ file: index.ts ~ line 10 ~ getCurRoute ~ location", location.href)
    return location.href
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
  return (...arg: any[]) => {
    clearTimeout(timer)
    timer = setTimeout(() => fuc.apply(this, arg), delay)
  }
}
