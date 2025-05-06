import { View } from 'react-native'

export default function Row({ gap = 2, ...props }) {
  const { children, style } = props
  return <View style={[{ flexDirection: 'row', gap }, style]}>{children}</View>
}
