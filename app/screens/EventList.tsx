import TkProps from '@/TkProps'
import React, { useEffect, useState } from 'react'
import { FlatList, TouchableOpacity, View } from 'react-native'
import TmText from '../components/common/text/TmText'
import TkActivityIndicator from '../components/loader/TkActivityIndicator'

const EventsList = ({ navigation }: TkProps) => {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchEvents = async () => {
    try {
      //   const res = await fetch('http://localhost:3025/api/v1/events')
      const data: any = [
        {
          id: 1,
          title: 'React Native Bootcamp',
          description: 'An in-depth hands-on training on React Native.',
          start_date: '2025-05-10',
          end_date: '2025-05-12',
          status: 'active',
          max_participants: 50,
        },
        {
          id: 2,
          title: 'Tech Conference 2025',
          description: 'Join industry experts to explore new trends in tech.',
          start_date: '2025-06-01',
          end_date: '2025-06-03',
          status: 'active',
          max_participants: 200,
        },
        {
          id: 3,
          title: 'Startup Pitch Night',
          description: 'An evening where startups pitch to investors.',
          start_date: '2025-05-20',
          end_date: '2025-05-20',
          status: 'active',
          max_participants: 100,
        },
        {
          id: 4,
          title: 'AI Hackathon',
          description: '48 hours of AI product building.',
          start_date: '2025-05-15',
          end_date: '2025-05-17',
          status: 'expired',
          max_participants: 150,
        },
        {
          id: 5,
          title: 'Women in Tech Meetup',
          description: 'Empowering women in the technology space.',
          start_date: '2025-05-22',
          end_date: '2025-05-22',
          status: 'active',
          max_participants: 75,
        },
      ]
      ;``

      setEvents(data)
    } catch (err) {
      console.error('Failed to fetch events', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchEvents()
  }, [])

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('EventDetails', { event: item })}
    >
      <View style={{ padding: 16, borderBottomWidth: 1 }}>
        <TmText style={{ fontSize: 18 }}>{item.title}</TmText>
        <TmText>{item.description}</TmText>
        <TmText>
          {item.start_date} ➡ {item.end_date}
        </TmText>
        <TmText>Status: {item.status}</TmText>
      </View>
    </TouchableOpacity>
  )

  if (loading) return <TkActivityIndicator visible={loading} />

  return (
    <FlatList
      data={events}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
    />
  )
}

export default EventsList
