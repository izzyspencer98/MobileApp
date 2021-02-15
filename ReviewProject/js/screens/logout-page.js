import React, { Component } from 'react'
import { View, Text, Alert, ToastAndroid, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { TextInput } from 'react-native-gesture-handler'
import { Container } from 'native-base'
import styles from '../styling/stylesheet'
import { Block, Button, Card, NavBar, Icon, Input } from 'galio-framework'

class Logout extends Component {
  constructor (props) {
    super(props)
  }

  async logoutUser () {
    const navigation = this.props.navigation
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
          navigation.navigate('Login')
        } else if (response.status === 401) {
          AsyncStorage.clear()
          Alert.alert('You are not logged into an account.')
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
      <Block
        middle
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Text style={{
          fontSize: 30,
          marginBottom: 10,
          color: '#001D4A'
        }}
        >Do you want to logout?
        </Text>
        <Button
          round
          size='small'
          color='#FE5F55'
          style={{
            elevation: 5
          }}
          onPress={() => this.logoutUser()}
        >
          Logout
        </Button>
        <Button
          round
          size='small'
          color='#FE5F55'
          style={{
            elevation: 5
          }}
          onPress={() => navigation.navigate('Home')}
        >
          Go Home
        </Button>
      </Block>
    )
  }
}

export default Logout
