import { View, TouchableOpacity, StyleSheet } from 'react-native'
import Text from '../components/Text'

const Auth = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.signUpButton} onPress={() => navigation.navigate('SignUp')}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <Text style={styles.text}>By signing up, you agree to our Terms and Privacy Policy.</Text>
      <Text style={styles.text}>
        Already have an account? <Text onPress={() => navigation.navigate('Login')}>Log in</Text>
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  signUpButton: {
    width: 220,
    height: 40,
    marginVertical: 10,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20
  },
  buttonText: {
    color: 'white',
    fontSize: 15,
    fontWeight: '500'
  },
  text: {
    color: 'grey'
  }
})

export default Auth
