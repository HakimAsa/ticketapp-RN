import dayjs from 'dayjs'
const getBaseUrl = () => process.env.EXPO_PUBLIC_API_URL

const doSetForwardslash = (...endpoints: string[]) => {
  return endpoints.length === 1 ? `/${endpoints[0]}` : '/' + endpoints.join('/')
}

const formatDate = (date: Date) => {
  return dayjs(date).format('DD/MM/YYYY')
}

export default {
  doSetForwardslash,
  formatDate,
  getBaseUrl,
}
