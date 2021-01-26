import React, { Component } from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Login from '../screens/login-page'
import SignUp from '../screens/sign-up-page'

const Stack = createStackNavigator()

class Start extends Component {
  render () {
    return (
      <Stack.Navigator>
        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen name='Sign Up' component={SignUp} />
      </Stack.Navigator>
    )
  }
}

export default Start
