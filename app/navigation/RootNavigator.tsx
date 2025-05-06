import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Login from '../screens/common/auth/Login'
import Register from '../screens/common/auth/Register'
import Welcome from '../screens/common/auth/Welcome'
import routes from './routes'

const Stack = createNativeStackNavigator()
export default function RootStack() {
  return (
    <Stack.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        title: `${route.name}`, // ✅ Will now update dynamically!
      })}
    >
      <Stack.Screen
        name={routes.WELCOME}
        component={Welcome}
      />

      <Stack.Screen
        name={routes.REGISTER}
        component={Register}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name={routes.LOGIN}
        component={Login}
        options={{ headerShown: true }}
      />
    </Stack.Navigator>
  )
}
