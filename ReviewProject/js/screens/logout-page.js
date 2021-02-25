import React, { Component } from 'react'
import { View, Text, Alert, ToastAndroid, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { TextInput } from 'react-native-gesture-handler'
import { Container } from 'native-base'
import styles from '../styling/stylesheet'
import { Block, Button, Card, NavBar, Icon, Input } from 'galio-framework'
import accountFetch from '../api/account'

class Logout extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoading: true
    }
  }

  async logoutUser () {
    const navigation = this.props.navigation
    const status = await accountFetch.logout()
    if (status === 200) {
      navigation.navigate('Login')
    }
    if (status === 401) {
      navigation.navigate('Login')
    }
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
