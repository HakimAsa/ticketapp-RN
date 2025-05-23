import { ImageBackground, StyleSheet, View } from 'react-native'

import TmButton from '@/app/components/common/button/TmButton'
import Logo from '@/app/components/common/image/Logo'
import TmText from '@/app/components/common/text/TmText'
import Colors from '@/app/config/colors'
import routes from '@/app/navigation/routes'
import TmProps from '@/TkProps'
import fr from '@/translation/fr'

export default function Welcome({ navigation }: TmProps) {
  return (
    <ImageBackground
      blurRadius={15}
      style={styles.background}
      source={require('@/assets/images/backgroundImage.png')}
    >
      <View style={styles.logoContainer}>
        <Logo
          width={100}
          height={100}
        />
        <TmText
          big
          style={styles.welcomeText}
        >
          {fr.tagLine}
        </TmText>
      </View>
      <View style={styles.buttonView}>
        <TmButton
          title="Voir Evenements"
          onPress={() => navigation.navigate(routes.EVENTLIST)}
        />
        <TmButton
          title={fr.login}
          color="primary1"
          style={{ marginTop: 0 }}
          onPress={() => navigation.navigate(routes.LOGIN)}
        />
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  buttonView: {
    padding: 20,
    width: '100%',
  },
  logoContainer: {
    alignItems: 'center',
    position: 'absolute',
    top: 70,
  },
  welcomeText: {
    color: Colors.primary,
    fontStyle: 'italic',
    fontSize: 25,
    fontWeight: '700',
    paddingVertical: 10,
  },
})
