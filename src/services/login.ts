import { request, uploadFileRequest } from "@/utils/request"

/**
 * 微信授权登录
 * @param  {Apis.LoginParams} params
 */
export const login = async (params: Apis.LoginParams) => {
  const url = `/login`
  return await request({
    url,
    method: 'POST',
    data: params,
  })
}


/**
 * 上传微信头像
 * @param  {string} filePath
 * @param  {} callBack
 */
export const uploadAvatar = async (filePath: string) => {
  const url = `/img/upload`
  return await uploadFileRequest({
    url,
    filePath,
    name: 'file',
    formData: {
      directory: "avatar"
    },
  })
}

export const vertifyPhone = async (params:Apis.VertifyPhone) => {
  const url = `/mobile`
  return await request({
    url,
    method: 'POST',
    data: params,
  })
}