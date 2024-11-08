import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import Constants from 'expo-constants'
import { setContext } from '@apollo/client/link/context'

const uri =
  __DEV__ && Constants.expoConfig?.hostUri
    ? `http://${Constants.expoConfig.hostUri.split(`:`).shift()}:8000/graphql/`
    : Constants.expoConfig.extra.APOLLO_URI

const httpLink = createHttpLink({ uri })

const createApolloClient = (authStorage) => {
  const authLink = setContext(async (_, { headers }) => {
    try {
      const accessToken = await authStorage.getAccessToken()
      return {
        headers: {
          ...headers,
          authorization: accessToken ? `JWT ${accessToken}` : ''
        }
      }
    } catch (e) {
      console.log(e)
      return {
        headers
      }
    }
  })
  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
  })
}

export default createApolloClient
