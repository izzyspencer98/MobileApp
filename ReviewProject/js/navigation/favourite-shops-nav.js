import React, { Component } from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import FavouriteShops from '../screens/favourited-shops-page'
import Shop from '../components/shop-view'

const Stack = createStackNavigator()

class FavouritesNav extends Component {
  render () {
    return (
      <Stack.Navigator>
        <Stack.Screen name='Favourite Shops' component={FavouriteShops} />
        <Stack.Screen name='Shop' component={Shop} />
      </Stack.Navigator>
    )
  }
}

export default FavouritesNav
