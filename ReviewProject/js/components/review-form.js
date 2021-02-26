import React, { Component } from 'react'
import { View, Text, ActivityIndicator, ScrollView, Image, ToastAndroid, Alert } from 'react-native'
import { Block, Button, Card, NavBar, Icon, Input } from 'galio-framework'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { AirbnbRating } from 'react-native-ratings'
import { TouchableOpacity } from 'react-native-gesture-handler'
import reviewFetch from '../api/review'
import userFetch from '../api/user'
import photoFetch from '../api/photo'
import profFilter from '../components/profanity-filter.json'

class NewReview extends Component {
  constructor (props) {
    super(props)
    this.state = {
      profFilter: profFilter.profWords,
      block: false,
      locID: '',
      location: '',
      town: '',
      photo: '',
      uriPhoto: '',
      isLoading: true,
      hasPhoto: false,
      overallRating: 0,
      priceRating: 0,
      qualityRating: 0,
      clenlinessRating: 0,
      reviewBody: ''
    }
  }

  async componentDidMount () {
    const { navigation, route } = this.props
    const { locID, location, town, photo } = route.params
    this.setState({ block: false })
    this.unmount = navigation.addListener('focus', () => {
      this.componentDidMount()
    })
    if (photo === null) {
      this.setState({ isLoading: false })
      this.setState({ hasPhoto: false })
      this.setState({ locID: locID })
      this.setState({ location: location })
      this.setState({ town: town })
    }
    if (photo !== null) {
      this.setState({ isLoading: true, photo: photo }, () => {
        this.checkForPhoto(photo)
      })
    }
  }

  componentWillUnmount () {
    this.unmount()
  }

  checkForPhoto (photo) {
    const uriPhoto = photo.uri
    console.log('PHOTO URI - ' + uriPhoto)
    this.setState({ hasPhoto: true, uriPhoto: uriPhoto }, () => {
      this.setState({ isLoading: false })
    })
  }

  async addReview () {
    this.setState({ isLoading: true, block: false })
    const navigation = this.props.navigation
    const { locID, overallRating, priceRating, qualityRating, clenlinessRating, reviewBody } = this.state
    await this.filter(reviewBody)
    if (this.state.block === true) {
      Alert.alert('Please refrain from mentioning any food/beverages other than coffee.')
      this.setState({ isLoading: false })
    }
    if (this.state.block === false) {
      const response = await reviewFetch.addReview(locID, overallRating, priceRating, qualityRating, clenlinessRating, reviewBody)
      if (response === 201) {
        this.addPhoto(locID, reviewBody)
        navigation.navigate('Home')
      }
      if (response === 401) {
        navigation.navigate('Login')
      }
      if (response === 404) {
        navigation.navigate('Logout')
      }
    }
  }

  filter (reviewBody) {
    const profFilter = this.state.profFilter
    profFilter.forEach(word => {
      if (reviewBody.includes(word)) {
        this.setState({ block: true })
      }
    })
  }

  async addPhoto (locID, reviewBody) {
    const navigation = this.props.navigation
    const revID = await userFetch.getReviewID(reviewBody)
    const photo = this.state.photo
    const response = await photoFetch.postPhoto(locID, revID, photo)
    if (response === 401) {
      navigation.navigate('Login')
    }
  }

  render () {
    const { isLoading, hasPhoto, uriPhoto, location, town } = this.state
    const navigation = this.props.navigation

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
            <Block
              row
              middle
              style={{
                width: 320,
                margin: 10,
                paddingBottom: 20,
                borderBottomWidth: 0.5,
                borderBottomColor: '#697177'
              }}
            >
              <Block
                middle
                style={{
                  paddingRight: 50
                }}
              >
                <Text style={{
                  fontSize: 25,
                  color: '#001D4A'
                }}
                >{location}
                </Text>
                <Text style={{ fontSize: 18, color: '#697177', paddingBottom: 5 }}>{town}</Text>
              </Block>
              {hasPhoto
                ? <TouchableOpacity onPress={() => navigation.navigate('Camera', { page: 'newForm' })}>
                  <Image
                    style={{ width: 130, height: 100, borderRadius: 3 }}
                    source={{ uri: uriPhoto }}
                  />
                </TouchableOpacity>
                : <TouchableOpacity onPress={() => navigation.navigate('Camera', { page: 'newForm' })}>
                  <Block
                    middle style={{
                      width: 130,
                      height: 100,
                      borderWidth: 1,
                      borderColor: '#7B8CDE'
                    }}
                  >
                    <Text style={{ fontSize: 20, color: '#7B8CDE' }}>+</Text>
                    <Text style={{ fontSize: 14, color: '#7B8CDE' }}>Add Image</Text>
                  </Block>
                  </TouchableOpacity>}
            </Block>
            <Block
              middle style={{
                width: 320,
                paddingBottom: 10,
                borderBottomWidth: 0.5,
                borderBottomColor: '#697177'
              }}
            >
              <Text style={{
                fontSize: 20,
                color: '#001D4A'
              }}
              >Rating
              </Text>
              <Block
                row style={{
                  padding: 10
                }}
              >
                <Text style={{ fontSize: 16, paddingRight: 6 }}>Overall</Text>
                <AirbnbRating
                  count={5}
                  defaultRating={0}
                  size={22}
                  selectedColor='#F5B700'
                  showRating={false}
                  starContainerStyle={{
                    alignItems: 'flex-start',
                    alignSelf: 'flex-start'
                  }}
                  onFinishRating={(overallRating) => this.setState({ overallRating })}
                />
              </Block>
              <Block
                row style={{
                  padding: 5
                }}
              >
                <Text style={{ fontSize: 16, paddingRight: 6 }}>Price</Text>
                <AirbnbRating
                  count={5}
                  defaultRating={0}
                  size={22}
                  selectedColor='#F5B700'
                  showRating={false}
                  starContainerStyle={{
                    alignItems: 'flex-start',
                    alignSelf: 'flex-start'
                  }}
                  onFinishRating={(priceRating) => this.setState({ priceRating })}
                />
              </Block>
              <Block
                row style={{
                  padding: 5
                }}
              >
                <Text style={{ fontSize: 16, paddingRight: 6 }}>Quality</Text>
                <AirbnbRating
                  count={5}
                  defaultRating={0}
                  size={22}
                  selectedColor='#F5B700'
                  showRating={false}
                  starContainerStyle={{
                    alignItems: 'flex-start',
                    alignSelf: 'flex-start'
                  }}
                  onFinishRating={(qualityRating) => this.setState({ qualityRating })}
                />
              </Block>
              <Block
                row style={{
                  padding: 5,
                  paddingBottom: 10
                }}
              >
                <Text style={{ fontSize: 16, paddingRight: 6 }}>Cleanliness</Text>
                <AirbnbRating
                  count={5}
                  defaultRating={0}
                  size={22}
                  selectedColor='#F5B700'
                  showRating={false}
                  starContainerStyle={{
                    alignItems: 'flex-start',
                    alignSelf: 'flex-start'
                  }}
                  onFinishRating={(clenlinessRating) => this.setState({ clenlinessRating })}
                />
              </Block>
            </Block>
            <Block
              middle style={{
                width: 320,
                padding: 10
              }}
            >
              <Text style={{
                fontSize: 20,
                color: '#001D4A',
                paddingBottom: 10
              }}
              >Review
              </Text>
              <Text style={{
                fontSize: 14,
                color: '#697177',
                paddingBottom: 10,
                textAlign: 'center'
              }}
              >Please comment on your overall experience at {location}, {town}.
              </Text>
              <Input
                rounded
                style={{
                  borderColor: '#7B8CDE',
                  borderWidth: 2,
                  backgroundColor: '#F2F2F2',
                  elevation: 3,
                  height: 80
                }}
                placeholderTextColor='#001D4A'
                onChangeText={(reviewBody) => this.setState({ reviewBody })}
                value={this.state.reviewBody}
              />
              <Button
                round
                size='small'
                color='#FE5F55'
                style={{
                  elevation: 5,
                  marginTop: 20
                }}
                onPress={() => this.addReview()}
              >
                Post Review
              </Button>
            </Block>
          </Block>
        </ScrollView>
      </Block>
    )
  }
}

export default NewReview
