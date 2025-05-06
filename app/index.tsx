import {
  NavigationContainer,
  NavigationIndependentTree,
} from '@react-navigation/native'

import RootStack from './navigation/RootNavigator'

export default function Index() {
  return (
    <NavigationIndependentTree>
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
    </NavigationIndependentTree>
  )
}
