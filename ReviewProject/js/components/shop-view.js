import React, { Component } from 'react'
import { View, Text, Button } from 'react-native'
import styles from '../styling/stylesheet'

class Shop extends Component {
  render () {
    const navigation = this.props.navigation
    return (
      <View style={styles.center}>
        <Text>Shop View</Text>
        <Button
          title='Add Review'
          onPress={() => navigation.navigate('Add Review')}
        />
      </View>
    )
  }
}

export default Shop
