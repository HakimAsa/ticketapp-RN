import { Pressable } from 'react-native'

import Colors from '@/app/config/colors'
import TmText from './TmText'

export default function TmPressableText({ ...props }) {
  const { small, children, textAlign, fontWeight } = props
  return (
    <Pressable {...props}>
      <TmText
        small={small}
        style={{
          color: Colors.primary,
          textDecorationLine: 'underline',
          fontWeight: fontWeight || '700',
          textAlign,
        }}
      >
        {children}
      </TmText>
    </Pressable>
  )
}
