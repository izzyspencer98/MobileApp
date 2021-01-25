
import React, { Component } from 'react'
import { View, Text, Button } from 'react-native'
import styles from '../styling/stylesheet'

class Home extends Component {
  render () {
    return (
      <View style={styles.center}>
        <Text>This is the home screen</Text>
        <Button title='Search' />
        <Button title='Go to Shop' />
      </View>
    )
  }
}

export default Home
