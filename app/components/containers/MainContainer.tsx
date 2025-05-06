import { ReactNode } from 'react'
import { View } from 'react-native'

import { StatusBarHeight } from '@/app/config/constants'

interface MainContainerProps {
  children?: ReactNode
  style?: any
}

export default function MainContainer({
  children,
  style,
  ...props
}: MainContainerProps) {
  return (
    <View
      style={[
        { flex: 1, padding: 20, paddingTop: StatusBarHeight + 30 },
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  )
}
