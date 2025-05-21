// screens/admin/EventSummary.tsx
import TmText from '@/app/components/common/text/TmText'
import { ErrorMessages } from '@/app/components/forms'
import TkActivityIndicator from '@/app/components/loader/TkActivityIndicator'
import authStorage from '@/app/context/auth/Storage'
import helpers from '@/app/utils/helpers'
import TkProps from '@/TkProps'
import { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'

const EventSummary = ({ route }: TkProps) => {
  const {
    event: { event_id },
  } = route.params
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchEventSummary = async () => {
    const token = await authStorage.getToken()
    try {
      const res = await fetch(
        `${helpers.getBaseUrl()}/admin/events/${event_id}/summary`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
        }
      )
      const data = await res.json()
      console.log('data', data)
      setStats(data)
    } catch (error) {
      console.error('Error fetching stats:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchEventSummary()
  }, [])

  if (loading) return <TkActivityIndicator visible={loading} />

  return (
    <View style={styles.container}>
      <TmText style={styles.title}>📊 Stats Detaillée</TmText>
      <ErrorMessages
        error={!stats && 'Erreur'}
        visible={!loading}
      />
      <View style={styles.card}>
        <TmText style={styles.eventName}>{stats.event_title}</TmText>
        <TmText style={styles.date}>
          📅 {helpers.formatDate(stats?.start_date)} ➡{' '}
          {helpers.formatDate(stats?.end_date)}
        </TmText>

        <View style={styles.row}>
          <TmText>👥 Participants :</TmText>
          <TmText style={styles.boldText}>{stats.total_participants}</TmText>
        </View>

        <View style={styles.row}>
          <TmText>🎯 Places max :</TmText>
          <TmText>{stats.max_participants}</TmText>
        </View>

        <View style={styles.row}>
          <TmText>🪑 Places restantes :</TmText>
          <TmText>{stats.left_places}</TmText>
        </View>

        <View style={styles.row}>
          <TmText>📈 Remplissage :</TmText>
          <TmText style={styles.percent}>{stats.percentage_filled}%</TmText>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 16,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fafafa',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  eventName: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 4,
    color: '#39063A',
  },
  date: {
    fontSize: 14,
    marginBottom: 12,
    color: '#777',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 2,
  },
  boldText: {
    fontWeight: '600',
    color: '#222',
  },
  percent: {
    fontWeight: '600',
    color: '#4CAF50',
  },
})

export default EventSummary
