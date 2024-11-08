import { TextInput as NativeTextInput, StyleSheet } from 'react-native'
import theme from '../theme'

const styles = StyleSheet.create({
  inputBox: {
    borderWidth: 1,
    fontFamily: theme.fonts,
    borderColor: theme.colors.textSecondary,
    borderRadius: 3,
    padding: 10,
    marginTop: 15,
    marginRight: 15,
    marginLeft: 15
  },
  errorBox: {
    fontFamily: theme.fonts,
    borderWidth: 1,
    borderColor: '#d73a4a',
    borderRadius: 3,
    padding: 10,
    marginTop: 15,
    marginRight: 15,
    marginLeft: 15
  }
})

const TextInput = ({ style, error, ...props }) => {
  const textInputStyle = [styles.inputBox, error && styles.errorBox, style]

  return <NativeTextInput style={textInputStyle} autoCapitalize="none" {...props} />
}

export default TextInput
