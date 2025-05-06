const Colors = {
  black: '#000',
  danger: '#ff5252',
  dark: {},
  darkgray: '#0c0c0c',
  green: 'green',
  focus: '#e0f7fa',
  inputBorderColer: '#00796b',
  light: {},
  lightblack: '#454545',
  ligthgray: '#d3d3d3',
  medium: '#6e6969',
  orange: 'orange',
  primary: '#1E73BE',
  primary1: '#1A7499',
  red: 'red',
  secondary: 'rgba(131, 56, 138, 1)',
  success: '#198754',
  white: '#fff',
  yellow: 'yellow',
} as const // `as const` makes the object properties readonly literals

export default Colors
// Extracts the keys of Colors as a TypeScript type
export type ColorKeys = keyof typeof Colors
