const fld = {
  EMAIL: 'email',
  PASSWORD: 'password',
  USERNAME: 'username',
} as const
export default fld

export type fiedlNames = (typeof fld)[keyof typeof fld]
