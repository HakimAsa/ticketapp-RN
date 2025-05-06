import { HeaderHeightContext } from '@react-navigation/elements'
import React, { useContext } from 'react'
import { KeyboardAvoidingView, KeyboardAvoidingViewProps } from 'react-native'

import { onIOS } from '@/app/config/constants'

interface KeyboardProps extends KeyboardAvoidingViewProps {}

export default function KeyboardAvoidViewContainer({
  children,
}: KeyboardProps) {
  return (
    <KeyboardAvoidingView
      behavior={onIOS ? 'padding' : undefined}
      style={{ flex: 1 }}
      keyboardVerticalOffset={useContext(HeaderHeightContext) ?? 0}
    >
      {children}
    </KeyboardAvoidingView>
  )
}
