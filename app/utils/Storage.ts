import AsyncStorage from '@react-native-async-storage/async-storage'

const storeData = async (key: string, value: any) => {
  try {
    const stringValue = JSON.stringify(value)
    await AsyncStorage.setItem(key, stringValue)
  } catch (error: any) {
    throw new Error(error)
  }
}
const getData = async (key: string) => {
  try {
    const stringValue = await AsyncStorage.getItem(key)
    return stringValue !== null ? JSON.parse(stringValue) : null
  } catch (error: any) {
    throw new Error(error)
  }
}
const removeData = (key: string) => {
  try {
    AsyncStorage.removeItem(key)
  } catch (error: any) {
    throw new Error(error)
  }
}
export default { getData, removeData, storeData }
