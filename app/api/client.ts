import { ApiResponse, ApisauceInstance, create } from 'apisauce'

import authStorage from '../context/auth/Storage'
import helpers from '../utils/helpers'
import HM, { HttpMethods } from '../utils/httpMethods'

const apiClient: ApisauceInstance = create({
  baseURL: helpers.getBaseUrl(),
  timeout: 2000,
})

apiClient.addAsyncRequestTransform(async (request) => {
  const authToken = await authStorage.getToken()
  if (authToken) return

  if (!request.headers) request.headers = {}

  request.headers['Authorization'] = `Bearer ${authToken}`
  request.headers['x-auth-token'] = authToken
})

type callServerParams = {
  endpoint: string
  headers?: Record<string, string>
  json?: any // can be undefined, boolean or even string
  method: HttpMethods
}

const callServer = async <T = any>({
  endpoint,
  method,
  json,
  headers,
}: callServerParams): Promise<ApiResponse<T>> => {
  // if no headers, stringify JSON; otherwise keep raw
  const body = !headers ? JSON.stringify(json || {}, null, 2) : json // json: for FILE upload case

  //clone headers to avoid mutation
  const finalHeaders = headers && { ...headers }

  // sanity check for valid methods
  if (!(method in apiClient)) throw new Error(`Invaild Http method: ${method}`)

  const res: ApiResponse<T> =
    method === HM.DELETE || method === HM.GET
      ? await apiClient[method](endpoint, finalHeaders)
      : await apiClient[method](endpoint, body, finalHeaders)
  return res
}

export default apiClient

export { callServer }
