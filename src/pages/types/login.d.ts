declare namespace Apis {
  type LoginParams = {
    password?: string,
    username?: string,
    code?: string
  }
  type VertifyPhone = {
    id: number,
    code: string
  }
}