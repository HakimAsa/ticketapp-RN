import { Text } from 'react-native'

import defaultStyles from '@/app/config/styles'
interface TextProps {
  big?: boolean
  medium?: boolean
  small?: boolean
  fontSize?: number
  style?: any
  children: React.ReactNode
}

export default function TmText({
  big,
  children,
  fontSize,
  medium,
  small,
  style,
}: TextProps) {
  return (
    <Text
      style={[
        defaultStyles.text,
        {
          fontSize: small ? 12 : big ? 22 : medium ? 14 : fontSize,
          fontFamily: medium
            ? 'Montserrat_500Medium'
            : big
            ? 'Montserrat_600SemiBold'
            : 'Montserrat_400Regular',
        },
        style,
      ]}
    >
      {children}
    </Text>
  )
}
