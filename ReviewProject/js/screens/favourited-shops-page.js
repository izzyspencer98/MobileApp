
import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { Component } from 'react'
import { Container, Content, CardItem, Thumbnail, Text, Left, Body, Right, View } from 'native-base'
import { Image, Alert, ActivityIndicator } from 'react-native'
import styles from '../styling/stylesheet'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { FloatingAction } from 'react-native-floating-action'
import { Block, Button, Card, NavBar, Icon, Input } from 'galio-framework'
import { AirbnbRating } from 'react-native-ratings'
import Geolocation from 'react-native-geolocation-service'
import haversine from 'haversine'
import userFetch from '../api/user'

class FavouriteShops extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoading: true,
      noData: true,
      favouriteShops: [],
      distances: {}
    }
  }

  async componentDidMount () {
    const navigation = this.props.navigation
    const token = await AsyncStorage.getItem('@token')
    this.setState({ favouriteShops: [] })
    this.unmount = navigation.addListener('focus', () => {
      this.componentDidMount()
    })
    if (token === null || token === undefined || token === '') {
      console.log('no token')
      navigation.navigate('Login')
    } else {
      console.log(token)
      this.setState({
        isLoading: true,
        noData: true
      }, () => {
        this.getFavourites()
      })
    }
  }

  componentWillUnmount () {
    this.unmount()
  }

  async getFavourites () {
    const favouriteShops = await userFetch.getUserDetails()
    this.setState({ favouriteShops: favouriteShops }, () => {
      this.hasData()
      this.getDistance()
      this.setState({ isLoading: false })
    })
  }

  getDistance () {
    const { favouriteShops } = this.state
    Geolocation.getCurrentPosition(
      async (position) => {
        const start = { latitude: position.coords.latitude, longitude: position.coords.longitude }
        favouriteShops.favourite_locations.forEach(item => {
          const end = { latitude: item.latitude, longitude: item.longitude }
          const distance = Math.round(haversine(start, end))
          this.setState({ distances: { location: item.location_id, distance: distance } })
        })
      },
      (error) => {
        console.log(error)
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    )
  }

  hasData () {
    const { favouriteShops } = this.state

    if (favouriteShops.favourite_locations.length) {
      this.setState({ noData: false })
    }
  }

  render () {
    const navigation = this.props.navigation
    const { isLoading, noData, favouriteShops, distances } = this.state

    console.log('DATA - ' + noData)

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
              source={{ uri: 'https://res.cloudinary.com/dk4rjadwm/image/upload/v1613925092/MobileApp/favourite_rukpvg.png' }}
            />
          </Block>
          {noData
            ? <Block middle style={{ paddingTop: 20 }}>
              <Text style={{ textAlign: 'center', color: '#000000' }}>You have not favourited any Coffee Shops.</Text>
              <Button
                round
                size='small'
                color='#7B8CDE'
                style={{
                  elevation: 4,
                  marginTop: 20
                }}
                onPress={() => navigation.navigate('Home')}
              >
                Go Home
              </Button>
            </Block>
            : <Block />}
          {favouriteShops && favouriteShops.favourite_locations && favouriteShops.favourite_locations.map((data, index) => (
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
              <TouchableOpacity onPress={() => navigation.navigate('Shop', { locID: data.location_id, path: imagePaths[index].uri, distance: distances.distance })}>
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
                      <Text style={{ paddingLeft: 6, fontSize: 13, color: '#7B8CDE' }}>{distances.distance} Km</Text>
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
