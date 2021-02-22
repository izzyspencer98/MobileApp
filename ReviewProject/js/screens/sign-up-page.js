import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity, Alert, Image, ScrollView } from 'react-native'
import styles from '../styling/stylesheet'
import { Block, Button, Card, NavBar, Icon, Input } from 'galio-framework'

class SignUp extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoading: true,
      first_name: '',
      last_name: '',
      email: '',
      password: ''
    }
  }

  registerUser () {
    const navigation = this.props.navigation
    const to_send = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
      password: this.state.password
    }
    return fetch('http://10.0.2.2:3333/api/1.0.0/user', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(to_send)
    })
      .then((response) => {
        if (response.status === 201) {
          Alert.alert('Account created successfully')
          console.log('sign up successful')
          navigation.navigate('Login')
        } else if (response.status === 400) {
          Alert.alert('Sign up failed. Please ensure all fields are completed and you have entered an unregistered email.')
          console.log('sign up failed - duplicate email')
        } else {
          Alert.alert('Something went wrong. Please try again.')
          console.log('sign up failed - server error')
        }
      })
      .catch((error) => {
        console.log(error)
      })
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
              marginTop: 50
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
              rounded
              placeholder='First Name'
              style={{
                borderColor: '#7B8CDE',
                borderWidth: 2,
                backgroundColor: '#F2F2F2',
                elevation: 3
              }}
              placeholderTextColor='#001D4A'
              onChangeText={(first_name) => this.setState({ first_name })}
              value={this.state.first_name}
            />
            <Input
              rounded
              placeholder='Last Name'
              style={{
                borderColor: '#7B8CDE',
                borderWidth: 2,
                backgroundColor: '#F2F2F2',
                elevation: 3
              }}
              placeholderTextColor='#001D4A'
              onChangeText={(last_name) => this.setState({ last_name })}
              value={this.state.last_name}
            />
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
              help='Minimum 6 characters'
              bottomHelp
              placeholderTextColor='#001D4A'
              onChangeText={(password) => this.setState({ password })}
              value={this.state.password}
            />
          </Block>
          <Block
            middle
            style={{
              paddingTop: 20
            }}
          >
            <Button
              round
              size='large'
              color='#FE5F55'
              style={{
                elevation: 5
              }}
              onPress={() => this.registerUser()}
            >
              Sign Up
            </Button>
            <Text style={{
              fontSize: 14,
              marginTop: 15,
              textAlign: 'center',
              color: '#697177'
            }}
            >Already registered?
            </Text>
            <Button
              round
              size='small'
              color='#FE5F55'
              style={{
                elevation: 5
              }}
              onPress={() => navigation.navigate('Login')}
            >
              Login
            </Button>
          </Block>
        </Block>
      </ScrollView>

    // <View style={styles.startContainer}>
    //   <Image style={styles.coffiDaLogo} source={require('../../assets/images/coffida-white.png')} />
    //   <View style={styles.inputView}>
    //     <TextInput
    //       style={styles.inputText}
    //       placeholder='First Name'
    //       placeholderTextColor='#222E50'
    //       onChangeText={(first_name) => this.setState({ first_name })}
    //       value={this.state.first_name}
    //     />
    //   </View>
    //   <View style={styles.inputView}>
    //     <TextInput
    //       style={styles.inputText}
    //       placeholder='Last Name'
    //       placeholderTextColor='#222E50'
    //       onChangeText={(last_name) => this.setState({ last_name })}
    //       value={this.state.last_name}
    //     />
    //   </View>
    //   <View style={styles.inputView}>
    //     <TextInput
    //       style={styles.inputText}
    //       placeholder='Email'
    //       placeholderTextColor='#222E50'
    //       onChangeText={(email) => this.setState({ email })}
    //       value={this.state.email}
    //     />
    //   </View>
    //   <View style={styles.inputView}>
    //     <TextInput
    //       style={styles.inputText}
    //       placeholder='Password'
    //       placeholderTextColor='#222E50'
    //       secureTextEntry
    //       onChangeText={(password) => this.setState({ password })}
    //       value={this.state.password}
    //     />
    //   </View>
    //   <TouchableOpacity
    //     style={styles.loginBtn}
    //     onPress={() => this.registerUser()}
    //   >
    //     <Text style={styles.loginText}>Sign Up</Text>
    //   </TouchableOpacity>
    //   <Text style={styles.registeredText}>Already registered?</Text>
    //   <TouchableOpacity
    //     style={styles.signUpBtn}
    //     title='Login'
    //     onPress={() => navigation.navigate('Login')}
    //   >
    //     <Text style={styles.loginText}>Login</Text>
    //   </TouchableOpacity>
    // </View>
    )
  }
}

export default SignUp
