import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native'
import styles from '../styling/stylesheet'

class SignUp extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoading: true,
      userList: [],
      user_id: '',
      first_name: '',
      last_name: '',
      email: '',
      password: ''
    }
  }

  registerUser () {
    let to_send = {
      user_id: parseInt(this.state.user_id),
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
        Alert.alert('User ' + this.state.first_name + ' created')
      })
      .catch((console.error()))
  }

  render () {
    const navigation = this.props.navigation
    return (
      <View style={styles.startContainer}>
        <Text style={styles.coffiDaText}>CoffiDa</Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder='First Name'
            placeholderTextColor='#222E50'
            onChangeText={(first_name) => this.setState({ first_name })}
            value={this.state.first_name}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder='Last Name'
            placeholderTextColor='#222E50'
            onChangeText={(last_name) => this.setState({ last_name })}
            value={this.state.last_name}
          />
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
          onPress={() => this.registerUser()}
        >
          <Text style={styles.loginText}>Sign Up</Text>
        </TouchableOpacity>
        <Text style={styles.registeredText}>Already registered?</Text>
        <TouchableOpacity
          style={styles.signUpBtn}
          title='Login'
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default SignUp
