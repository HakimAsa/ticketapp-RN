import TkProps from '@/TkProps'
import React from 'react'
import TmButton from '../components/common/button/TmButton'
import TmText from '../components/common/text/TmText'
import MainContainer from '../components/containers'

const TicketConfirmationModal = ({ route, navigation }: TkProps) => {
  const { ticket, eventName } = route.params

  return (
    <MainContainer style={{ alignItems: 'center' }}>
      <TmText style={{ fontSize: 22, marginBottom: 12 }}>
        ✅ Inscription Confirmée!
      </TmText>
      <TmText style={{ fontSize: 18 }}>Evenement: {eventName}</TmText>
      <TmText style={{ marginVertical: 16 }}>
        🎟️ Votre code de billet:{' '}
        <TmText style={{ fontWeight: '700' }}>{ticket}</TmText>
      </TmText>
      <TmButton
        title="Retour"
        style={{ width: '50%' }}
        onPress={() => navigation?.popToTop()}
      />
    </MainContainer>
  )
}

export default TicketConfirmationModal
