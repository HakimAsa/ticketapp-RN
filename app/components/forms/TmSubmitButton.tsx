import { useFormikContext } from 'formik'

import TmButton, { TmButtonProps } from '../common/button/TmButton'

interface TmSubmitButtonProps extends TmButtonProps {}

export default function TmSubmitButton({
  title,
  style,
  ...props
}: TmSubmitButtonProps) {
  const { handleSubmit } = useFormikContext()
  return (
    <TmButton
      style={style}
      onPress={() => handleSubmit()}
      {...props}
      title={title}
    />
  )
}
