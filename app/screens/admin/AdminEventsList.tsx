import React, { useEffect, useState } from 'react'
import { FlatList, View } from 'react-native'

import TmButton from '@/app/components/common/button/TmButton'
import TmText from '@/app/components/common/text/TmText'
import { Row } from '@/app/components/containers'
import TkActivityIndicator from '@/app/components/loader/TkActivityIndicator'
import authStorage from '@/app/context/auth/Storage'
import routes from '@/app/navigation/routes'
import helpers from '@/app/utils/helpers'
import TkProps from '@/TkProps'

const AdminEventsList = ({ navigation }: TkProps) => {
  const [events, setEvents] = useState([])
  const [isLoading, setIsLoading] = useState(true)

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
      console.log('da', data)
      setEvents(data)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchEvents()
  }, [])

  if (isLoading) {
    return <TkActivityIndicator visible={isLoading} />
  }

  const renderItem = ({ item }: { item: any }) => (
    <View style={{ padding: 12, borderBottomWidth: 1 }}>
      <TmText style={{ fontSize: 16 }}>
        {item.title} ({item.status})
      </TmText>
      <Row
        gap={0}
        style={{ marginTop: 8 }}
      >
        <TmButton
          title="Modifier"
          style={{ width: '50%' }}
          onPress={() => navigation.navigate(routes.EVENTEDIT, { event: item })}
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
  )

  return (
    <FlatList
      data={events}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      ListHeaderComponent={
        <TmButton
          title="Créer un nouvel événement"
          onPress={() => navigation.navigate(routes.EVENTEDIT)}
        />
      }
    />
  )
}

export default AdminEventsList
