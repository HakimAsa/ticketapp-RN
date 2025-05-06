import { ScrollView } from 'react-native'
import * as Yup from 'yup'

import authApi from '@/app/api/auth'
import MainContainer, {
  KeyboardAvoidViewContainer,
} from '@/app/components/containers'
import TmForm, {
  ErrorMessages,
  TmFormField,
  TmSubmitButton,
} from '@/app/components/forms'
import IconHeader from '@/app/components/icons/IconHeader'
import TmActivityIndicator from '@/app/components/loader/TkActivityIndicator'
import MessageModal from '@/app/components/modals/MessageModal'
import useApi from '@/app/hooks/useApi'
import routes from '@/app/navigation/routes'
import TmProps from '@/TkProps'
import TRN_KEYS from '@/translation/keys'
import { useState } from 'react'
import AuthFooter from './AuthFooter'

const signupSchema = Yup.object({
  confirmpassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Mismatched passwords') //"Mismatched passwords" //Mots de passe incompatibles
    .required()
    .min(8), //add custom text for translation
  email: Yup.string().email().required(),
  password: Yup.string().min(8).required(),
  username: Yup.string().min(3).required(),
})

type SignupFormValues = Yup.InferType<typeof signupSchema>

const initialValues: SignupFormValues = {
  confirmpassword: '',
  email: '',
  password: '',
  username: '',
}
export default function Register({ navigation }: TmProps) {
  const {
    error,
    loading,
    message,
    request: registerUser,
  } = useApi(authApi.register)

  // modal state values
  const [buttonText, setButtonText] = useState('')
  const [headerText, setHeaderText] = useState('')
  const [modalVisible, setModalVisible] = useState(false)
  const [modalMessage, setModalMessage] = useState('')
  const [modalMessageType, setModalMessageType] = useState<'success' | 'fail'>()

  const buttonHandler = () => {
    if (modalMessageType === 'success') {
      //move to login screen without going back
      navigation.navigate(routes.LOGIN)
      // navigation.reset({
      //   index: 0,
      //   routes: [{ name: i18n.t(TRN_KEYS.LOGIN) }],
      // })
    }
    setModalVisible(false)
  }

  // show modal function
  const showModal = (
    type: 'success' | 'fail',
    headerText: string,
    message: string,
    buttonText: string
  ) => {
    setModalMessageType(type)
    setHeaderText(headerText)
    setButtonText(buttonText)
    setModalMessage(message)
    setModalVisible(true)
  }
  // register user api call
  const handleSubmit = async (values: any) => {
    console.log(values)
    const res = await registerUser(values)
    if (!res?.ok) {
      return showModal(
        'fail',
        `Failed to register`,
        message || 'Something went wrong',
        TRN_KEYS.CLOSE
      )
    }
    return showModal(
      'success',
      `All Good`,
      'Registration is successfull',
      TRN_KEYS.LOGIN
    )
  }
  if (loading) return <TmActivityIndicator visible={loading} />
  return (
    <MainContainer>
      {/* Register form */}
      <KeyboardAvoidViewContainer>
        <ScrollView
          showsVerticalScrollIndicator={false}
          automaticallyAdjustKeyboardInsets
        >
          <IconHeader name="account-plus" />
          {/* Registration fields */}
          <TmForm
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={signupSchema}
          >
            <ErrorMessages
              error={message || 'Something went wrong!'}
              visible={error}
            />
            <TmFormField
              name="username"
              placeholder={TRN_KEYS.USERNAME}
              iconName="account"
            />
            <TmFormField
              name="email"
              placeholder={TRN_KEYS.EMAIL}
              iconName="email"
            />
            <TmFormField
              label="Mot de Passe"
              name="password"
              placeholder="* * * * * * * *"
              iconName="lock"
            />
            <TmFormField
              name="confirmpassword"
              label="Confirmer Mot de Passe"
              placeholder="* * * * * * * *"
              iconName="lock"
            />
            {/* Submit button */}
            <TmSubmitButton title="S'inscrire" />
            <AuthFooter
              unlinkedText={TRN_KEYS.ALREADYHAVEANACCOUNT}
              linkedText={TRN_KEYS.LOGIN}
              onPress={() => navigation.navigate(routes.LOGIN)}
            />
          </TmForm>
        </ScrollView>
        <MessageModal
          buttonHandler={buttonHandler}
          buttonText={buttonText}
          headerText={headerText}
          message={modalMessage}
          modalVisible={modalVisible}
          type={modalMessageType}
        />
      </KeyboardAvoidViewContainer>
    </MainContainer>
  )
}
