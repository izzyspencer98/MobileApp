import React, { Component } from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Home from '../screens/home-page'
import Search from '../components/search-form'
import Shop from '../components/shop-view'
import Review from '../components/review-form'

const Stack = createStackNavigator()

class HomeNav extends Component {
  render () {
    return (
      <Stack.Navigator>
        <Stack.Screen name='Home' component={Home} />
        <Stack.Screen name='Search' component={Search} />
        <Stack.Screen name='Shop' component={Shop} />
        <Stack.Screen name='Add Review' component={Review} />
      </Stack.Navigator>
    )
  }
}

export default HomeNav
