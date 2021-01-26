
import React, { Component } from 'react'
import { View, Text, Button } from 'react-native'
import styles from '../styling/stylesheet'

class Home extends Component {
  render () {
    const navigation = this.props.navigation
    return (
      <View style={styles.center}>
        <Text>This is the home screen</Text>
        <Button
          title='Search'
          onPress={() => navigation.navigate('Search')}
        />
        <Button
          title='Go to Shop'
          onPress={() => navigation.navigate('Shop')}
        />
      </View>
    )
  }
}

export default Home
