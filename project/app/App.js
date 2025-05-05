import 'react-native-gesture-handler'  // Asegúrate de que esté al principio
import { StatusBar } from 'expo-status-bar'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Home from './view/Home/HomeScreen'
import Login from './view/Login/LoginScreen'
import Register from './view/Register/RegisterScreen'
import ProfileScreen from './view/Profile/ProfileScreen'
import SearchProfile from './view/Profile/SearchProfile'
import UserProfileScreen from './view/Profile/UserProfileScreen'
import CreateGameScreen from './view/CreateGame/CreateGameScreen'
import ClassificationScreen from './view/Classification/ClassificationScreen'
import ClassificationHistoric from './view/Classification/ClassificationHistoric'
import ClassificationFinishedSeasons from './view/Classification/ClassificationFinishedSeasons'

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Home" component={Home} options={{ headerLeft: () => null }} />
        <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerLeft: () => null }} />
        <Stack.Screen name="SearchProfile" component={SearchProfile} options={{ headerLeft: () => null }} />
        <Stack.Screen name="UserProfile" component={UserProfileScreen} options={{ headerLeft: () => null }} />
        <Stack.Screen name="CreateGame" component={CreateGameScreen} options={{ headerLeft: () => null }} />
        <Stack.Screen name="Classification" component={ClassificationScreen} options={{ headerLeft: () => null }} />
        <Stack.Screen name='ClassificationHistoric' component={ClassificationHistoric} options={{ headerLeft: () => null }} />
        <Stack.Screen name='ClassificationFinishedSeasons' component={ClassificationFinishedSeasons} options={{ headerLeft: () => null }} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  )
}
