import React, { Component } from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import MyReviews from '../screens/my-reviews-page'
import Review from '../components/review-form'

const Stack = createStackNavigator()

class MyReviewsNav extends Component {
  render () {
    return (
      <Stack.Navigator>
        <Stack.Screen name='My Reviews' component={MyReviews} />
        <Stack.Screen name='Edit Review' component={Review} />
      </Stack.Navigator>
    )
  }
}

export default MyReviewsNav
