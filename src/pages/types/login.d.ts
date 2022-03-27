declare namespace Apis {
  type LoginParams = {
    avatar?: string,
    nickName?: string,
    code?: string
  }
  type VertifyPhone = {
    id: number,
    code: string
  }
}