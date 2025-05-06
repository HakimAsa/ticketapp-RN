import TmPressableText from '@/app/components/common/text/TmPressableText'
import TmText from '@/app/components/common/text/TmText'
import { Row } from '@/app/components/containers'

export default function AuthFooter({
  linkedText,
  onPress,
  unlinkedText,
}: {
  linkedText: string
  onPress: () => void
  unlinkedText: string
}) {
  return (
    <Row
      gap={5}
      style={{ marginVertical: 25, justifyContent: 'center' }}
    >
      <TmText style={{ color: '#575757' }}>{unlinkedText}</TmText>
      <TmPressableText onPress={onPress}>{linkedText}</TmPressableText>
    </Row>
  )
}
