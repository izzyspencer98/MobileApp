import React, { Component } from 'react'
import { View, Text, Button, TouchableOpacity } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import styles from '../styling/stylesheet'

class Login extends Component {
  constructor (props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }
  }

  render () {
    const navigation = this.props.navigation
    return (
      <View style={styles.startContainer}>
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
        <TouchableOpacity style={styles.loginBtn}>
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
      </View>
    )
  }
}

export default Login
