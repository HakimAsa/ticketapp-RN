import ep from '@/app/config/endpoints'
import helpers from '../utils/helpers'
import HM from '../utils/httpMethods'
import { callServer } from './client'

const { AUTH, REGISTER } = ep
const { doSetForwardslash: dsf } = helpers

type User = {
  email: string
}

const register = (data: Record<string, string>) =>
  callServer<User>({
    endpoint: dsf(AUTH, REGISTER),
    method: HM.POST,
    json: data,
  })

export default {
  register,
}
