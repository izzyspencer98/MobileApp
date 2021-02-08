import React, { Component } from 'react'
import { View, Text } from 'native-base'
import { Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import styles from '../styling/stylesheet'

class Shop extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoading: true,
      shopInfo: []
    }
  }

  async componentDidMount () {
    const navigation = this.props.navigation
    const token = await AsyncStorage.getItem('@token')
    if (token === null || token === undefined || token === '') {
      console.log('no token')
      navigation.navigate('Login')
    } else {
      console.log(token)
      this.getShop()
    }
  }

  async getShop () {
    const navigation = this.props.navigation
    const token = await AsyncStorage.getItem('@token')
    return fetch('http://10.0.2.2:3333/api/1.0.0/location/1', {
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': token
      }
    })
      .then((response) => {
        if (response.status === 200) {
          console.log('shop fetch successful')
          return response.json()
        } else if (response.status === 404) {
          console.log('shop fetch failed - bad request')
        } else {
          Alert.alert('Something went wrong. Please try again.')
          console.log('shop fetch failed - server error')
        }
      })
      .then((Json) => {
        console.log(Json)
        this.setState({ shopInfo: Json })
        this.setState({ isLoading: false })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  render () {
    const isLoading = this.state.isLoading
    const shopInfo = this.state.shopInfo

    return (
      <View>
        {isLoading
          ? <View><Text>LOADING</Text></View>
          : <View>
            {shopInfo.location_reviews.map((x, i) => (
              <Text key={i}>{x.clenliness_rating}</Text>
            ))}
          </View>}
      </View>
    )
  }
}

export default Shop
