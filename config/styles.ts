import { Platform } from 'react-native'

import Colors from './colors'

export default {
  Colors,
  text: {
    color: Colors.darkgray,
    fontSize: 14,
    fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Courier',
  },
  focusedInput: {
    backgroundColor: '#e0f7fa',
    borderColor: '#00796b',
    borderBottomWidth: 2,
  },
}
