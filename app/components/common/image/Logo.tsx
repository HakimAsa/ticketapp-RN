import { Image } from 'react-native'

interface ImageProps {
  marginTop?: number
  height?: number
  width?: number
  style?: any
}

export default function Logo({
  marginTop,
  style,
  height = 50,
  width = 50,
}: ImageProps) {
  return (
    <Image
      source={require('../../../../assets/images/logo.png')}
      style={[
        {
          width,
          height,
          borderRadius: width * 0.5,
          marginTop: marginTop || 10,
        },
        style,
      ]}
    />
  )
}
