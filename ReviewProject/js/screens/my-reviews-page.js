import React, { Component } from 'react'
import { View, Text, Button } from 'react-native'
import styles from '../styling/stylesheet'

class MyReviews extends Component {
  render () {
    const navigation = this.props.navigation
    return (
      <View style={styles.center}>
        <Text>My reviews page</Text>
        <Button
          title='Edit'
          onPress={() => navigation.navigate('Edit Review')}
        />
      </View>
    )
  }
}

export default MyReviews
