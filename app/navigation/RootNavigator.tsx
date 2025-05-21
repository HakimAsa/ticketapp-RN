import { createNativeStackNavigator } from '@react-navigation/native-stack'

import fr from '@/translation/fr'
import AdminEventsList from '../screens/admin/AdminEventsList'
import EditEvent from '../screens/admin/EditEvent'
import EventSummary from '../screens/admin/EventSummary'
import ParticipantsList from '../screens/admin/ParticipantList'
import Stats from '../screens/admin/Stats'
import Login from '../screens/common/auth/Login'
import Register from '../screens/common/auth/Register'
import Welcome from '../screens/common/auth/Welcome'
import EventDetailsScreen from '../screens/EventDetails'
import EventsList from '../screens/EventList'
import TicketConfirmationModal from '../screens/TicketConfirmation'
import routes from './routes'

const Stack = createNativeStackNavigator()
export default function RootStack() {
  return (
    <Stack.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        title: `${fr?.[route.name]}`, // ✅ Will now update dynamically!
      })}
    >
      <Stack.Screen
        name={routes.WELCOME}
        component={Welcome}
      />
      <Stack.Screen
        name={routes.EVENTLIST}
        component={EventsList}
      />
      <Stack.Screen
        name="Details de Evenements"
        component={EventDetailsScreen}
      />
      <Stack.Screen
        name={routes.TICKETCONFIRMATION}
        component={TicketConfirmationModal}
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
      <Stack.Screen
        name={routes.EVENTADMINLIST}
        component={AdminEventsList}
      />
      <Stack.Screen
        name={routes.ADMISTATS}
        component={Stats}
        options={{ title: 'Statistiques' }}
      />
      <Stack.Screen
        name={routes.EVENTSUMMARY}
        component={EventSummary}
        options={({ route }) => ({
          headerShown: true,
          title: `Resumé: ${route.params.event.title}`,
        })}
      />
      <Stack.Screen
        name={routes.EVENTEDIT}
        component={EditEvent}
      />
      <Stack.Screen
        name={routes.PARTICIPANTSLIST}
        component={ParticipantsList}
      />
    </Stack.Navigator>
  )
}
