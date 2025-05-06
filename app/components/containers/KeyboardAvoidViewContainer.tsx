import { KeyboardAvoidingView, KeyboardAvoidingViewProps } from 'react-native'
import React, { useContext } from 'react'
import { HeaderHeightContext } from '@react-navigation/elements'

import { onIOS } from '@/config/constants'

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
