import { Modal } from 'react-native'

export default function TmModal({ ...props }) {
  const { children } = props

  return <Modal {...props}>{children}</Modal>
}
