// screens/admin/stats.tsx
import TmText from '@/app/components/common/text/TmText'
import TkActivityIndicator from '@/app/components/loader/TkActivityIndicator'
import authStorage from '@/app/context/auth/Storage'
import routes from '@/app/navigation/routes'
import helpers from '@/app/utils/helpers'
import TkProps from '@/TkProps'
import { useFocusEffect } from '@react-navigation/native'
import { useCallback, useState } from 'react'
import { FlatList, Pressable, StyleSheet, View } from 'react-native'

const Stats = ({ navigation }: TkProps) => {
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

  useFocusEffect(
    useCallback(() => {
      //fetch events
      fetchStats()
    }, [])
  )

  if (loading) return <TkActivityIndicator visible={loading} />

  return (
    <View style={styles.container}>
      <TmText style={styles.title}>📊 Statistiques par Événement</TmText>
      <FlatList
        data={stats}
        keyExtractor={(item) => item.event_id.toString()}
        renderItem={({ item }) => (
          <Pressable
            style={styles.card}
            onPress={() =>
              navigation.navigate(routes.EVENTSUMMARY, {
                event: item,
                onGoBack: fetchStats,
              })
            }
          >
            <TmText
              big
              style={styles.event}
            >
              {item.title}
            </TmText>
            <TmText style={styles.count}>
              Participants : {item.participant_count}
            </TmText>
          </Pressable>
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  event: { fontSize: 18, fontWeight: '600' },
  count: { fontSize: 16, marginTop: 4 },
})

export default Stats
