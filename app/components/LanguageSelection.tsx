import { Pressable, StyleSheet, View } from 'react-native'
import { useContext, useState } from 'react'

import Colors from '../../config/colors'
import TmText from './common/text/TmText'
import i18n from '../i18n'
import { MaterialCommunityIcons } from '../../config/icons'
import TmButton from './common/button/TmButton'

import {
  LanguageContext,
  LanguageContextType,
} from '../context/LanguageContext'
import Logo from './common/image/Logo'
import { RowContainer } from './containers'

interface InitialValue {
  label: string
  value: string
}
interface LsProps {
  data: InitialValue[]
  goNext: () => void
  initialValue: InitialValue
  logo: boolean
}

const widthViewPort = '50%'

export default function LanguageSelection({
  data,
  goNext,
  initialValue,
  logo,
}: LsProps) {
  const [open, setOpen] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState(initialValue)
  const languageContext = useContext<LanguageContextType>(LanguageContext)

  if (!languageContext) {
    throw new Error(
      'LanguageContext is undefined. Make sure your component is wrapped with LanguageProvider.'
    )
  }
  const { setLanguage } = useContext(LanguageContext) // Get setLanguage from context
  const changeLanguage = (item: InitialValue) => {
    setSelectedLanguage(item)
    setOpen(false)
    i18n.locale = item.value
    setLanguage(item.value)
  }

  return (
    <View style={styles.container}>
      <View style={styles.columnContainer}>
        <TmText
          small
          style={styles.text}
        >
          {i18n.t('chooseLanguage')}
        </TmText>
        <Pressable
          onPress={() => setOpen(!open)}
          style={{ width: widthViewPort, alignSelf: 'center' }}
        >
          <View style={styles.pressableView}>
            <TmText style={{ color: Colors.black, paddingHorizontal: 5 }}>
              {i18n.t(selectedLanguage.label) ?? i18n.t('selectItem')}
            </TmText>
            <MaterialCommunityIcons
              name={open ? 'chevron-up' : 'chevron-down'}
              size={20}
            />
          </View>
        </Pressable>
        {open && (
          <View style={styles.languageView}>
            {data.map((item) => (
              <Pressable
                key={item.value}
                onPress={() => changeLanguage(item)}
                // style={styles.languageView}
              >
                <TmText
                  style={{
                    color: Colors.black,
                    paddingHorizontal: 5, //maybe 30 later
                    marginBottom: 5,
                  }}
                >
                  {i18n.t(item.label)}
                </TmText>
              </Pressable>
            ))}
          </View>
        )}
        <TmButton
          style={{
            backgroundColor: Colors.white,
            width: widthViewPort,
            marginTop: 10,
            paddingHorizontal: 5,
          }}
          onPress={goNext}
        >
          <RowContainer>
            <TmText>{i18n.t('next')}</TmText>
            <MaterialCommunityIcons
              name="arrow-right"
              size={20}
            />
          </RowContainer>
        </TmButton>
      </View>
      {logo && <Logo />}
    </View>
  )
}

const styles = StyleSheet.create({
  columnContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  languageView: {
    marginTop: 5,
    width: widthViewPort,
    marginVertical: 10,
    backgroundColor: Colors.white,
  },
  pressableView: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 5,
    height: 35,
    backgroundColor: Colors.white,
  },

  text: {
    color: Colors.white,
    marginBottom: 10,
    marginLeft: -50,
  },
})
