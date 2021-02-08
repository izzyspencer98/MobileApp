import React, { Component } from 'react'
import { View, Text, Button, Alert, TouchableOpacity, Image } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import AsyncStorage from '@react-native-async-storage/async-storage'
import styles from '../styling/stylesheet'
import { Container, Icon } from 'native-base'

class Account extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoading: true,
      userDetails: []
    }
  }

  async componentDidMount () {
    const navigation = this.props.navigation
    const token = await AsyncStorage.getItem('@token')
    if (token === null || token === undefined || token === '') {
      console.log('no token')
      navigation.navigate('Login')
    } else {
      console.log(token)
      this.setState({ isLoading: false })
      this.getUserDetails()
    }
  }

  async getUserDetails () {
    const navigation = this.props.navigation
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
          navigation.navigate('Login')
          console.log('user fetch failed - unauthorized')
        } else if (response.status === 404) {
          Alert.alert('Please create an account')
          navigation.navigate('Sign Up')
          console.log('user fetch failed - user not found')
        } else {
          Alert.alert('Something went wrong. Please try again.')
          console.log('user fetch failed - server error')
        }
      })
      .then((Json) => {
        console.log(Json)
        this.setState({ userDetails: Json })
        this.setState({ isLoading: false })
        this.forceUpdate()
      })
      .catch((error) => {
        console.log(error)
      })
  }

  render () {
    const navigation = this.props.navigation
    const isLoading = this.state.isLoading
    const userDetails = this.state.userDetails

    return (
      <Container>
        {isLoading
          ? <View><Text>LOADING</Text></View>
          : <Container style={styles.accountContainer}>
            <View style={styles.accountHeader}>
              <Image style={styles.accountIcon} source={require('../../assets/images/profile.png')} />
            </View>
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
              onPress={() => navigation.navigate('Update Account Details')}
            >
              <Text style={styles.loginText}>Edit Details</Text>
            </TouchableOpacity>
          </Container>}
      </Container>
    )
  }
}

export default Account
