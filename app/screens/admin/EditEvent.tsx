import MainContainer, {
  KeyboardAvoidViewContainer,
} from '@/app/components/containers'
import TmForm, { TmFormField, TmSubmitButton } from '@/app/components/forms'
import TkActivityIndicator from '@/app/components/loader/TkActivityIndicator'
import authStorage from '@/app/context/auth/Storage'
import helpers from '@/app/utils/helpers'
import TkProps from '@/TkProps'
import dayjs from 'dayjs'
import { useState } from 'react'
import { Alert, ScrollView } from 'react-native'
import * as Yup from 'yup'

const { getBaseUrl } = helpers

const eventEditsSchema = Yup.object({
  title: Yup.string().required('Titre obligatoire'),
  description: Yup.string()
    .required('Description obligatoire')
    .min(20, 'au moins 20 caractères'),
  start_date: Yup.date().required('Date du debut obligatoire'),
  end_date: Yup.date().when('start_date', (st, schema) => {
    return schema.min(st)
  }),
  //   Yup.string().required('Date de fin obligatoire'),
  status: Yup.string(),
  max_participants: Yup.number(),
})

type EventEditFormValues = Yup.InferType<typeof eventEditsSchema>

const EditEvent = ({ route, navigation }: TkProps) => {
  const [loading, setLoading] = useState(false)
  const event = route.params?.event

  const initialFormValues: EventEditFormValues = event
    ? {
        title: event.title || '',
        description: event.description || '',
        start_date: dayjs(event.start_date || new Date()).format('DD/MM/YYYY'),
        end_date: dayjs(event.end_date || new Date()).format('DD/MM/YYYY'),
        status: event.status === 'active' ? 'Actif' : 'Expiré',
        max_participants: event.max_participants.toString(),
      }
    : {
        title: '',
        description: '',
        start_date: new Date(),
        end_date: new Date(),
        status: 'active',
        max_participants: 100,
      }

  const submit = async (values: any) => {
    setLoading(true)
    const token = await authStorage.getToken()
    const method = event ? 'PUT' : 'POST'
    const url = event
      ? `${getBaseUrl()}/admin/events/${event.id}`
      : `${getBaseUrl()}/admin/events`

    // 🔁 Convert "DD/MM/YYYY" to "YYYY-MM-DD"
    const formattedValues = {
      ...values,
      start_date: dayjs(values.start_date, 'DD/MM/YYYY').format('YYYY-MM-DD'),
      end_date: dayjs(values.end_date, 'DD/MM/YYYY').format('YYYY-MM-DD'),
      max_participants: parseInt(values.max_participants, 10), // if it's a string
      status: values.status.includes('ex') ? 'expired' : 'active',
    }
    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formattedValues, null, 2),
      })
      setLoading(false)
      if (!res?.ok) {
        console.error('Erreor', res)
        Alert.alert('Erreur', "Une erreur s'est produite")
        return
      }
      Alert.alert('Succès', 'Événement enregistré', [
        {
          text: 'OK',
          onPress: () => {
            if (route.params?.onGoBack) {
              route.params.onGoBack()
            } else {
              navigation.goBack()
            }
          },
        },
      ])
    } catch (err) {
      console.log(err)
      Alert.alert('Erreur', `Quelque chose s'est mal passé`)
    }
  }

  if (loading) return <TkActivityIndicator visible={loading} />

  return (
    <MainContainer style={{ padding: 24 }}>
      <KeyboardAvoidViewContainer>
        <ScrollView>
          <TmForm
            initialValues={initialFormValues}
            onSubmit={submit}
            validationSchema={eventEditsSchema}
          >
            {[
              'title',
              'description',
              'start_date',
              'end_date',
              'status',
              'max_participants',
            ].map((field) => (
              <TmFormField
                key={field}
                multiline={field === 'description'}
                name={field}
                keyboardType={
                  field === 'max_participants' ? 'numeric' : 'default'
                }
                placeholder={field.replace('_', ' ')}
              />
            ))}
            <TmSubmitButton title={event ? 'Mettre à jour' : 'Créer'} />
          </TmForm>
        </ScrollView>
      </KeyboardAvoidViewContainer>
    </MainContainer>
  )
}

export default EditEvent
