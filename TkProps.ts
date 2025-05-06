import { NavigationProp } from '@react-navigation/native'
import { ReactNode } from 'react'
import { TextProps, ViewProps } from 'react-native'

export default interface TkProps {
  navigation: NavigationProp<any, any>
  route?: any
}

export type commonProps = {
  children?: ReactNode
  style?: ViewProps['style']
  textStyle?: TextProps['style']
}
