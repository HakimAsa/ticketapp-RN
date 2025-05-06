import { Pressable, StyleSheet, View } from 'react-native'

import Colors from '@/app/config/colors'
import TRN_KEYS from '@/translation/keys'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import TmButton from '../common/button/TmButton'
import TmText from '../common/text/TmText'
import TmModal from './TmModal'

interface MessageModalProps {
  buttonHandler: () => void
  buttonText?: string
  headerText: string
  message: string
  modalVisible: boolean
  type?: 'success' | 'fail'
}

export default function MessageModal({
  buttonHandler,
  buttonText,
  headerText,
  modalVisible,
  message,
  type,
}: MessageModalProps) {
  return (
    <TmModal
      animationType="slide"
      visible={modalVisible}
      transparent
    >
      <Pressable
        onPress={buttonHandler}
        style={styles.container}
      >
        <View style={styles.modalView}>
          <MaterialCommunityIcons
            color={type === 'success' ? Colors.success : Colors.red}
            name={type === 'success' ? 'check-circle' : 'close-circle'}
            size={100}
          />
          <TmText
            style={{ color: Colors.white }}
            big
          >
            {headerText}
          </TmText>
          <TmText
            style={{ color: Colors.white }}
            medium
          >
            {message}
          </TmText>
          <TmButton
            title={buttonText || TRN_KEYS.DONE}
            onPress={buttonHandler}
          />
        </View>
      </Pressable>
    </TmModal>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    flex: 1,
    justifyContent: 'center',
    padding: 25,
  },
  modalView: {
    alignItems: 'center',
    backgroundColor: Colors.lightblack,
    borderRadius: 20,
    elevation: 5,
    padding: 35,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    width: '100%',
  },
})
