import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Alert, ToastAndroid, Image } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { TextInput } from 'react-native-gesture-handler'
import { Container } from 'native-base'
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
          return response.json()
        } else if (response.status === 400) {
          Alert.alert('Incorrect login details. Please try again or sign up for a new account.')
          console.log('login failed - incorrect details')
        } else {
          Alert.alert('Something went wrong. Please try again.')
          console.log('login failed - server error')
        }
      })
      .then(async (Json) => {
        console.log(Json)
        await AsyncStorage.setItem('@token', String(Json.token))
        await AsyncStorage.setItem('@id', String(Json.id))
        navigation.navigate('Home')
      })
      .catch((error) => {
        console.log(error)
      })
  }

  render () {
    const navigation = this.props.navigation
    return (
      <Container style={styles.startContainer}>
        <Image style={styles.coffiDaLogo} source={require('../../assets/images/coffida-white.png')} />
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder='Email'
            placeholderTextColor='#222E50'
            onChangeText={(email) => this.setState({ email })}
            value={this.state.email}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder='Password'
            placeholderTextColor='#222E50'
            secureTextEntry
            onChangeText={(password) => this.setState({ password })}
            value={this.state.password}
          />
        </View>
        <TouchableOpacity
          style={styles.loginBtn}
          onPress={() => this.loginUser()}
        >
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
        <Text style={styles.noAccountText}>Don't Have an Account?</Text>
        <TouchableOpacity
          style={styles.signUpBtn}
          title='Sign Up'
          onPress={() => navigation.navigate('Sign Up')}
        >
          <Text style={styles.loginText}>Sign Up</Text>
        </TouchableOpacity>
      </Container>
    )
  }
}

export default Login
