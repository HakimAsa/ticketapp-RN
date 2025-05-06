import { MaterialCommunityIcons } from '@expo/vector-icons'
import { StyleSheet, View } from 'react-native'

import Colors from '@/app/config/colors'
import { ScreenHeight } from '@/app/config/constants'

interface IconHeaderProps {
  color?: string
  name: keyof typeof MaterialCommunityIcons.glyphMap
}

export default function IconHeader({ color, name }: IconHeaderProps) {
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons
        name={name}
        size={ScreenHeight * 0.08}
        color={color || Colors.primary}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)', // todo later
    width: ScreenHeight * 0.15,
    height: ScreenHeight * 0.15,
    borderRadius: ScreenHeight * 0.2,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 10,
  },
})
