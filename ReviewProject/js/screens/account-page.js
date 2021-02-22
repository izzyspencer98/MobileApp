import React, { Component } from 'react'
import { View, Text, Alert, TouchableOpacity, Image, ActivityIndicator } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import styles from '../styling/stylesheet'
import { Container } from 'native-base'
import { Block, Button, Card, NavBar, Icon, Input } from 'galio-framework'
import { ScrollView } from 'react-native-gesture-handler'

class Account extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoading: true,
      userDetails: [],
      newFirstName: '',
      newLastName: '',
      newEmail: '',
      newPassword: ''
    }
  }

  async componentDidMount () {
    const navigation = this.props.navigation
    const token = await AsyncStorage.getItem('@token')
    this.unmount = navigation.addListener('focus', () => {
      this.componentDidMount()
    })
    if (token === null || token === undefined || token === '') {
      console.log('no token')
      navigation.navigate('Login')
    } else {
      console.log(token)
      this.setState({ isLoading: true })
      this.getUserDetails()
    }
  }

  componentWillUnmount () {
    this.unmount()
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
        this.setState({ userDetails: Json })
        this.setState({ isLoading: false })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  async updateAccount () {
    // this not running
    console.log('UPDATING ACCOUNT')

    const toSend = {}
    const { userDetails, newFirstName, newLastName, newEmail, newPassword } = this.state

    if (newFirstName !== userDetails.first_name && newFirstName !== '') {
      toSend.first_name = newFirstName
    }
    if (newLastName !== userDetails.last_name && newLastName !== '') {
      toSend.last_name = newLastName
    }
    if (newEmail !== userDetails.email && newEmail !== '') {
      toSend.email = newEmail
    }
    if (newPassword !== '') {
      toSend.password = newPassword
    }

    console.log(toSend)

    // validation here

    // request here

    const navigation = this.props.navigation
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
          Alert.alert('Account Updated Successfully')
          console.log('account update successful')
          this.getUserDetails()
          return response.json()
        } else if (response.status === 400) {
          Alert.alert('Please edit your account details before updating.')
          console.log('account update failed - bad request')
        } else if (response.status === 401) {
          Alert.alert('Please login to use this feature')
          navigation.navigate('Login')
          console.log('account update failed - unauthorized')
        } else if (response.status === 403) {
          Alert.alert('Something went wrong. Please close the app and try again.')
          console.log('account update failed - forbidden')
        } else if (response.status === 404) {
          Alert.alert('Apologies we cannot find your details. Please log out and log back in.')
          navigation.navigate('Logout')
          console.log('account update failed - not found')
        } else {
          Alert.alert('Something went wrong. Please try again.')
          console.log('account update failed - server error')
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  render () {
    const { isLoading, userDetails } = this.state
    console.log('ACCOUNT - ' + userDetails)

    if (isLoading) {
      return (
        <Block
          middle
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <ActivityIndicator size='large' color='#7B8CDE' />
        </Block>
      )
    }

    return (
      <ScrollView>
        <Block>
          <Block middle style={{ paddingTop: 40 }}>
            <Image
              style={{ width: 80, height: 80 }}
              source={{ uri: 'https://res.cloudinary.com/dk4rjadwm/image/upload/v1612982465/MobileApp/profile-purple_sapa50.png' }}
            />
            <Text style={{
              fontSize: 30,
              marginBottom: 10,
              color: '#001D4A'
            }}
            >Account Details
            </Text>
            <Text style={{
              fontSize: 14,
              marginBottom: 20,
              marginHorizontal: 20,
              textAlign: 'center',
              color: '#697177'
            }}
            >Edit your details below and then click the button to update your account.
            </Text>
          </Block>
          <Block
            middle
            style={{
              marginHorizontal: 60,
              padding: 10
            }}
          >
            <Input
              rounded
              placeholder={userDetails.first_name}
              style={{
                borderColor: '#7B8CDE',
                borderWidth: 2,
                backgroundColor: '#F2F2F2',
                elevation: 3
              }}
              placeholderTextColor='#001D4A'
              onChangeText={(newFirstName) => this.setState({ newFirstName })}
              value={this.state.newFirstName}
            />
            <Input
              rounded
              placeholder={userDetails.last_name}
              style={{
                borderColor: '#7B8CDE',
                borderWidth: 2,
                backgroundColor: '#F2F2F2',
                elevation: 3
              }}
              placeholderTextColor='#001D4A'
              onChangeText={(newLastName) => this.setState({ newLastName })}
              value={this.state.newLastName}
            />
            <Input
              type='email-address'
              rounded
              placeholder={userDetails.email}
              style={{
                borderColor: '#7B8CDE',
                borderWidth: 2,
                backgroundColor: '#F2F2F2',
                elevation: 3
              }}
              placeholderTextColor='#001D4A'
              onChangeText={(newEmail) => this.setState({ newEmail })}
              value={this.state.newEmail}
            />
            <Input
              password
              rounded
              placeholder='********'
              style={{
                borderColor: '#7B8CDE',
                borderWidth: 2,
                backgroundColor: '#F2F2F2',
                elevation: 3
              }}
              icon='lock'
              family='antdesign'
              iconColor='#001D4A'
              right
              help='Minimum 6 characters'
              bottomHelp
              placeholderTextColor='#001D4A'
              onChangeText={(newPassword) => this.setState({ newPassword })}
              value={this.state.newPassword}
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
              onPress={() => this.updateAccount()}
            >
              Update Account
            </Button>
          </Block>
        </Block>
      </ScrollView>
    )
  }
}

export default Account
