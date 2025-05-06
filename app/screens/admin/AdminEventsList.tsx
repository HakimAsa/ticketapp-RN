import React, { useEffect, useState } from 'react'
import { FlatList, View } from 'react-native'

import TmButton from '@/app/components/common/button/TmButton'
import TmText from '@/app/components/common/text/TmText'
import helpers from '@/app/utils/helpers'
import TkProps from '@/TkProps'

const AdminEventsList = ({ navigation }: TkProps) => {
  const [events, setEvents] = useState([])

  const fetchEvents = async () => {
    try {
      const res = await fetch(`${helpers.getBaseUrl()}admin/events`)
      const data = await res.json()
      setEvents(data)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchEvents()
  }, [])

  const renderItem = ({ item }: { item: any }) => (
    <View style={{ padding: 12, borderBottomWidth: 1 }}>
      <TmText style={{ fontSize: 16 }}>
        {item.title} ({item.status})
      </TmText>
      <View style={{ flexDirection: 'row', marginTop: 8 }}>
        <TmButton
          title="Modifier"
          onPress={() => navigation.navigate('EditEvent', { event: item })}
        />
        <View style={{ width: 12 }} />
        <TmButton
          title="Participants"
          onPress={() =>
            navigation.navigate('ParticipantsList', { eventId: item.id })
          }
        />
      </View>
    </View>
  )

  return (
    <FlatList
      data={events}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      ListHeaderComponent={
        <TmButton
          title="Create New Event"
          onPress={() => navigation.navigate('EditEvent')}
        />
      }
    />
  )
}

export default AdminEventsList
