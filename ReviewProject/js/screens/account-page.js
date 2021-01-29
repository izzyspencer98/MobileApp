import React, { Component } from 'react'
import { View, Text, Button } from 'react-native'
import styles from '../styling/stylesheet'

class Account extends Component {
  render () {
    const navigation = this.props.navigation
    console.log(navigation)
    return (
      <View style={styles.center}>
        <Text>Account page</Text>
        <Button
          title='Change Details'
          onPress={() => navigation.navigate('Update Account Details')}
        />
      </View>
    )
  }
}

export default Account
