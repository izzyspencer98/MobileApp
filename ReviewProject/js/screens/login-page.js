import React, { Component } from 'react'
import { Text, Image } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ScrollView } from 'react-native-gesture-handler'
import { Block, Button, Input } from 'galio-framework'
import accountFetch from '../api/account'
import styles from '../styling/stylesheet'

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
            style={styles.loginContainer}
          >
            <Block
              middle style={styles.padding10}
            >
              <Image
                style={styles.loginImg}
                source={{ uri: 'https://res.cloudinary.com/dk4rjadwm/image/upload/v1613039533/MobileApp/coffida-purple_srvd8k.png' }}
              />
            </Block>
            <Input
              type='email-address'
              rounded
              placeholder='Email'
              style={styles.textInput}
              placeholderTextColor='#001D4A'
              onChangeText={(email) => this.setState({ email })}
              value={this.state.email}
            />
            <Input
              password
              rounded
              placeholder='Password'
              style={styles.textInput}
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
            style={styles.pTop10}
          >
            <Button
              round
              size='large'
              color='#FE5F55'
              style={styles.elevation4}
              onPress={() => this.loginUser()}
            >
              Login
            </Button>
            <Text style={styles.accountText}>Don't Have an Account?</Text>
            <Button
              round
              size='small'
              color='#FE5F55'
              style={styles.elevation4}
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
