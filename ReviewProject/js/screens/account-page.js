import React, { Component } from 'react'
import { View, Text, Alert, TouchableOpacity, Image, ActivityIndicator } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import styles from '../styling/stylesheet'
import { Container } from 'native-base'
import { Block, Button, Card, NavBar, Icon, Input } from 'galio-framework'
import { ScrollView } from 'react-native-gesture-handler'
import userFetch from '../api/user'

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
      this.setState({ isLoading: true }, () => {
        this.getUserDetails()
      })
    }
  }

  componentWillUnmount () {
    this.unmount()
  }

  async getUserDetails () {
    const userDetails = await userFetch.getUserDetails()
    this.setState({ userDetails: userDetails }, () => {
      this.setState({ isLoading: false })
    })
  }

  async updateAccount () {
    this.setState({ isLoading: true })
    const navigation = this.props.navigation
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

    const status = await userFetch.updateUserDetails(toSend)
    if (status === 200) {
      this.getUserDetails()
    }
    if (status === 401) {
      navigation.navigate('Login')
    }
    if (status === 404) {
      navigation.navigate('Logout')
    }
  }

  render () {
    const { isLoading, userDetails } = this.state

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
