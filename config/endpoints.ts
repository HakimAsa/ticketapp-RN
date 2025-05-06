// all endpoints that match server endpoints go here
const ep = {
  AUTH: 'auth',
  LOGIN: 'login',
  REGISTER: 'register',
} as const

export default ep

export type EndpointNames = (typeof ep)[keyof typeof ep]
