import TkProps from '@/TkProps'
import { useFocusEffect } from '@react-navigation/native'
import dayjs from 'dayjs'
import { useCallback, useState } from 'react'
import { FlatList, TouchableOpacity, View } from 'react-native'
import TmText from '../components/common/text/TmText'
import TkActivityIndicator from '../components/loader/TkActivityIndicator'
import Colors from '../config/colors'
import helpers from '../utils/helpers'

const EventsList = ({ navigation }: TkProps) => {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = async () => {
    setRefreshing(true)
    await fetchEvents()
    setRefreshing(false)
  }

  const fetchEvents = async () => {
    try {
      const res = await fetch(`${helpers.getBaseUrl()}/events`)
      const data = await res.json()
      const rawData: any = [
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

      const serverData = data.length > 0 ? data : rawData

      setEvents(serverData)
    } catch (err) {
      console.error('Failed to fetch events', err)
    } finally {
      setLoading(false)
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchEvents()
    }, [])
  )

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      disabled={item.status !== 'active'}
      onPress={() =>
        navigation.navigate('Details de Evenements', { event: item })
      }
      activeOpacity={0.8}
      style={{
        opacity: item.status === 'active' ? 1 : 0.6,
      }}
    >
      <View
        style={{
          backgroundColor: '#fff',
          marginHorizontal: 16,
          marginVertical: 8,
          padding: 16,
          borderRadius: 12,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3,
        }}
      >
        <TmText style={{ fontSize: 20, fontWeight: '600', color: '#333' }}>
          {item.title}
        </TmText>

        <TmText style={{ fontSize: 16, color: '#666', marginVertical: 8 }}>
          {item.description}
        </TmText>

        <TmText style={{ fontSize: 14, color: '#999', marginBottom: 6 }}>
          📅 {dayjs(item.start_date).format('DD/MM/YYYY')} ➡{' '}
          {dayjs(item.end_date).format('DD/MM/YYYY')}
        </TmText>

        <TmText
          style={{
            fontSize: 14,
            fontWeight: '500',
            color: item.status === 'active' ? Colors.green : Colors.red,
          }}
        >
          Statut: {item.status === 'active' ? 'Actif' : 'Expiré'}
        </TmText>
      </View>
    </TouchableOpacity>
  )

  if (loading) return <TkActivityIndicator visible={loading} />

  return (
    <FlatList
      data={events}
      refreshing={refreshing}
      onRefresh={onRefresh}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
    />
  )
}

export default EventsList
