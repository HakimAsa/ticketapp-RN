import TkProps from '@/TkProps'
import React, { useState } from 'react'
import { Alert } from 'react-native'
import TmButton from '../components/common/button/TmButton'
import TmText from '../components/common/text/TmText'
import MainContainer, {
  KeyboardAvoidViewContainer,
} from '../components/containers'
import TmTextInput from '../components/inputs/TmTextInput'

const EventDetailsScreen = ({ route, navigation }: TkProps) => {
  const { event } = route.params
  const [form, setForm] = useState({ first_name: '', last_name: '', email: '' })

  const handleInput = (field: string, value: string) =>
    setForm({ ...form, [field]: value })

  const submit = async () => {
    try {
      const res = { ok: true, text: () => 'fail', ticket: 'aaa' }
      //   await fetch(
      //     `http://localhost:5000/api/events/${event.id}/participate`,
      //     {
      //       method: 'POST',
      //       headers: { 'Content-Type': 'application/json' },
      //       body: JSON.stringify(form),
      //     }
      //   )

      if (!res.ok) {
        const error = await res.text()
        Alert.alert('Error', error)
        return
      }

      //   const data = await res.json()
      navigation.navigate('TicketConfirmation', {
        ticket: res.ticket,
        eventName: event.title,
      })
    } catch (err) {
      Alert.alert('Error', 'Something went wrong')
    }
  }

  return (
    <MainContainer>
      <TmText style={{ fontSize: 20 }}>{event.title}</TmText>
      <TmText>{event.description}</TmText>
      <KeyboardAvoidViewContainer>
        <TmTextInput
          placeholder="Prénom"
          value={form.first_name}
          onChangeText={(val) => handleInput('first_name', val)}
        />
        <TmTextInput
          placeholder="Nom"
          value={form.last_name}
          onChangeText={(val) => handleInput('last_name', val)}
        />
        <TmTextInput
          placeholder="E-mail"
          value={form.email}
          onChangeText={(val) => handleInput('email', val)}
          keyboardType="email-address"
        />

        <TmButton
          title="Register"
          onPress={submit}
        />
      </KeyboardAvoidViewContainer>
    </MainContainer>
  )
}

export default EventDetailsScreen
