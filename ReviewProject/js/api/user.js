import React, { Component } from 'react'
import { View, Text, ActivityIndicator, ScrollView, Image, ToastAndroid, Alert } from 'react-native'
import { Block, Button, Card, NavBar, Icon, Input } from 'galio-framework'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { AirbnbRating } from 'react-native-ratings'
import { TouchableOpacity } from 'react-native-gesture-handler'

class UserFetch extends Component {
  async getUserDetails () {
    const userData = await this.getUser()
    return userData
  }

  async getReviewID (reviewBody) {
    const userData = await this.getReviews()
    let revID = 0
    revID = await this.compareReviews(reviewBody, userData)
    return revID
  }

  compareReviews (reviewBody, userData) {
    let revID = 0
    userData.reviews.map((review, index) => (
      revID = this.getID(review, reviewBody)
    ))
    return revID
  }

  getID (review, reviewBody) {
    if (review.review.review_body === reviewBody) {
      return review.review.review_id
    }
  }

  async getUser () {
    const token = await AsyncStorage.getItem('@token')
    const id = await AsyncStorage.getItem('@id')
    return fetch('http://10.0.2.2:3333/api/1.0.0/user/' + id, {
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': token
      }
    })
      .then((response) => {
        if (response.status === 200) {
          console.log('user fetch successful')
          return response.json()
        } else if (response.status === 401) {
          Alert.alert('Please login to use this feature')
          console.log('user fetch failed - unauthorized')
        } else if (response.status === 404) {
          Alert.alert('Please create an account')
          console.log('user fetch failed - user not found')
        } else {
          Alert.alert('Something went wrong. Please try again.')
          console.log('user fetch failed - server error')
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  async getReviews () {
    const token = await AsyncStorage.getItem('@token')
    const id = await AsyncStorage.getItem('@id')
    return fetch('http://10.0.2.2:3333/api/1.0.0/user/' + id, {
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': token
      }
    })
      .then((response) => {
        if (response.status === 200) {
          console.log('user reviews fetch successful')
          return response.json()
        } else if (response.status === 401) {
          console.log('user reviews fetch failed - unauthorized')
        } else if (response.status === 404) {
          console.log('user reviews fetch failed - user not found')
        } else {
          console.log('user reviews fetch failed - server error')
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }
}
const userFetch = new UserFetch()
export default userFetch
