import { getLocales } from 'expo-localization'

import LanguageSelection from '@/app/components/LanguageSelection'
import routes from '@/app/navigation/routes'
import Storage from '@/app/utils/Storage'
import Colors from '@/config/colors'
import TmProps from '@/TkProps'
import { useEffect, useState } from 'react'
import { ActivityIndicator } from 'react-native'

const data = [
  {
    label: 'english',
    value: 'en',
  },
  {
    label: 'french',
    value: 'fr',
  },
]

const defineInitialValue = function () {
  const code = getLocales()[0]?.languageCode
  return code === 'fr'
    ? { label: 'french', value: code }
    : { label: 'english', value: 'en' }
}

export default function Languages({ navigation }: TmProps) {
  const [loading, setLoading] = useState(true)
  const initialValue = defineInitialValue()

  const goNext = async () => {
    const isLanguageSelected = await Storage.getData('language')
    if (!isLanguageSelected) {
      await Storage.storeData('language', initialValue)
    }
    navigation.reset({
      index: 0,
      routes: [{ name: routes.WELCOME }], // Navigate to welcome screen without going back
    })
  }

  useEffect(() => {
    const checkLanguageSelection = async () => {
      const isLanguageSelected = await Storage.getData('language')
      if (isLanguageSelected) {
        navigation.reset({
          index: 0,
          routes: [{ name: routes.WELCOME }], // Prevents back navigation
        }) // Skip this screen if language is already selected
      } else {
        setLoading(false)
      }
    }
    checkLanguageSelection()
  }, [])

  if (loading)
    return (
      <ActivityIndicator
        size="large"
        color={Colors.primary}
      />
    )
  return (
    <LanguageSelection
      data={data}
      goNext={goNext}
      initialValue={initialValue}
      logo
    />
  )
}
