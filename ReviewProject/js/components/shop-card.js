import React, { Component } from 'react'
import { Card, CardItem, Thumbnail, Text, Button, Left, Body, Right, View } from 'native-base'
import { Image, Alert } from 'react-native'
import styles from '../styling/stylesheet'
import { TouchableOpacity } from 'react-native-gesture-handler'
import AsyncStorage from '@react-native-async-storage/async-storage'

class ShopCard extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoading: true,
      shopCardInfo: []
    }
  }

  async componentDidMount () {
    const token = await AsyncStorage.getItem('@token')
    if (token === null || token === undefined || token === '') {
      console.log('no token')
      // navigation.navigate('Login')
    } else {
      console.log(token)
      this.getShopData()
    }
  }

  async getShopData () {
    const token = await AsyncStorage.getItem('@token')
    return fetch('http://10.0.2.2:3333/api/1.0.0/find', {
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': token
      }
    })
      .then((response) => {
        if (response.status === 200) {
          console.log('search successful')
          return response.json()
        } else if (response.status === 400) {
          console.log('search failed - bad request')
        } else if (response.status === 401) {
          Alert.alert('Please login to use this feature')
          console.log('search failed - not logged in')
        } else {
          Alert.alert('Something went wrong. Please try again.')
          console.log('search failed - server error')
        }
      })
      .then((Json) => {
        console.log(Json)
        this.setState({ shopCardInfo: Json })
        this.setState({ isLoading: false })
        this.forceUpdate()
      })
      .catch((error) => {
        console.log(error)
      })
  }

  render () {
    const isLoading = this.state.isLoading
    const shopCardInfo = this.state.shopCardInfo

    const imagePaths = [
      {
        uri: require('../../assets/images/card-image-1.jpg')
      },
      {
        uri: require('../../assets/images/card-image-2.jpg')
      },
      {
        uri: require('../../assets/images/card-image-3.jpg')
      },
      {
        uri: require('../../assets/images/card-image-4.jpg')
      },
      {
        uri: require('../../assets/images/card-image-5.jpg')
      }
    ]

    return (
      <View>
        {isLoading
          ? <View><Text>LOADING</Text></View>
          : <View>
            {shopCardInfo.map((data, index) => (
              <Card key={index} style={styles.cardStyle}>
                <CardItem style={{ borderTopLeftRadius: 8, borderTopRightRadius: 8, backgroundColor: '#FFFFFF' }}>
                  <Left>
                    <TouchableOpacity>
                      <Thumbnail source={require('../../assets/images/coffee.png')} />
                    </TouchableOpacity>
                    <Body>
                      <Text>{data.location_name}</Text>
                      <Text note>{data.latitude} miles</Text>
                      <Text note>{data.location_town}</Text>
                      <Text note>(Rating: {data.avg_overall_rating})</Text>
                    </Body>
                  </Left>
                  <Right>
                    <TouchableOpacity>
                      <Button transparent>
                        <Thumbnail style={{ width: 40, height: 40, borderRadius: 30 / 2 }} source={require('../../assets/images/star.png')} />
                      </Button>
                    </TouchableOpacity>
                  </Right>
                </CardItem>
                <CardItem cardBody style={{ borderBottomLeftRadius: 8, borderBottomRightRadius: 8 }}>
                  <Image source={imagePaths[index].uri} style={{ height: 200, width: null, flex: 1, borderBottomLeftRadius: 8, borderBottomRightRadius: 8 }} />
                </CardItem>
              </Card>
            ))}
            </View>}
      </View>
    )
  }
}

export default ShopCard
