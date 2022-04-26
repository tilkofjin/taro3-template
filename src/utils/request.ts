import Taro from "@tarojs/taro";
import { getFullUrl } from "./index";
import interceptor, { erroStatus } from "./interceptors";

Taro.addInterceptor(interceptor)

// 请求方法
export const request = async (options) => {
  const { url, data, method, header } = options
  const config = {
    url: getFullUrl(url),
    data,
    method: method.toUpperCase(),
    header,
  };
  try {
    return await Taro.request(config) as RequestRes.ResData
  } catch (error) {
    erroStatus(error.status)
  }
}

// 上传文件
export const uploadFileRequest = (options) => {
  const { url, name, formData, fileName, filePath, showToast = true } = options
  Taro.showLoading({ title: '文件上传中...' })
  const uploadTask = Taro.uploadFile({
    url: getFullUrl(url),
    filePath,
    name,
    fileName,
    formData,
    success: res => {
      Taro.hideLoading()
      const result = JSON.parse(res?.data) as RequestRes.ResData
      const { message } = result
      if (showToast) {
        Taro.showToast({
          title: `文件上传${message}`,
          duration: 2500,
          icon: 'none'
        })
      }
    },
  });
  // 打印上传文件进度日志
  uploadTask.progress((res) => {
    console.log('上传进度', res.progress)
    console.log('已经上传的数据长度', res.totalBytesSent)
    console.log('预期需要上传的数据总长度', res.totalBytesExpectedToSend)
  })
  return uploadTask.then((res: any) => JSON.parse(res.data))
}


