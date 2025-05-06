import * as SecureStore from 'expo-secure-store'

import { onWeb } from '@/app/config/constants'

const key = 'authToken'
const storeToken = async (authToken: string) => {
  try {
    onWeb
      ? await localStorage.setItem(key, JSON.stringify(authToken, null, 2))
      : await SecureStore.setItemAsync(key, JSON.stringify(authToken, null, 2))
  } catch (error) {
    console.error('Error storing the auth token', error)
  }
}
const getToken = async () => {
  try {
    try {
      const stringValue = onWeb
        ? await localStorage.getItem(key)
        : await SecureStore.getItemAsync(key)
      return stringValue !== null ? JSON.parse(stringValue) : null
    } catch (error) {
      console.error('Error getting the auth token', error)
    }
  } catch (error) {
    console.error('Error getting the auth token', error)
  }
}

const getUser = async () => {
  try {
    const token = await getToken()
    return token ? token : null // TODO use jwtDecode instead
  } catch (error) {
    console.error('Error getting the user', error)
  }
}
const removeToken = async () => {
  try {
    return onWeb
      ? await localStorage.removeItem(key)
      : await SecureStore.deleteItemAsync(key)
  } catch (error) {
    console.error('Error removing the auth token', error)
  }
}

export default { storeToken, getToken, getUser, removeToken }
