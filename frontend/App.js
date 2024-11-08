import 'react-native-gesture-handler' //Do not touch
import { StatusBar } from 'expo-status-bar'
import { ApolloProvider } from '@apollo/client'
import Constants from 'expo-constants'
import { NavigationContainer } from '@react-navigation/native'
import Main from './src/components/Main'
import createApolloClient from './src/utils/apolloClient'
import AuthStorage from './src/utils/authStorage'
import AuthStorageContext from './src/contexts/AuthStorageContext'

const authStorage = new AuthStorage()
const apolloClient = createApolloClient(authStorage)

const App = () => {
  return (
    <>
      <NavigationContainer>
        <ApolloProvider client={apolloClient}>
          <AuthStorageContext.Provider value={authStorage}>
            <Main />
          </AuthStorageContext.Provider>
        </ApolloProvider>
      </NavigationContainer>
      <StatusBar style="auto" />
    </>
  )
}

export default App
