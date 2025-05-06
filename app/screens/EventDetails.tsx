import TkProps from '@/TkProps'
import React, { useState } from 'react'
import { Alert } from 'react-native'
import * as Yup from 'yup'
import TmText from '../components/common/text/TmText'
import MainContainer, {
  KeyboardAvoidViewContainer,
} from '../components/containers'
import TmForm, { TmFormField, TmSubmitButton } from '../components/forms'
import TkActivityIndicator from '../components/loader/TkActivityIndicator'
import routes from '../navigation/routes'
import helpers from '../utils/helpers'

const participantsSchema = Yup.object({
  email: Yup.string().email().required('E-mail obligatoire'),
  first_name: Yup.string()
    .min(2, 'au moins 2 caractere')
    .required('Prénom obligatoire'),
  last_name: Yup.string()
    .min(2, 'au moins 2 caractere')
    .required('Nom obligatoire'),
})

type ParticipantFormValues = Yup.InferType<typeof participantsSchema>

const initialValues: ParticipantFormValues = {
  email: '',
  first_name: '',
  last_name: '',
}

const EventDetailsScreen = ({ route, navigation }: TkProps) => {
  const [loading, setLoading] = useState(false)
  const { event } = route.params

  const submit = async (values: any) => {
    try {
      setLoading(true)
      const res = await fetch(
        `${helpers.getBaseUrl()}/events/${event.id}/participate`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values, null, 2),
        }
      )

      setLoading(true)

      if (!res.ok) {
        const error = await res.text()
        Alert.alert('Error', error)
        return
      }

      const data = await res.json()
      navigation.navigate(routes.TICKETCONFIRMATION, {
        ticket: data.ticket,
        eventName: event.title,
      })
    } catch (err) {
      Alert.alert('Error', 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <TkActivityIndicator visible={loading} />

  return (
    <MainContainer>
      <TmText style={{ fontSize: 20 }}>{event.title}</TmText>
      <TmText>{event.description}</TmText>
      <KeyboardAvoidViewContainer>
        <TmForm
          initialValues={initialValues}
          onSubmit={submit}
          validationSchema={participantsSchema}
        >
          <TmFormField
            name="first_name"
            placeholder="Prénom"
          />
          <TmFormField
            name="last_name"
            placeholder="Nom"
          />
          <TmFormField
            name="email"
            placeholder="E-mail"
            keyboardType="email-address"
          />

          <TmSubmitButton title="Register" />
        </TmForm>
      </KeyboardAvoidViewContainer>
    </MainContainer>
  )
}

export default EventDetailsScreen
