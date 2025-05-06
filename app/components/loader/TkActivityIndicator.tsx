import { ActivityIndicator, StyleSheet, View } from 'react-native'

import Colors from '@/app/config/colors'
import TmText from '../common/text/TmText'

interface IndicatorProp {
  visible?: boolean
  text?: string
}

export default function TkActivityIndicator({
  visible = false,
  text = '',
}: IndicatorProp) {
  if (!visible) return null
  return (
    <View style={styles.animationContainer}>
      <ActivityIndicator
        size="large"
        color={Colors.primary}
        style={{ transform: [{ scaleX: 2 }, { scaleY: 2 }] }}
      />
      <TmText
        big
        style={{ marginTop: 15, color: Colors.primary }}
      >
        {text}
      </TmText>
    </View>
  )
}
const styles = StyleSheet.create({
  animationContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
