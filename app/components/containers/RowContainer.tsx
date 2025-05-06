import { View } from 'react-native'
import React from 'react'

interface RowContainerProps {
  children: React.ReactNode
}
export default function RowContainer({ children }: RowContainerProps) {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        // flexGrow: 1,
      }}
    >
      {children}
    </View>
  )
}
