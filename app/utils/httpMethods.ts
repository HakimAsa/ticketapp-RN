const HM = {
  DELETE: 'delete',
  GET: 'get',
  PATCH: 'patch',
  POST: 'post',
  PUT: 'put',
} as const

export default HM

export type HttpMethods = (typeof HM)[keyof typeof HM]
