import { useState } from 'react'
import { StyleSheet } from 'react-native'
import { useFormikContext } from 'formik'

import TmTextInput, { TmTextInputProps } from '../inputs/TmTextInput'
import ErrorMessages from './ErrorMessages'
import Colors from '@/config/colors'

interface TmFormFieldProps<T> extends TmTextInputProps {
  name: keyof T & string // ensures name is a key in T
}

export default function TmFormField<T>({
  label,
  width,
  name,
  ...props
}: TmFormFieldProps<T>) {
  const { values, setFieldValue, touched, errors } = useFormikContext<T>()
  const [isFocused, setIsFocused] = useState(false)
  const [isPasswordVisible, setPasswordVisible] = useState(false)

  const isPasswordField =
    name.toLowerCase() === 'password' ||
    name === 'confirmpassword' ||
    name === 'confirmNewPassword' ||
    name === 'newPassword'
  return (
    <>
      <TmTextInput
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        value={values[name] as string}
        label={label}
        width={width}
        isPasswordField={isPasswordField}
        isPasswordVisible={isPasswordVisible}
        setIsPasswordVisible={setPasswordVisible}
        secureTextEntry={isPasswordField && !isPasswordVisible}
        onChangeText={(text) => setFieldValue(name, text)}
        iconColor={isFocused ? Colors.inputBorderColer : Colors.medium}
        input={isFocused && styles.focusedInput}
        {...props}
      />
      <ErrorMessages
        error={errors[name] as string}
        visible={touched[name] as boolean}
      />
    </>
  )
}

const styles = StyleSheet.create({
  focusedInput: {
    backgroundColor: '#e0f7fa',
    borderColor: '#00796b',
    borderWidth: 0,
    borderBottomWidth: 2,
  },
})
