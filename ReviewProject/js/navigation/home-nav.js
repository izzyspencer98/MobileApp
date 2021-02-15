import React, { Component } from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Home from '../screens/home-page'
import Search from '../components/search-form'
import Shop from '../components/shop-view'
import Review from '../components/review-form'
import Login from '../screens/login-page'
import SignUp from '../screens/sign-up-page'

const Stack = createStackNavigator()

class HomeNav extends Component {
  render () {
    return (
      <Stack.Navigator>
        <Stack.Screen name='Home' component={Home} />
        <Stack.Screen name='Search' component={Search} />
        <Stack.Screen name='Shop' component={Shop} />
        <Stack.Screen name='Review' component={Review} />
        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen name='Sign Up' component={SignUp} />
      </Stack.Navigator>
    )
  }
}
export default HomeNav
