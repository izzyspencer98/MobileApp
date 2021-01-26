import React, { Component } from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import LikedReviews from '../screens/liked-reviews-page'

const Stack = createStackNavigator()

class LikedReviewsNav extends Component {
  render () {
    return (
      <Stack.Navigator>
        <Stack.Screen name='Liked Reviews' component={LikedReviews} />
      </Stack.Navigator>
    )
  }
}

export default LikedReviewsNav
