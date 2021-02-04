import React, { Component } from 'react'
import { View, Text, Alert, ToastAndroid, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { TextInput } from 'react-native-gesture-handler'
import { Container } from 'native-base'
import styles from '../styling/stylesheet'

class Logout extends Component {
  constructor (props) {
    super(props)
    this.state = {
      xToken: ''
    }
  }

  async logoutUser () {
    const navigation = this.props.navigation
    this.state.xToken = await AsyncStorage.getItem('@session_token')

    return fetch('http://10.0.2.2:3333/api/1.0.0/user/logout', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': this.state.xToken
      }
    })
      .then((response) => {
        if (response.status === 200) {
          AsyncStorage.clear()
          ToastAndroid.show('Successfully logged out.', ToastAndroid.SHORT)
          navigation.navigate('Login')
        } else if (response.status === 401) {
          AsyncStorage.clear()
          Alert.alert('Unauthorised, you are not logged into an account.')
          navigation.navigate('Login')
        } else {
          Alert.alert('Something went wrong. Please try again.')
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  render () {
    const navigation = this.props.navigation
    return (
      <Container style={styles.startContainer}>
        {/* <Text style={styles.coffiDaText}>Logout</Text> */}
        <Text style={styles.logoutText}>Do you want to logout?</Text>
        <TouchableOpacity
          style={styles.signUpBtn}
          title='Logout'
          onPress={() => this.logoutUser()}
        >
          <Text style={styles.logoutBtnText}>Logout</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.signUpBtn}
          title='Go Home'
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.logoutBtnText}>Go Home</Text>
        </TouchableOpacity>
      </Container>
    )
  }
}

export default Logout
