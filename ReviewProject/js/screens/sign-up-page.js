import React, { Component } from 'react'
import { View, Text, Button } from 'react-native'
import styles from '../styling/stylesheet'

class SignUp extends Component {
  render () {
    const navigation = this.props.navigation
    return (
      <View style={styles.center}>
        <Text>Sign Up</Text>
        <Button
          title='Sign Up'
        />
        <Text>Already registered?</Text>
        <Button
          title='Login'
          onPress={() => navigation.navigate('Login')}
        />
      </View>
    )
  }
}

export default SignUp
