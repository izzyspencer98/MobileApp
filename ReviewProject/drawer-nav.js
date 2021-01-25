import 'react-native-gesture-handler'

import React, { Component } from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'

import Home from './js/screens/home-page'
import Account from './js/screens/account-page'
import MyReviews from './js/screens/my-reviews-page'
import LikedReviews from './js/screens/liked-reviews-page'
import FavouriteShops from './js/screens/favourited-shops-page'
import Logout from './js/screens/logout-popup'

const Drawer = createDrawerNavigator()

class DrawerNav extends Component {
  render () {
    return (
      <Drawer.Navigator>
        <Drawer.Screen name='Home' component={Home} />
        <Drawer.Screen name='Account' component={Account} />
        <Drawer.Screen name='My Reviews' component={MyReviews} />
        <Drawer.Screen name='Liked Reviews' component={LikedReviews} />
        <Drawer.Screen name='Favourite Shops' component={FavouriteShops} />
        <Drawer.Screen name='Logout' component={Logout} />
      </Drawer.Navigator>
    )
  }
}
export default DrawerNav
