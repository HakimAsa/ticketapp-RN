import { Pressable, StyleSheet, PressableProps, View } from 'react-native'
import React from 'react'

import Colors, { ColorKeys } from '@/config/colors'
import TmText from '../text/TmText'
import i18n from '@/app/i18n'

export interface TmButtonProps extends PressableProps {
  style?: any
  textStyle?: any
  title?: string
  children?: React.ReactNode
  color?: ColorKeys // Ensures `color` is a valid key in Colors
}

export default function TmButton({
  children,
  color = 'primary',
  style,
  textStyle,
  title,
  ...props
}: TmButtonProps) {
  return (
    <Pressable
      {...props}
      style={[styles.button, { backgroundColor: Colors[color] }, style]}
    >
      {title ? (
        <TmText
          style={[
            { textTransform: 'uppercase', color: Colors.white },
            textStyle,
          ]}
        >
          {title || i18n.t('myBtton')}
        </TmText>
      ) : (
        <>{children}</>
      )}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 5,
    height: 40,
    color: Colors.white,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    fontWeight: 'bold',
    marginVertical: 10,
  },
})
