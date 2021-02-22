
import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { Component } from 'react'
import { Container, Content, CardItem, Thumbnail, Text, Left, Body, Right, View } from 'native-base'
import { Image, Alert, ActivityIndicator } from 'react-native'
import styles from '../styling/stylesheet'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { FloatingAction } from 'react-native-floating-action'
import { Block, Button, Card, NavBar, Icon, Input } from 'galio-framework'
import { AirbnbRating } from 'react-native-ratings'
import search from '../api/search'

class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoading: true,
      shopCardInfo: [],
      shopName: '',
      overallRating: 0,
      priceRating: 0,
      qualityRating: 0,
      clenlinessRating: 0,
      favourites: '',
      myReviews: '',
      offset: 0
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
      this.setState({
        shopCardInfo: [],
        isLoading: true
      }, () => {
        this.getShopData()
      })
    }
  }

  componentWillUnmount () {
    this.unmount()
  }

  searchOrHome () {
    // const { shopName, overallRating, priceRating, qualityRating, clenlinessRating, favourites, myReviews, offset } = this.state
    // this.setState({ shopCardInfo: search.findLocations(shopName, overallRating, priceRating, qualityRating, clenlinessRating, favourites, myReviews, offset) })
    // this.setState({ isLoading: false })
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
      })
      .catch((error) => {
        console.log(error)
      })
  }

  render () {
    const navigation = this.props.navigation
    const { isLoading, shopCardInfo } = this.state

    const imagePaths = [
      {
        uri: 'https://res.cloudinary.com/dk4rjadwm/image/upload/v1613053623/MobileApp/pexels-igor-starkov-1002740_jqapwj.jpg'
      },
      {
        uri: 'https://res.cloudinary.com/dk4rjadwm/image/upload/v1613053629/MobileApp/pexels-quark-studio-2506993_jhagmt.jpg'
      },
      {
        uri: 'https://res.cloudinary.com/dk4rjadwm/image/upload/v1613053643/MobileApp/pexels-lisa-fotios-1024359_oiqien.jpg'
      },
      {
        uri: 'https://res.cloudinary.com/dk4rjadwm/image/upload/v1613053619/MobileApp/pexels-lisa-fotios-1995010_khjtql.jpg'
      },
      {
        uri: 'https://res.cloudinary.com/dk4rjadwm/image/upload/v1613053634/MobileApp/pexels-anna-tukhfatullina-food-photographerstylist-2551794_mxzjzw.jpg'
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
          <Block
            row
            space='between'
            style={{
              alignItems: 'center',
              marginHorizontal: 15,
              marginTop: 15,
              marginBottom: 5
            }}
          >
            <Block>
              <Image
                style={{ width: 240, height: 60 }}
                source={{ uri: 'https://res.cloudinary.com/dk4rjadwm/image/upload/v1613039533/MobileApp/coffida-purple_srvd8k.png' }}
              />
            </Block>
            <Button
              onlyIcon
              icon='search1'
              iconFamily='antdesign'
              iconSize={20}
              iconColor='#FFFFFF'
              color='#7B8CDE'
              style={{
                elevation: 10
              }}
              onPress={() => navigation.navigate('Search')}
            />
          </Block>
          {shopCardInfo && shopCardInfo.map((data, index) => (
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

export default Home
