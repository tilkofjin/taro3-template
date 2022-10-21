import Taro from "@tarojs/taro"
import { getBaseUrl } from "@/config/env";
import dayjs from 'dayjs';
import locale from '@/utils/dayjsLocal';

dayjs.locale(locale);
const { baseUrl, baseImgUrl } = getBaseUrl();

// 获取完整请求路径
export const getFullUrl = (url: string) => {
  if (!url) throw new Error(`请求路径配置错误, 请正确配置请求路径后重试!~`)
  if (url.startsWith('https') || url.startsWith('http')) return url
  return baseUrl + url
}

// 获取完整服务器图片路径
export const getFullImgUrl = (url: string) => {
  if (!url) throw new Error(`请求路径配置错误, 请正确配置请求路径后重试!~`)
  if (url.startsWith('https') || url.startsWith('http')) return url
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

/**
 * @description: 隐藏手机号中间4位数
 * @param {string} phone
 * @return {*}
 */
 export const hiddenMobile = (phone: string) => {
  const reg = /^(\d{3})\d{4}(\d{4})$/;
  return phone.replace(reg, '$1****$2');
};

/**
 * @description: 两个时间具体差值拼接
 * @param {start, end}
 * @return {boolean}
 */
 export const timeDiff = (start: string, end: string) => {
  if (!start || !end) throw Error('开始时间与结束时间必填');
  const time: number = dayjs(start).diff(dayjs(end), 'minute');
  if (time < 0) return null;
  const minute = time % 60;
  const hour = ~~Number((time / 60) % 24);
  const day = Number(time / 60 / 24) << 0;
  return `${day ? day + '天' : ''}${hour ? hour + '小时' : ''}${
    minute ? minute + '分钟' : ''
  }`;
};

// 获取当前路由
export const getCurrentPageUrl = () => {
  if (IS_WEAPP) {
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
  if (!path?.includes('login')) {
    Taro.navigateTo({
      url: "/pages/login/index"
    });
  }
}

/**
 * @description: 判断浏览器内核、手机系统等，使用 browser.version.ios
 * @return {*}
 */
 export const getBrower = () => {
  const u = navigator.userAgent;
  const ua = navigator.userAgent.toLocaleLowerCase();
  return {
    trident: u.indexOf('Trident') > -1, // IE内核
    presto: u.indexOf('Presto') > -1, // opera内核
    webKit: u.indexOf('AppleWebKit') > -1, // 苹果、谷歌内核
    gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') === -1, // 火狐内核
    mobile: !!u.match(/AppleWebKit.*Mobile.*/), // 是否为移动终端
    ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // IOS终端
    android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, // 安卓终端
    iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, // 是否为iphone或QQHD浏览器
    iPad: u.indexOf('iPad') > -1, // 是否为iPad
    webApp: u.indexOf('Safari') === -1, // 是否web应用程序，没有头部与底部
    QQbrw: u.indexOf('MQQBrowser') > -1, // QQ浏览器
    weiXin: u.indexOf('MicroMessenger') > -1, // 微信
    QQ: String(ua.match(/QQ/i)) === 'qq', // QQ
    weiBo: String(ua.match(/WeiBo/i)) === 'weibo', // 微博
    ucLowEnd: u.indexOf('UCWEB7.') > -1, //
    ucSpecial: u.indexOf('rv:1.2.3.4') > -1,
    webview:
      !(u.match(/Chrome\/([\d.]+)/) || u.match(/CriOS\/([\d.]+)/)) &&
      u.match(/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/),
    Symbian: u.indexOf('Symbian') > -1,
    ucSB: u.indexOf('Firofox/1.') > -1,
  };
};

// 生成随机数
export const randomId = len => {
  return Math.random().toString(36).substring(3, len);
}

/**
 * @description: 图片压缩，H5 平台用
 * @param {*} file   图片文件
 * @param {number} quality  转换的图片质量。范围是 0 到 1
 * @param {number} maxSize  图片最大尺寸，单位 KB
 * @return {*}
 */
 export const compressImg = (file, quality?: number, maxSize = 300) => {
  let qualitys = 0.52
  console.log(parseInt((file.size / 1024).toFixed(2)))
  if (parseInt((file.size / 1024).toFixed(2)) < 1024) {
    qualitys = 0.85
  }
  if (5 * 1024 < parseInt((file.size / 1024).toFixed(2))) {
    qualitys = 0.92
  }
  if (quality) {
    qualitys = quality
  }
  if (file[0]) {
    // 如果是 file 数组返回 Promise 数组
    return Promise.all(Array.from(file).map(e => compressImg(e, qualitys)))
  } else {
    return new Promise((resolve) => {
      if (+((file.size / 1024).toFixed(2)) < maxSize) {
        resolve({ file: file })
      } else {
        // 创建 FileReader
        const reader = new FileReader()
        // @ts-ignore
        reader.onload = ({ target: { result: src } }) => {
          // 创建 img 元素
          const image = new Image()
          image.onload = async () => {
            // 创建 canvas 元素
            const canvas = document.createElement('canvas')
            const context = canvas.getContext('2d')
            let targetWidth = image.width
            let targetHeight = image.height
            let originWidth = image.width
            let originHeight = image.height
            let maxWidth, maxHeight
            if (1 * 1024 <= parseInt((file.size / 1024).toFixed(2)) && parseInt((file.size / 1024).toFixed(2)) <= 10 * 1024) {
              maxWidth = 1600
              maxHeight = 1600
              targetWidth = originWidth
              targetHeight = originHeight
              // 图片尺寸超过的限制
              if (originWidth > maxWidth || originHeight > maxHeight) {
                if (originWidth / originHeight > maxWidth / maxHeight) {
                  // 更宽，按照宽度限定尺寸
                  targetWidth = maxWidth
                  targetHeight = Math.round(maxWidth * (originHeight / originWidth))
                } else {
                  targetHeight = maxHeight
                  targetWidth = Math.round(maxHeight * (originWidth / originHeight))
                }
              }
            }
            if (10 * 1024 <= parseInt((file.size / 1024).toFixed(2)) && parseInt((file.size / 1024).toFixed(2)) <= 20 * 1024) {
              maxWidth = 1400
              maxHeight = 1400
              targetWidth = originWidth
              targetHeight = originHeight
              // 图片尺寸超过的限制
              if (originWidth > maxWidth || originHeight > maxHeight) {
                if (originWidth / originHeight > maxWidth / maxHeight) {
                  // 更宽，按照宽度限定尺寸
                  targetWidth = maxWidth
                  targetHeight = Math.round(maxWidth * (originHeight / originWidth))
                } else {
                  targetHeight = maxHeight
                  targetWidth = Math.round(maxHeight * (originWidth / originHeight))
                }
              }
            }
            canvas.width = targetWidth
            canvas.height = targetHeight
            context && context.clearRect(0, 0, targetWidth, targetHeight)
            // 绘制 canvas
            context && context.drawImage(image, 0, 0, targetWidth, targetHeight)
            const canvasURL = canvas.toDataURL(file.type, qualitys)
            const buffer = window.atob(canvasURL.split(',')[1])
            let length = buffer.length
            const bufferArray = new Uint8Array(new ArrayBuffer(length))
            while (length--) {
              bufferArray[length] = buffer.charCodeAt(length)
            }
            const miniFile = new File([bufferArray], file.name, { type: file.type })
            resolve({
              file: miniFile,
              origin: file,
              beforeSrc: src,
              afterSrc: canvasURL,
              beforeKB: Number((file.size / 1024).toFixed(2)),
              afterKB: Number((miniFile.size / 1024).toFixed(2))
            })
          }
          image.src = src
        }
        reader.readAsDataURL(file)
      }
    })
  }
}

/**
 * @description: 检测是否有新版本
 * @return {*}
 */
export const updateWeapp = () => {
  if (Taro.canIUse('getUpdateManager')) {
    const updateManager = Taro.getUpdateManager();
    updateManager.onCheckForUpdate(() => {
      console.log('checking app update .......');
    });
    updateManager.onUpdateReady(() => {
      Taro.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success: (res) => {
          if (res.confirm) {
            updateManager.applyUpdate();
          }
        },
      });
    });
    updateManager.onUpdateFailed(() => {
      Taro.showModal({
        title: '更新提示',
        content: '新版本下载失败，请检查你的微信',
        showCancel: false,
      });
    });
  } else {
    Taro.showModal({
      title: '微信升级',
      content: '当前微信版本过低，部分功能无法使用，请升级到最新版本',
      showCancel: false,
    });
  }
};