import { Component } from 'react'
import { ToastAndroid, Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

class UserFetch extends Component {
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

  async getUserDetails () {
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

  async updateUserDetails (toSend) {
    const token = await AsyncStorage.getItem('@token')
    const id = await AsyncStorage.getItem('@id')
    return fetch('http://10.0.2.2:3333/api/1.0.0/user/' + id, {
      method: 'patch',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': token
      },
      body: JSON.stringify(toSend)
    })
      .then((response) => {
        if (response.status === 200) {
          ToastAndroid.show('Account Updated Successfully', ToastAndroid.SHORT)
          console.log('account update successful')
        } else if (response.status === 400) {
          Alert.alert('Please edit your account details before updating.')
          console.log('account update failed - bad request')
        } else if (response.status === 401) {
          Alert.alert('Please login to use this feature')
          console.log('account update failed - unauthorized')
        } else if (response.status === 403) {
          Alert.alert('Something went wrong. Please close the app and try again.')
          console.log('account update failed - forbidden')
        } else if (response.status === 404) {
          Alert.alert('Apologies we cannot find your details. Please log out and log back in.')
          console.log('account update failed - not found')
        } else {
          Alert.alert('Something went wrong. Please try again.')
          console.log('account update failed - server error')
        }
        return response.status
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
