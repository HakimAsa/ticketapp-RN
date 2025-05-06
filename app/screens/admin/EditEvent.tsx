import TmButton from '@/app/components/common/button/TmButton'
import MainContainer, {
  KeyboardAvoidViewContainer,
} from '@/app/components/containers'
import TmForm, { TmFormField } from '@/app/components/forms'
import helpers from '@/app/utils/helpers'
import TkProps from '@/TkProps'
import React, { useEffect, useState } from 'react'
import { Alert, ScrollView } from 'react-native'
import * as Yup from 'yup'

const { getBaseUrl } = helpers

const eventEditsSchema = Yup.object({
  title: Yup.string().required('Titre obligatoire'),
  description: Yup.string()
    .required('Description obligatoire')
    .min(20, 'au moins 20 caractere'),
  start_date: Yup.string(),
  end_date: Yup.string(),
  status: Yup.string(),
  max_participants: Yup.number(),
})

type EventEditFormValues = Yup.InferType<typeof eventEditsSchema>

const initialValues: EventEditFormValues = {
  title: '',
  description: '',
  start_date: '',
  end_date: '',
  status: 'active',
  max_participants: 100,
}

const EditEvent = ({ route, navigation }: TkProps) => {
  const event = route.params?.event
  const [form, setForm] = useState({
    title: '',
    description: '',
    start_date: '',
    end_date: '',
    status: 'active',
    max_participants: '100',
  })

  useEffect(() => {
    if (event) {
      setForm(event)
    }
  }, [event])

  const submit = async (values: any) => {
    const method = event ? 'PUT' : 'POST'
    const url = event
      ? `${getBaseUrl()}/admin/events/${event.id}`
      : `${getBaseUrl()}/admin/events`

    try {
      await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values, null, 2),
      })
      Alert.alert('Success', 'Event saved')
      navigation.goBack()
    } catch (err) {
      Alert.alert('Error', 'Something went wrong')
    }
  }

  return (
    <MainContainer>
      <KeyboardAvoidViewContainer>
        <ScrollView>
          <TmForm
            initialValues={initialValues}
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
                name={field}
                placeholder={field.replace('_', ' ')}
                style={{ marginBottom: 12, borderBottomWidth: 1 }}
              />
            ))}
            <TmButton
              title={event ? 'Mettre a jour' : 'Creer'}
              onPress={submit}
            />
          </TmForm>
        </ScrollView>
      </KeyboardAvoidViewContainer>
    </MainContainer>
  )
}

export default EditEvent
