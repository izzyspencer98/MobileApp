import React, { Component } from 'react'
import { View, Text, ActivityIndicator, ScrollView, Image, ToastAndroid, Alert } from 'react-native'
import { Block, Button, Card, NavBar, Icon, Input } from 'galio-framework'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { AirbnbRating } from 'react-native-ratings'
import { TouchableOpacity } from 'react-native-gesture-handler'

class ReviewFetch extends Component {
  async addReview (locID, overallRating, priceRating, qualityRating, clenlinessRating, reviewBody) {
    const token = await AsyncStorage.getItem('@token')
    const toSend = {
      overall_rating: overallRating,
      price_rating: priceRating,
      quality_rating: qualityRating,
      clenliness_rating: clenlinessRating,
      review_body: reviewBody
    }

    return fetch('http://10.0.2.2:3333/api/1.0.0/location/' + locID + '/review', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': token
      },
      body: JSON.stringify(toSend)
    })
      .then((response) => {
        if (response.status === 201) {
          ToastAndroid.show('Review Posted Successfully', ToastAndroid.SHORT)
          console.log('new review successful')
        } else if (response.status === 400) {
          Alert.alert('Review failed. Please ensure all fields are completed before you post.')
          console.log('new review failed - bad request')
        } else if (response.status === 401) {
          Alert.alert('Please login to use this feature')
        } else if (response.status === 404) {
          Alert.alert('Apologies we cannot post this review. Please log out and log back in.')
          console.log('new review failed - not found')
        } else {
          Alert.alert('Something went wrong. Please try again.')
          console.log('new review failed - server error')
        }
        return response.status
      })
      .catch((error) => {
        console.log(error)
      })
  }
}
const reviewFetch = new ReviewFetch()
export default reviewFetch
