import { Component } from 'react'
import { ToastAndroid, Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

class AccountFetch extends Component {
  async login (toSend) {
    return fetch('http://10.0.2.2:3333/api/1.0.0/user/login', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(toSend)
    })
      .then((response) => {
        if (response.status === 200) {
          ToastAndroid.show('Successfully logged in.', ToastAndroid.SHORT)
          console.log('login successful')
        } else if (response.status === 400) {
          Alert.alert('Incorrect login details. Please try again or sign up for a new account.')
          console.log('login failed - incorrect details')
        } else {
          Alert.alert('Something went wrong. Please try again.')
          console.log('login failed - server error')
        }
        return response.json()
      })
      .catch((error) => {
        console.log(error)
      })
  }

  async logout () {
    const token = await AsyncStorage.getItem('@token')

    return fetch('http://10.0.2.2:3333/api/1.0.0/user/logout', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': token
      }
    })
      .then((response) => {
        if (response.status === 200) {
          AsyncStorage.clear()
          ToastAndroid.show('Successfully logged out.', ToastAndroid.SHORT)
        } else if (response.status === 401) {
          AsyncStorage.clear()
          Alert.alert('You are not logged into an account.')
        } else {
          Alert.alert('Something went wrong. Please try again.')
        }
        return response.status
      })
      .catch((error) => {
        console.log(error)
      })
  }

  async signUp (toSend) {
    return fetch('http://10.0.2.2:3333/api/1.0.0/user', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(toSend)
    })
      .then((response) => {
        if (response.status === 201) {
          ToastAndroid.show('Account created successfully.', ToastAndroid.SHORT)
          console.log('sign up successful')
        } else if (response.status === 400) {
          Alert.alert('Sign up failed. Please ensure all fields are completed and you have entered an unregistered email.')
          console.log('sign up failed - duplicate email')
        } else {
          Alert.alert('Something went wrong. Please try again.')
          console.log('sign up failed - server error')
        }
        return response.status
      })
      .catch((error) => {
        console.log(error)
      })
  }
}
const accountFetch = new AccountFetch()
export default accountFetch
