import Colors from '@/app/config/colors'
import TmText from '../common/text/TmText'

interface ErrorMessagesProps {
  error: string
  visible: boolean
}

export default function ErrorMessages({ error, visible }: ErrorMessagesProps) {
  if (!visible || !error) return null
  return (
    <TmText
      small
      style={{ color: Colors.red }}
    >
      {error}
    </TmText>
  )
}
