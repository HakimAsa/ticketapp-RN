import { useEffect, useState } from 'react'
import { FlatList, View } from 'react-native'

import TmButton from '@/app/components/common/button/TmButton'
import TmText from '@/app/components/common/text/TmText'
import authStorage from '@/app/context/auth/Storage'
import helpers from '@/app/utils/helpers'
import TkProps from '@/TkProps'

const ParticipantsList = ({ navigation, route }: TkProps) => {
  const { eventId } = route.params
  const [participants, setParticipants] = useState([])

  const fetchParticipants = async () => {
    try {
      const token = await authStorage.getToken()
      const res = await fetch(
        `${helpers.getBaseUrl()}/admin/events/${eventId}/participants`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
        }
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

  if (participants.length === 0)
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <TmText style={{ fontWeight: '700' }}>
          Aucun Participant pour le moment
        </TmText>
        <TmButton
          title="Retour"
          color="primary1"
          style={{ width: '50%' }}
          onPress={() => navigation.goBack()}
        />
      </View>
    )

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
