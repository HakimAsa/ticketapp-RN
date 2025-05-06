import {
  DimensionValue,
  StyleSheet,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from 'react-native'
import React from 'react'

import TmText from '../common/text/TmText'
import Colors from '@/config/colors'
import { MaterialCommunityIcons, McNames } from '@/config/icons'

export interface TmTextInputProps extends TextInputProps {
  iconColor?: string
  iconName?: McNames
  input?: any
  textStyle?: any
  width?: DimensionValue
  label?: string
  isPasswordField?: boolean
  isPasswordVisible?: boolean
  setIsPasswordVisible?: (param: boolean) => void
}

// ...
export default function TmTextInput({
  iconColor,
  iconName,
  input,
  label,
  textStyle,
  width,
  isPasswordField,
  isPasswordVisible,
  setIsPasswordVisible,
  ...props
}: TmTextInputProps) {
  return (
    <View style={{ marginBottom: 5 }}>
      {label ? (
        <TmText
          fontSize={10}
          style={[textStyle, { marginLeft: 0, fontWeight: 700 }]}
          {...props}
        >
          {label}
        </TmText>
      ) : null}
      <View style={[styles.container, { width }, input]}>
        {iconName && (
          <MaterialCommunityIcons
            name={iconName} // Fixed: Corrected the type of 'name' prop
            color={iconColor || Colors.medium}
            size={20}
          />
        )}

        <TextInput
          placeholderTextColor={Colors.medium}
          style={[styles.input]}
          autoCapitalize="none"
          autoCorrect={false}
          {...props}
        />
        {isPasswordField && (
          <TouchableOpacity
            onPress={() => setIsPasswordVisible?.(!isPasswordVisible)}
          >
            <MaterialCommunityIcons
              name={isPasswordVisible ? 'eye-off' : 'eye'}
              color={iconColor || Colors.medium}
              size={20}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: Colors.white,
    borderRadius: 5,
    marginVertical: 10,
    borderColor: Colors.secondary,
    borderWidth: 0.5,
    minHeight: 40, // ensures enough space to vertically center content
  },
  input: {
    flex: 1,
    fontSize: 14,
    paddingVertical: 5, // instead of margin
    borderColor: 'gray',
  },
})
