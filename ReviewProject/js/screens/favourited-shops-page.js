
import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { Component } from 'react'
import { Container, Content, CardItem, Thumbnail, Text, Left, Body, Right, View } from 'native-base'
import { Image, Alert, ActivityIndicator } from 'react-native'
import styles from '../styling/stylesheet'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { FloatingAction } from 'react-native-floating-action'
import { Block, Button, Card, NavBar, Icon, Input } from 'galio-framework'
import { AirbnbRating } from 'react-native-ratings'

class FavouriteShops extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoading: true,
      favouriteShops: []
    }
  }

  async componentDidMount () {
    const navigation = this.props.navigation
    const token = await AsyncStorage.getItem('@token')
    this.unmount = navigation.addListener('focus', () => {
      this.componentDidMount()
    })
    if (token === null || token === undefined || token === '') {
      console.log('no token')
      navigation.navigate('Login')
    } else {
      console.log(token)
      this.setState({ isLoading: true })
      this.getFavourites()
    }
  }

  componentWillUnmount () {
    this.unmount()
  }

  async getFavourites () {
    const navigation = this.props.navigation
    const token = await AsyncStorage.getItem('@token')
    const id = await AsyncStorage.getItem('@id')
    return fetch('http://10.0.2.2:3333/api/1.0.0/user/' + id, {
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': token
      }
    })
      .then((response) => {
        if (response.status === 200) {
          console.log('user favourites fetch successful')
          return response.json()
        } else if (response.status === 401) {
          Alert.alert('Please login to use this feature')
          navigation.navigate('Login')
          console.log('user favourites fetch failed - unauthorized')
        } else if (response.status === 404) {
          Alert.alert('Please create an account')
          navigation.navigate('Sign Up')
          console.log('user favourites fetch failed - user not found')
        } else {
          Alert.alert('Something went wrong. Please try again.')
          console.log('user favourites fetch failed - server error')
        }
      })
      .then((Json) => {
        this.setState({ favouriteShops: Json })
        this.setState({ isLoading: false })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  render () {
    const navigation = this.props.navigation
    const { isLoading, favouriteShops } = this.state

    const imagePaths = [
      {
        uri: 'https://res.cloudinary.com/dk4rjadwm/image/upload/v1613053634/MobileApp/pexels-anna-tukhfatullina-food-photographerstylist-2551794_mxzjzw.jpg'
      },
      {
        uri: 'https://res.cloudinary.com/dk4rjadwm/image/upload/v1613053619/MobileApp/pexels-lisa-fotios-1995010_khjtql.jpg'
      },
      {
        uri: 'https://res.cloudinary.com/dk4rjadwm/image/upload/v1613053643/MobileApp/pexels-lisa-fotios-1024359_oiqien.jpg'
      },
      {
        uri: 'https://res.cloudinary.com/dk4rjadwm/image/upload/v1613053629/MobileApp/pexels-quark-studio-2506993_jhagmt.jpg'
      },
      {
        uri: 'https://res.cloudinary.com/dk4rjadwm/image/upload/v1613053623/MobileApp/pexels-igor-starkov-1002740_jqapwj.jpg'
      }
    ]

    if (isLoading) {
      return (
        <Block
          middle
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <ActivityIndicator size='large' color='#7B8CDE' />
        </Block>
      )
    }
    return (
      <Block>
        <ScrollView>
          <Block middle style={{ paddingTop: 20 }}>
            <Image
              style={{ width: 90, height: 90 }}
              source={{ uri: 'https://res.cloudinary.com/dk4rjadwm/image/upload/v1612979469/MobileApp/rating-green_szz8sl.png' }}
            />
          </Block>
          {favouriteShops.favourite_locations && favouriteShops.favourite_locations.map((data, index) => (
            <Block
              key={index}
              center card shadow space='between' style={{
                flexDirection: 'column',
                borderColor: 'transparent',
                marginHorizontal: 20,
                marginVertical: 12,
                paddingBottom: 16,
                backgroundColor: '#FFFFFF',
                shadowOpacity: 0.40,
                elevation: 4
              }}
            >
              <TouchableOpacity onPress={() => navigation.navigate('Shop', { locID: data.location_id, path: imagePaths[index].uri })}>
                <Block>
                  <Block
                    row
                    center
                    style={{
                      marginBottom: 10
                    }}
                  >
                    <Image
                      style={{ width: 370, height: 190, borderTopLeftRadius: 3, borderTopRightRadius: 3 }}
                      source={{ uri: imagePaths[index].uri }}
                    />
                  </Block>
                  <Block
                    row
                    center
                    style={{
                      paddingHorizontal: 15
                    }}
                  >
                    <Image
                      style={{ width: 60, height: 60 }}
                      source={{ uri: 'https://res.cloudinary.com/dk4rjadwm/image/upload/v1612974814/MobileApp/restaurant_zusegh.png' }}
                    />
                    <Block flex style={{ paddingLeft: 15 }}>
                      <AirbnbRating
                        count={5}
                        defaultRating={data.avg_overall_rating}
                        size={20}
                        selectedColor='#06D6A0'
                        isDisabled
                        showRating={false}
                        starContainerStyle={{
                          alignItems: 'flex-start',
                          alignSelf: 'flex-start'
                        }}
                      />
                      <Text style={{ fontSize: 19 }}>{data.location_name}</Text>
                      <Text style={{ fontSize: 15, color: '#697177' }}>{data.location_town}</Text>

                    </Block>
                    <Block row>
                      <Icon size={18} name='enviroment' family='AntDesign' color='#7B8CDE' />
                      <Text style={{ paddingLeft: 6, fontSize: 13, color: '#7B8CDE' }}>{data.latitude} miles away</Text>
                    </Block>
                  </Block>
                </Block>
              </TouchableOpacity>
            </Block>
          ))}
        </ScrollView>
      </Block>
    )
  }
}

export default FavouriteShops
