import React, { Component } from 'react'
import { View, Text } from 'native-base'
import { Alert, ActivityIndicator, ScrollView, Image, ToastAndroid, TouchableNativeFeedbackBase } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import styles from '../styling/stylesheet'
import { Block, Button, Card, NavBar, Icon, Input } from 'galio-framework'
import { AirbnbRating } from 'react-native-ratings'
import { TouchableOpacity } from 'react-native-gesture-handler'
import locationFetch from '../api/location'
import favouriteFetch from '../api/favourites'
import userFetch from '../api/user'

class Shop extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoading: true,
      locID: '',
      path: '',
      shopInfo: [],
      userDetails: [],
      isFavourited: false
    }
  }

  async componentDidMount () {
    const { route } = this.props
    const { locID, path } = route.params
    this.setState({
      isLoading: true,
      isFavourited: false,
      locID: locID,
      path: path
    }, () => {
      this.getShop()
    })
  }

  async getShop () {
    const locID = this.state.locID
    const shopInfo = await locationFetch.getLocationInfo(locID)
    this.setState({ shopInfo: shopInfo }, () => {
      this.getUserDetails()
    })
  }

  async getUserDetails () {
    const userDetails = await userFetch.getUserDetails()
    this.setState({
      userDetails: userDetails
    }, () => {
      this.checkData()
    })
  }

  checkData () {
    const { userDetails } = this.state

    userDetails.favourite_locations && userDetails.favourite_locations.map((data, index) => (
      this.getFavourite(data)
    ))
  }

  getFavourite (data) {
    const { shopInfo } = this.state
    console.log('USER FAVS - ' + data.location_id)
    console.log('LOC ID - ' + shopInfo.location_id)
    const id = shopInfo.location_id
    if (data.location_id === id) {
      this.setState({ isFavourited: true }, () => {
        this.setState({ isLoading: false })
      })
    }
  }

  async handleFavourite () {
    const { shopInfo, isFavourited } = this.state
    const id = shopInfo.location_id
    const location = shopInfo.location_name
    if (isFavourited) {
      const status = await favouriteFetch.unfavouriteLocation(id, location)
      const favourite = false
      this.handleStatus(status, favourite)
    } else {
      const status = await favouriteFetch.favouriteLocation(id, location)
      const favourite = true
      this.handleStatus(status, favourite)
    }
  }

  handleStatus (status, favourite) {
    console.log('STATUS = ' + status)
    console.log('IS FAVOURITED? - ' + favourite)
    const navigation = this.props.navigation
    if (status === 200) {
      this.setState({ isFavourited: favourite }, () => {
        this.getUserDetails()
      })
    }
    if (status === 401) {
      navigation.navigate('Login')
    }
    if (status === 404) {
      navigation.navigate('Logout')
    }
  }

  render () {
    const navigation = this.props.navigation
    const { isLoading, path, shopInfo, isFavourited } = this.state

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
            middle
            style={{
              margin: 15
            }}
          >
            <Image
              style={{ width: 370, height: 190, borderRadius: 3 }}
              source={{ uri: path }}
            />
            <Block
              middle style={{
                width: 320,
                margin: 10,
                paddingBottom: 20,
                borderBottomWidth: 0.5,
                borderBottomColor: '#697177'
              }}
            >
              <Block row middle>
                <Text style={{
                  fontSize: 25,
                  color: '#001D4A'
                }}
                >{shopInfo.location_name}
                </Text>
                <TouchableOpacity onPress={() => this.handleFavourite()}>
                  {isFavourited
                    ? <Icon size={35} name='star' family='Ionicons' color='#FE5F55' />
                    : <Icon size={35} name='star-outline' family='Ionicons' color='#FE5F55' />}
                </TouchableOpacity>
              </Block>
              <Text style={{ fontSize: 18, color: '#697177' }}>{shopInfo.location_town}</Text>
              <Block
                row
                middle
                style={{
                  marginTop: 5
                }}
              >
                <Icon size={18} name='enviroment' family='AntDesign' color='#697177' />
                <Text style={{ paddingLeft: 4, fontSize: 14, color: '#697177' }}>{shopInfo.latitude} miles away</Text>
              </Block>
            </Block>
            <Block
              middle style={{
                width: 320,
                paddingBottom: 20
              }}
            >
              <Text style={{
                fontSize: 20,
                color: '#001D4A',
                paddingBottom: 10
              }}
              >Reviews
              </Text>
              {/* map here */}
              <Block row>
                <Text style={{ fontSize: 16, paddingRight: 6 }}>Overall</Text>
                <AirbnbRating
                  count={5}
                  defaultRating={shopInfo.avg_overall_rating}
                  size={20}
                  selectedColor='#F5B700'
                  isDisabled
                  showRating={false}
                  starContainerStyle={{
                    alignItems: 'flex-start',
                    alignSelf: 'flex-start'
                  }}
                />
              </Block>
              <Block row>
                <Text style={{ fontSize: 16, paddingRight: 6 }}>Price</Text>
                <AirbnbRating
                  count={5}
                  defaultRating={shopInfo.avg_price_rating}
                  size={20}
                  selectedColor='#F5B700'
                  isDisabled
                  showRating={false}
                  starContainerStyle={{
                    alignItems: 'flex-start',
                    alignSelf: 'flex-start'
                  }}
                />
              </Block>
              <Block row>
                <Text style={{ fontSize: 16, paddingRight: 6 }}>Quality</Text>
                <AirbnbRating
                  count={5}
                  defaultRating={shopInfo.avg_quality_rating}
                  size={20}
                  selectedColor='#F5B700'
                  isDisabled
                  showRating={false}
                  starContainerStyle={{
                    alignItems: 'flex-start',
                    alignSelf: 'flex-start'
                  }}
                />
              </Block>
              <Block row>
                <Text style={{ fontSize: 16, paddingRight: 6 }}>Cleanliness</Text>
                <AirbnbRating
                  count={5}
                  defaultRating={shopInfo.avg_clenliness_rating}
                  size={20}
                  selectedColor='#F5B700'
                  isDisabled
                  showRating={false}
                  starContainerStyle={{
                    alignItems: 'flex-start',
                    alignSelf: 'flex-start'
                  }}
                />
              </Block>
              <Block>
                <Button
                  round
                  size='small'
                  color='#FE5F55'
                  style={{
                    elevation: 5,
                    marginTop: 10
                  }}
                  onPress={() => navigation.navigate('ReviewForm', { locID: shopInfo.location_id, location: shopInfo.location_name, town: shopInfo.location_town, photo: null })}
                >
                  Write Review
                </Button>
              </Block>
              {shopInfo && shopInfo.location_reviews && shopInfo.location_reviews.map((card, index) => (
                <Block
                  key={index}
                  row center card shadow space='between' style={{
                    borderColor: 'transparent',
                    marginVertical: 16 / 2,
                    padding: 16,
                    backgroundColor: '#FFFFFF',
                    shadowOpacity: 0.40,
                    elevation: 4
                  }}
                >
                  <Image
                    style={{ width: 60, height: 60 }}
                    source={{ uri: 'https://res.cloudinary.com/dk4rjadwm/image/upload/v1613062691/MobileApp/rating_1_cnr0eb.png' }}
                  />
                  <Block middle flex style={{ paddingHorizontal: 10 }}>
                    <Text style={{ fontSize: 18 }}>Overall Rating</Text>
                    <AirbnbRating
                      count={5}
                      defaultRating={card.overall_rating}
                      size={20}
                      selectedColor='#F5B700'
                      isDisabled
                      showRating={false}
                      starContainerStyle={{
                        alignItems: 'flex-start',
                        alignSelf: 'flex-start'
                      }}
                    />
                    <Text style={{ fontSize: 14, color: '#9FA5AA', textAlign: 'center' }}>{card.review_body}</Text>
                    <Text style={{ fontSize: 14, color: '#9FA5AA' }}>({card.likes} Likes)</Text>
                  </Block>
                  <Block middle>
                    <TouchableOpacity onPress={() => navigation.navigate('Review', { reviewID: card.review_id, overall: card.overall_rating, price: card.price_rating, quality: card.quality_rating, cleanliness: card.clenliness_rating, body: card.review_body, locID: shopInfo.location_id, location: shopInfo.location_name, town: shopInfo.location_town, photo: null })}>
                      <Icon size={28} name='arrowright' family='AntDesign' color='#FE5F55' />
                    </TouchableOpacity>
                  </Block>

                </Block>
              ))}
            </Block>
          </Block>
        </ScrollView>
      </Block>
    )
  }
}

export default Shop
