import { useCallback, useEffect, useState } from 'react'
import { BackHandler, FlatList, TouchableOpacity, View } from 'react-native'
import Swipeable from 'react-native-gesture-handler/Swipeable'

import TmButton from '@/app/components/common/button/TmButton'
import TmText from '@/app/components/common/text/TmText'
import { Row } from '@/app/components/containers'
import TkActivityIndicator from '@/app/components/loader/TkActivityIndicator'
import Colors from '@/app/config/colors'
import authStorage from '@/app/context/auth/Storage'
import routes from '@/app/navigation/routes'
import helpers from '@/app/utils/helpers'
import TkProps from '@/TkProps'
import fr from '@/translation/fr'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useFocusEffect } from '@react-navigation/native'
import { Alert } from 'react-native'

const AdminEventsList = ({ navigation }: TkProps) => {
  const [events, setEvents] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = async () => {
    setRefreshing(true)
    await fetchEvents()
    setRefreshing(false)
  }

  // Inside your component
  const handleDelete = async (id: number) => {
    try {
      const token = await authStorage.getToken()
      await fetch(`${helpers.getBaseUrl()}/admin/events/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setEvents((prev) => prev.filter((event) => event.id !== id))
    } catch (err) {
      console.error(err)
    }
  }

  const renderRightActions = (item: any) => (
    <TouchableOpacity
      onPress={() =>
        Alert.alert(
          'Supprimer',
          `Êtes-vous sûr de vouloir supprimer l'événement "${item.title}" ?`,
          [
            { text: 'Annuler', style: 'cancel' },
            { text: 'Supprimer', onPress: () => handleDelete(item.id) },
          ]
        )
      }
      style={{
        backgroundColor: Colors.red,
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingHorizontal: 20,
        // flex: 1,
      }}
    >
      <MaterialCommunityIcons
        name="trash-can-outline"
        color={Colors.white}
        size={24}
      />
    </TouchableOpacity>
  )

  useEffect(() => {
    const checkAuth = async () => {
      const token = await authStorage.getToken()
      if (!token) {
        navigation.replace(routes.LOGIN)
      } else {
        setIsLoading(false) // Allow screen to render after token check
      }
    }
    checkAuth()
  }, [])

  const fetchEvents = async () => {
    try {
      const token = await authStorage.getToken()
      const res = await fetch(`${helpers.getBaseUrl()}/events`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      })
      const data = await res.json()
      setEvents(data)
    } catch (err) {
      console.error(err)
    }
  }

  useFocusEffect(
    useCallback(() => {
      //fetch events
      fetchEvents()

      // Prevent going back
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        () => true // prevent back navigation
      )

      return () => backHandler.remove() // ✅ properly cleans up
    }, [])
  )

  if (isLoading) {
    return <TkActivityIndicator visible={isLoading} />
  }

  const renderItem = ({ item }: { item: any }) => (
    <Swipeable renderRightActions={() => renderRightActions(item)}>
      <View style={{ padding: 12, borderBottomWidth: 1 }}>
        <TmText style={{ fontSize: 16, fontWeight: '700' }}>
          {item.title} (
          <TmText
            style={{
              color: item.status === 'active' ? Colors.green : Colors.red,
            }}
          >
            {item.status === 'active' ? 'Actif' : 'Expiré'}
          </TmText>
          )
        </TmText>
        <Row
          gap={0}
          style={{ marginTop: 8 }}
        >
          <TmButton
            title="Modifier"
            style={{ width: '50%' }}
            onPress={() =>
              navigation.navigate(routes.EVENTEDIT, {
                event: item,
                onGoBack: fetchEvents,
              })
            }
          />
          <View style={{ width: 1 }} />
          <TmButton
            title="Participants"
            color="primary1"
            style={{ width: '50%' }}
            onPress={() =>
              navigation.navigate(routes.PARTICIPANTSLIST, { eventId: item.id })
            }
          />
        </Row>
      </View>
    </Swipeable>
  )
  return (
    <>
      <FlatList
        data={events}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        refreshing={refreshing}
        onRefresh={onRefresh}
        ListHeaderComponent={
          <TmButton
            title="Créer un nouvel événement"
            onPress={() => navigation.navigate(routes.EVENTEDIT)}
          />
        }
      />
      <TmButton
        color="danger"
        title={fr.logout}
        onPress={async () => {
          await authStorage.removeToken()
          navigation.replace(routes.LOGIN)
        }}
      />
    </>
  )
}

export default AdminEventsList
