import { ScrollView } from 'react-native'
import * as Yup from 'yup'

import MainContainer, {
  KeyboardAvoidViewContainer,
} from '@/app/components/containers'
import i18n from '@/app/i18n'
import TRN_KEYS from '@/translation/keys'
import IconHeader from '@/app/components/icons/IconHeader'
import TmForm, { TmFormField, TmSubmitButton } from '@/app/components/forms'
import AuthFooter from './AuthFooter'
import { emailRegex } from '@/config/constants'
import routes from '@/app/navigation/routes'
import TmProps from '@/TmProps'
import TmPressableText from '@/app/components/common/text/TmPressableText'

const loginSchema = Yup.object({
  useridentifier: Yup.string()
    .min(3)
    .test(
      'email-or-username',
      'Either email or username is required',
      (value?: string) => {
        if (!value) return false // Ensure the field is required
        // Check if the value is a valid email
        const isEmail = emailRegex.test(value)
        // Check if the value is a valid username (assuming a simple regex for username)
        const isUsername = value ? /^[a-zA-Z0-9_-]{3,16}$/.test(value) : false
        // Ensure that the value is either an email or a username, but not both
        return (isEmail && !isUsername) || (isUsername && !isEmail)
      }
    )
    .required('Please enter either an email or a username'),
  password: Yup.string().min(8).required(),
})

type LoginpFormValues = Yup.InferType<typeof loginSchema>

const initialValues: LoginpFormValues = {
  useridentifier: '',
  password: '',
}
export default function Login({ navigation }: TmProps) {
  // login user api call
  const logUserIn = async (values: any) => {
    const res = {}
    console.log(values)
  }
  return (
    <MainContainer>
      {/* Login form */}
      <KeyboardAvoidViewContainer>
        <ScrollView
          showsVerticalScrollIndicator={false}
          automaticallyAdjustKeyboardInsets
        >
          <IconHeader name="account-lock" />
          {/* Registration fields */}
          <TmForm
            initialValues={initialValues}
            onSubmit={logUserIn}
            validationSchema={loginSchema}
          >
            <TmFormField
              iconName="account"
              name="useridentifier"
              placeholder={i18n.t(TRN_KEYS.USERNAMEOREMAIL)}
            />
            <TmFormField
              label={i18n.t(TRN_KEYS.PASSWORD)}
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
              {i18n.t(TRN_KEYS.FORGOTPASSWORD)}
            </TmPressableText>
            {/* Submit button */}
            <TmSubmitButton
              style={{ marginTop: 15 }}
              title={i18n.t(TRN_KEYS.LOGIN)}
            />

            {/* FOOTER */}
            <AuthFooter
              unlinkedText={TRN_KEYS.CREATEANACCOUNT}
              linkedText={TRN_KEYS.SIGNUP}
              onPress={() => navigation.navigate(routes.REGISTER)}
            />
          </TmForm>
        </ScrollView>
      </KeyboardAvoidViewContainer>
    </MainContainer>
  )
}
