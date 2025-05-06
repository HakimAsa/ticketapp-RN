const getBaseUrl = () => process.env.EXPO_PUBLIC_API_URL

const doSetForwardslash = (...endpoints: string[]) => {
  return endpoints.length === 1 ? `/${endpoints[0]}` : '/' + endpoints.join('/')
}

export default {
  doSetForwardslash,
  getBaseUrl,
}
