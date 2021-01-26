
import React, { Component } from 'react'
import { View, Text, Button } from 'react-native'
import styles from '../styling/stylesheet'

class FavouriteShops extends Component {
  render () {
    const navigation = this.props.navigation
    return (
      <View style={styles.center}>
        <Text>Favourited shops</Text>
        <Button
          title='Click on shop card'
          onPress={() => navigation.navigate('Shop')}
        />
      </View>
    )
  }
}

export default FavouriteShops
