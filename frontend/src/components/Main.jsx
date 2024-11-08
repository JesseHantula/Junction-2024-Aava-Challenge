import SignIn from '../screens/SignIn'
import SignOut from '../screens/SignOut'
import SignUp from '../screens/SignUp'
import Placeholder from '../screens/Placeholder'
import { ME_QUERY } from '../graphql/queries'
import { useQuery } from '@apollo/client'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Octicons from '@expo/vector-icons/Octicons'
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer'
import { getFocusedRouteNameFromRoute, useNavigation } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Auth from '../screens/Auth'

const Stack = createStackNavigator()

const ProfileStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Profile" component={Placeholder} />
    </Stack.Navigator>
  )
}

const Main = () => {
  const { data, refetch } = useQuery(ME_QUERY, { fetchPolicy: 'network-only' })
  console.log('data inside Main:', data)
  const signedIn = !!data?.me?.verified

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      {signedIn ? (
        <>
          <Stack.Screen name="MainDrawer" component={MainDrawer} />
          <Stack.Screen name="ProfileStack" component={ProfileStack} />
          <Stack.Screen name="SignOut" component={SignOut} />
        </>
      ) : (
        <>
          <Stack.Screen name="Auth" component={Auth} />
          <Stack.Screen name="Login" component={SignIn} options={({ route }) => ({ headerShown: true, title: getHeaderTitle(route) })} />
          <Stack.Screen name="SignUp" component={SignUp} options={({ route }) => ({ headerShown: true, title: getHeaderTitle(route) })} />
        </>
      )}
    </Stack.Navigator>
  )
}

const getHeaderTitle = (route) => {
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Home'

  switch (routeName) {
    case 'Home':
      return 'Insert Logo'
  }
}

const Tab = createBottomTabNavigator()

const HomeTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: 'orange',
        tabBarInactiveTintColor: 'grey'
      }}
    >
      <Tab.Screen
        name="Home"
        component={Placeholder}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => <Octicons name="home" size={size} color={color} />
        }}
      />
    </Tab.Navigator>
  )
}

const Drawer = createDrawerNavigator()

const CustomDrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        activeBackgroundColor="none"
        inactiveTintColor="grey"
        activeTintColor="grey"
        label="Sign Out"
        icon={() => <Octicons name="sign-out" size={25} color={'grey'} />}
        onPress={() => props.navigation.navigate('SignOut')}
        testID="sign-out-button"
      />
    </DrawerContentScrollView>
  )
}

const MainDrawer = () => {
  const navigation = useNavigation()

  return (
    <Drawer.Navigator
      screenOptions={({ navigation }) => ({
        headerLeft: () => (
          <Octicons
            name="person"
            size={25}
            color={'grey'}
            onPress={navigation.toggleDrawer}
            style={{ paddingLeft: 18 }}
            testID="open-drawer-button"
          />
        ),
        drawerActiveBackgroundColor: 'none',
        drawerActiveTintColor: 'grey',
        drawerInactiveTintColor: 'grey'
      })}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name="Profile"
        component={HomeTabs}
        options={({ route }) => ({
          headerTitle: getHeaderTitle(route),
          headerTitleAlign: 'center',
          drawerIcon: () => <Octicons name="person" size={25} color={'grey'} />
        })}
        listeners={{
          drawerItemPress: () => {
            navigation.navigate('ProfileStack')
          }
        }}
      />
    </Drawer.Navigator>
  )
}

export default Main
