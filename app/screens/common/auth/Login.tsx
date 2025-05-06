import { Alert, ScrollView } from 'react-native'
import * as Yup from 'yup'

import TmPressableText from '@/app/components/common/text/TmPressableText'
import TmText from '@/app/components/common/text/TmText'
import MainContainer, {
  KeyboardAvoidViewContainer,
} from '@/app/components/containers'
import TmForm, { TmFormField, TmSubmitButton } from '@/app/components/forms'
import IconHeader from '@/app/components/icons/IconHeader'
import TkActivityIndicator from '@/app/components/loader/TkActivityIndicator'
import authStorage from '@/app/context/auth/Storage'
import routes from '@/app/navigation/routes'
import helpers from '@/app/utils/helpers'
import TmProps from '@/TkProps'
import fr from '@/translation/fr'
import { useState } from 'react'
import AuthFooter from './AuthFooter'

const loginSchema = Yup.object({
  email: Yup.string().email().required('E-mail obligatoire'),
  password: Yup.string().min(8).required('Mot de passe obligatoire'),
})

type LoginpFormValues = Yup.InferType<typeof loginSchema>

const initialValues: LoginpFormValues = {
  email: '',
  password: '',
}
export default function Login({ navigation }: TmProps) {
  const [loading, setLoading] = useState(false)
  // login user api call
  const logUserIn = async (values: any) => {
    try {
      setLoading(true)
      const res = await fetch(`${helpers.getBaseUrl()}/auth/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values, null, 2),
      })
      setLoading(false)
      const data = await res.json()

      if (res.ok) {
        await authStorage.storeToken(data.token)
        navigation.replace(routes.EVENTADMINLIST) // go to admin dashboard
      } else {
        Alert.alert(
          'Echec de connexion',
          data.message || `Informations d'identification non valides`
        )
      }
    } catch (err) {
      Alert.alert('Erreur', 'Impossible de se connecter au serveur')
    }
  }
  if (loading) return <TkActivityIndicator visible={loading} />
  return (
    <MainContainer>
      {/* Login form */}
      <KeyboardAvoidViewContainer>
        <ScrollView
          showsVerticalScrollIndicator={false}
          automaticallyAdjustKeyboardInsets
        >
          <IconHeader name="account-lock" />
          {/* LOGIN fields */}
          <TmText
            big
            style={{ fontWeight: '700', textAlign: 'center' }}
          >
            Seulement pour les Admins
          </TmText>
          <TmForm
            initialValues={initialValues}
            onSubmit={logUserIn}
            validationSchema={loginSchema}
          >
            <TmFormField
              iconName="email"
              name="email"
              placeholder={fr.email}
            />
            <TmFormField
              label={fr.password}
              name="password"
              placeholder="* * * * * * * *"
              iconName="lock"
            />
            <TmPressableText
              small
              onPress={() => alert('FP')}
              textAlign="right"
              fontWeight="500"
            >
              {fr.forgotPassword}
            </TmPressableText>
            {/* Submit button */}
            <TmSubmitButton
              style={{ marginTop: 15 }}
              title={fr.login}
            />

            {/* FOOTER */}
            <AuthFooter
              unlinkedText={fr.createAnAccount}
              linkedText={fr.signup}
              onPress={() => navigation.navigate(routes.REGISTER)}
            />
          </TmForm>
        </ScrollView>
      </KeyboardAvoidViewContainer>
    </MainContainer>
  )
}
