import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native'

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './redux/reducers'
import thunk from 'redux-thunk'
const store = createStore(rootReducer, applyMiddleware(thunk))

import firebase from 'firebase'
import firebaseConfig from './keys'

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import LandingScreen from './components/auth/Landing'
import RegisterScreen from './components/auth/Register'
import LoginScreen from './components/auth/Login'
import MainScreen from './components/main/Main'
import AddScreen from './components/main/Add'


if(firebase.apps.length === 0){
  firebase.initializeApp(firebaseConfig)
  console.log('Firebase Connected!')
}

const Stack = createStackNavigator();
export default function App() {
  const [loaded, toggleLoaded] = useState(false)
  const [loggedIn, toggleLoggedIn] = useState(false)

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user){
        toggleLoggedIn(false)
        toggleLoaded(true)
      }else {
        toggleLoggedIn(true)
        toggleLoaded(true)
      }
    })
    
  }, [])
  
  if(!loaded){
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <Text>Loading...</Text>
      </View>
    )
  } 

  if (!loggedIn){
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Landing">
          <Stack.Screen name='Landing' component={LandingScreen} options={{ headerShown: false }}/>
          <Stack.Screen name='Register' component={RegisterScreen} />
          <Stack.Screen name='Login' component={LoginScreen} />
        </Stack.Navigator>
      </NavigationContainer>    
    );
  }

  return(
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Main">
            <Stack.Screen name='Main' component={MainScreen} options={{ headerShown: false }}/>
            <Stack.Screen name='Add' component={AddScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}
