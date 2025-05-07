import {
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
  Montserrat_800ExtraBold,
  Montserrat_900Black,
} from '@expo-google-fonts/montserrat'
import {
  NavigationContainer,
  NavigationIndependentTree,
} from '@react-navigation/native'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import { useCallback } from 'react'
import { View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

import RootStack from './navigation/RootNavigator'

SplashScreen.preventAutoHideAsync()

export default function Index() {
  const [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
    Montserrat_800ExtraBold,
    MontserratBlack: Montserrat_900Black, // Alias the font name
  })

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync()
    }
  }, [fontsLoaded])

  if (!fontsLoaded) return null
  return (
    <GestureHandlerRootView>
      <View
        style={{ flex: 1 }}
        onLayout={onLayoutRootView}
      >
        <NavigationIndependentTree>
          <NavigationContainer>
            <RootStack />
          </NavigationContainer>
        </NavigationIndependentTree>
      </View>
    </GestureHandlerRootView>
  )
}
