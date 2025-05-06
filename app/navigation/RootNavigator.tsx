import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Login from '../screens/common/auth/Login'
import Register from '../screens/common/auth/Register'
import Welcome from '../screens/common/auth/Welcome'
import EventDetailsScreen from '../screens/EventDetails'
import EventsList from '../screens/EventList'
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
        name="List des Evenements"
        component={EventsList}
      />
      <Stack.Screen
        name="Details de Evenements"
        component={EventDetailsScreen}
      />
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
