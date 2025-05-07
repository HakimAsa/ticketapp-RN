// screens/admin/stats.js
import TmText from '@/app/components/common/text/TmText'
import TkActivityIndicator from '@/app/components/loader/TkActivityIndicator'
import authStorage from '@/app/context/auth/Storage'
import helpers from '@/app/utils/helpers'
import { useEffect, useState } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'

const Stats = () => {
  const [stats, setStats] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchStats = async () => {
    const token = await authStorage.getToken()
    try {
      const res = await fetch(`${helpers.getBaseUrl()}/admin/events/stats`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      })
      const data = await res.json()
      setStats(data)
    } catch (error) {
      console.error('Error fetching stats:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStats()
  }, [])

  if (loading) return <TkActivityIndicator />

  return (
    <View style={styles.container}>
      <TmText style={styles.title}>📊 Statistiques par Événement</TmText>
      <FlatList
        data={stats}
        keyExtractor={(item) => item.event_id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <TmText
              big
              style={styles.event}
            >
              {item.title}
            </TmText>
            <TmText style={styles.count}>
              Participants : {item.participant_count}
            </TmText>
          </View>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 12 },
  card: {
    padding: 12,
    marginVertical: 6,
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
  },
  event: { fontSize: 18, fontWeight: '600' },
  count: { fontSize: 16, marginTop: 4 },
})

export default Stats
