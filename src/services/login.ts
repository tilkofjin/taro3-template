import { request } from "@/utils/request"

export const login = async (params: any) => {
  const url = `/api/system/easyLogin`
  return await request({
    url,
    method: 'POST',
    data: params,
  })
}