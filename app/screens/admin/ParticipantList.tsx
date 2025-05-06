import { useEffect, useState } from 'react'
import { FlatList, View } from 'react-native'

import TmText from '@/app/components/common/text/TmText'
import helpers from '@/app/utils/helpers'

const ParticipantsList = ({ route }: { route: any }) => {
  const { eventId } = route.params
  const [participants, setParticipants] = useState([])

  const fetchParticipants = async () => {
    try {
      const res = await fetch(
        `${helpers.getBaseUrl()}/admin/events/${eventId}/participants`
      )
      const data = await res.json()
      setParticipants(data)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchParticipants()
  }, [])

  return (
    <FlatList
      data={participants}
      keyExtractor={(item: any) => item?.id?.toString()}
      renderItem={({ item }) => (
        <View style={{ padding: 12, borderBottomWidth: 1 }}>
          <TmText>
            {item.first_name} {item.last_name} ({item.email})
          </TmText>
          <TmText>🎟️ {item.ticket_code}</TmText>
        </View>
      )}
    />
  )
}

export default ParticipantsList
