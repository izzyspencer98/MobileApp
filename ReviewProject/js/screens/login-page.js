import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Alert, ToastAndroid, Image } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ScrollView, TextInput } from 'react-native-gesture-handler'
import { Container } from 'native-base'
import styles from '../styling/stylesheet'
import { Block, Button, Card, NavBar, Icon, Input } from 'galio-framework'
import accountFetch from '../api/account'

class Login extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoading: true,
      email: '',
      password: ''
    }
  }

  async loginUser () {
    const navigation = this.props.navigation
    const toSend = {
      email: this.state.email,
      password: this.state.password
    }
    const response = await accountFetch.login(toSend)
    await AsyncStorage.setItem('@token', String(response.token))
    await AsyncStorage.setItem('@id', String(response.id))
    navigation.navigate('Home')
  }

  render () {
    const navigation = this.props.navigation
    return (
      <ScrollView>
        <Block>
          <Block
            middle
            style={{
              marginHorizontal: 60,
              padding: 10,
              marginTop: 100
            }}
          >
            <Block
              middle style={{
                padding: 10
              }}
            >
              <Image
                style={{ width: 300, height: 80, marginBottom: 20 }}
                source={{ uri: 'https://res.cloudinary.com/dk4rjadwm/image/upload/v1613039533/MobileApp/coffida-purple_srvd8k.png' }}
              />
            </Block>
            <Input
              type='email-address'
              rounded
              placeholder='Email'
              style={{
                borderColor: '#7B8CDE',
                borderWidth: 2,
                backgroundColor: '#F2F2F2',
                elevation: 3
              }}
              placeholderTextColor='#001D4A'
              onChangeText={(email) => this.setState({ email })}
              value={this.state.email}
            />
            <Input
              password
              rounded
              placeholder='Password'
              style={{
                borderColor: '#7B8CDE',
                borderWidth: 2,
                backgroundColor: '#F2F2F2',
                elevation: 3
              }}
              icon='lock'
              family='antdesign'
              iconColor='#697177'
              right
              placeholderTextColor='#001D4A'
              onChangeText={(password) => this.setState({ password })}
              value={this.state.password}
            />
          </Block>
          <Block
            middle
            style={{
              paddingTop: 10
            }}
          >
            <Button
              round
              size='large'
              color='#FE5F55'
              style={{
                elevation: 5
              }}
              onPress={() => this.loginUser()}
            >
              Login
            </Button>
            <Text style={{
              fontSize: 14,
              marginTop: 15,
              textAlign: 'center',
              color: '#697177'
            }}
            >Don't Have an Account?
            </Text>
            <Button
              round
              size='small'
              color='#FE5F55'
              style={{
                elevation: 5
              }}
              onPress={() => navigation.navigate('Sign Up')}
            >
              Sign Up
            </Button>
          </Block>
        </Block>
      </ScrollView>
    )
  }
}

export default Login
