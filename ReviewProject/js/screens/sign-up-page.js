import React, { Component } from 'react'
import { Text, Image, ScrollView } from 'react-native'
import { Block, Button, Input } from 'galio-framework'
import accountFetch from '../api/account'
import styles from '../styling/stylesheet'

class SignUp extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoading: true,
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    }
  }

  async registerUser () {
    const navigation = this.props.navigation
    const toSend = {
      first_name: this.state.firstName,
      last_name: this.state.lastName,
      email: this.state.email,
      password: this.state.password
    }
    const status = await accountFetch.signUp(toSend)
    if (status === 201) {
      navigation.navigate('Login')
    }
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
              rounded
              placeholder='First Name'
              style={styles.textInput}
              placeholderTextColor='#001D4A'
              onChangeText={(firstName) => this.setState({ firstName })}
              value={this.state.firstName}
            />
            <Input
              rounded
              placeholder='Last Name'
              style={styles.textInput}
              placeholderTextColor='#001D4A'
              onChangeText={(lastName) => this.setState({ lastName })}
              value={this.state.lastName}
            />
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
              help='Minimum 6 characters'
              bottomHelp
              placeholderTextColor='#001D4A'
              onChangeText={(password) => this.setState({ password })}
              value={this.state.password}
            />
          </Block>
          <Block
            middle
            style={styles.pTop20}
          >
            <Button
              round
              size='large'
              color='#FE5F55'
              style={styles.elevation4}
              onPress={() => this.registerUser()}
            >
              Sign Up
            </Button>
            <Text style={styles.accountText}>Already registered?</Text>
            <Button
              round
              size='small'
              color='#FE5F55'
              style={styles.elevation4}
              onPress={() => navigation.navigate('Login')}
            >
              Login
            </Button>
          </Block>
        </Block>
      </ScrollView>
    )
  }
}

export default SignUp
