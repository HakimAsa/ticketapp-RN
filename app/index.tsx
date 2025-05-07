import {
  NavigationContainer,
  NavigationIndependentTree,
} from '@react-navigation/native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

import RootStack from './navigation/RootNavigator'

export default function Index() {
  return (
    <GestureHandlerRootView>
      <NavigationIndependentTree>
        <NavigationContainer>
          <RootStack />
        </NavigationContainer>
      </NavigationIndependentTree>
    </GestureHandlerRootView>
  )
}
