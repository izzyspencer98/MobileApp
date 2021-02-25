import React, { Component } from 'react'
import { View, Text, ActivityIndicator, ScrollView, Image, ToastAndroid, Alert } from 'react-native'
import { Block, Button, Card, NavBar, Icon, Input } from 'galio-framework'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { AirbnbRating } from 'react-native-ratings'
import { TouchableOpacity } from 'react-native-gesture-handler'
import userFetch from '../api/user'
import reviewFetch from '../api/review'
import likeFetch from '../api/likes'
import photoFetch from '../api/photo'

class Review extends Component {
  constructor (props) {
    super(props)
    this.state = {
      reviewID: '',
      overall: '',
      price: '',
      quality: '',
      cleanliness: '',
      body: '',
      locID: '',
      location: '',
      town: '',
      userData: [],
      isLoading: true,
      isMyReview: false,
      isLiked: false,
      hasPhoto: false,
      overallRating: 0,
      priceRating: 0,
      qualityRating: 0,
      clenlinessRating: 0,
      reviewBody: '',
      photo: '',
      base64Img: ''
    }
  }

  async componentDidMount () {
    const { navigation, route } = this.props
    const { reviewID, overall, price, quality, cleanliness, body, locID, location, town, photo } = route.params
    this.unmount = navigation.addListener('focus', () => {
      this.componentDidMount()
    })
    if (photo !== null) {
      console.log('Photo found')
      this.setState({ isLoading: true, photo: photo }, () => {
        this.setPhoto(photo)
      })
    }
    if (photo === null) {
      console.log('No photo')
      this.setState({
        isLoading: true,
        isMyReview: false,
        isLiked: false,
        hasPhoto: false,
        reviewID: reviewID,
        overall: overall,
        price: price,
        quality: quality,
        cleanliness: cleanliness,
        body: body,
        locID: locID,
        location: location,
        town: town
      }, () => {
        this.getUserDetails()
      })
    }
  }

  componentWillUnmount () {
    this.unmount()
  }

  setPhoto (photo) {
    const base64img = 'data:image/jpeg;base64,' + photo.base64
    this.setState({ hasPhoto: true, base64Img: base64img }, () => {
      this.setState({ isLoading: false })
    })
  }

  async getUserDetails () {
    const userData = await userFetch.getUserDetails()
    this.setState({ userData: userData }, () => {
      this.compareIDs()
    })
  }

  compareIDs () {
    const { userData, reviewID } = this.state
    userData && userData.reviews.map((data, index) => (
      this.isMyReview(data, reviewID)
    ))
    userData && userData.liked_reviews.map((data, index) => (
      this.isLiked(data, reviewID)
    ))
    this.checkForPhoto()
  }

  isMyReview (data, reviewID) {
    if (data.review.review_id === reviewID) {
      this.setState({ isMyReview: true })
    }
  }

  isLiked (data, reviewID) {
    if (data.review.review_id === reviewID) {
      this.setState({ isLiked: true })
    }
  }

  async checkForPhoto () {
    const { locID, reviewID } = this.state
    let photo = await photoFetch.checkForPhoto(locID, reviewID)
    if (photo !== null) {
      photo = 'data:image/jpeg;base64,' + photo
      this.setState({ base64Img: photo, hasPhoto: true })
    }
    this.setState({ isLoading: false })
  }

  async updateReview () {
    const { hasPhoto, locID, reviewID, overall, price, quality, cleanliness, body, overallRating, priceRating, qualityRating, clenlinessRating, reviewBody } = this.state

    const toSend = {}

    if (overallRating !== overall && overallRating !== 0) {
      toSend.overall_rating = overallRating
    }
    if (priceRating !== price && priceRating !== 0) {
      toSend.price_rating = priceRating
    }
    if (qualityRating !== quality && qualityRating !== 0) {
      toSend.quality_rating = qualityRating
    }
    if (clenlinessRating !== cleanliness && clenlinessRating !== 0) {
      toSend.clenliness_rating = clenlinessRating
    }
    if (reviewBody !== body && reviewBody !== '') {
      toSend.review_body = reviewBody
    }

    const status = await reviewFetch.updateReview(locID, reviewID, toSend)
    if (hasPhoto) {
      this.updatePhoto()
    }
    this.handleReviewStatus(status)
  }

  async updatePhoto () {
    const navigation = this.props.navigation
    const { locID, reviewID, photo } = this.state
    const status = photoFetch.postPhoto(locID, reviewID, photo)
    if (status === 401) {
      navigation.navigate('Login')
    }
  }

  async deleteReview () {
    const { locID, reviewID } = this.state
    const status = await reviewFetch.deleteReview(locID, reviewID)
    this.handleReviewStatus(status)
  }

  async deletePhoto () {
    const { locID, reviewID } = this.state
    this.setState({ isLoading: true })
    const status = await photoFetch.deletePhoto(locID, reviewID)
    if (status === 200) {
      this.setState({ hasPhoto: false }, () => {
        this.setState({ isLoading: false })
      })
    }
  }

  async handleLikes () {
    const { locID, reviewID, isLiked } = this.state
    if (isLiked) {
      const status = await likeFetch.unlikeReview(locID, reviewID)
      const liked = false
      this.handleLikeStatus(status, liked)
    } else {
      const status = await likeFetch.likeReview(locID, reviewID)
      const liked = true
      this.handleLikeStatus(status, liked)
    }
  }

  handleReviewStatus (status) {
    const navigation = this.props.navigation
    if (status === 200) {
      navigation.navigate('My Reviews')
    }
    if (status === 401) {
      navigation.navigate('Login')
    }
    if (status === 404) {
      navigation.navigate('Logout')
    }
  }

  handleLikeStatus (status, liked) {
    const navigation = this.props.navigation
    if (status === 200) {
      this.setState({ isLiked: liked }, () => {
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

  deleteAlert () {
    Alert.alert(
      'Delete Review',
      'Are you sure you want to delete this review?',
      [
        {
          text: 'Delete',
          onPress: () => this.deleteReview()
        },
        {
          text: 'Cancel',
          style: 'cancel'
        }
      ],
      { cancelable: false }
    )
  }

  render () {
    const navigation = this.props.navigation
    const { isLoading, isMyReview, isLiked, hasPhoto, overall, price, quality, cleanliness, body, location, town, photo, base64Img } = this.state

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
            {isMyReview
              ? <Block
                  row
                  middle
                  style={{
                    width: 340,
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
                  <TouchableOpacity onPress={() => this.handleLikes()}>
                    {isLiked
                      ? <Icon size={30} name='heart' family='AntDesign' color='#FE5F55' />
                      : <Icon size={30} name='hearto' family='AntDesign' color='#FE5F55' />}
                  </TouchableOpacity>
                </Block>
                {hasPhoto
                  ? <Block row bottom>
                    <Image
                      style={{ width: 130, height: 100, borderRadius: 3 }}
                      source={{ uri: base64Img }}
                    />
                    <TouchableOpacity onPress={() => this.deletePhoto()}>
                      <Icon size={22} name='delete' family='AntDesign' color='#FE5F55' />
                    </TouchableOpacity>
                    </Block>
                  : <TouchableOpacity onPress={() => navigation.navigate('Camera', { page: 'currentReview' })}>
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
              : <Block
                  middle
                  style={{
                    width: 320,
                    margin: 10,
                    paddingBottom: 20,
                    borderBottomWidth: 0.5,
                    borderBottomColor: '#697177'
                  }}
                >
                {hasPhoto
                  ? <Image
                      style={{ width: 370, height: 190, borderRadius: 3 }}
                      source={{ uri: base64Img }}
                    />
                  : <Block />}
                <Text style={{
                  fontSize: 25,
                  color: '#001D4A',
                  paddingTop: 15
                }}
                >{location}
                </Text>
                <Text style={{ fontSize: 18, color: '#697177', paddingBottom: 5 }}>{town}</Text>
                <TouchableOpacity onPress={() => this.handleLikes()}>
                  {isLiked
                    ? <Icon size={30} name='heart' family='AntDesign' color='#FE5F55' />
                    : <Icon size={30} name='hearto' family='AntDesign' color='#FE5F55' />}
                </TouchableOpacity>
                </Block>}
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
                  defaultRating={overall}
                  isDisabled={!isMyReview}
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
                  defaultRating={price}
                  isDisabled={!isMyReview}
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
                  defaultRating={quality}
                  isDisabled={!isMyReview}
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
                  defaultRating={cleanliness}
                  isDisabled={!isMyReview}
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
              {isMyReview
                ? <Block>
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
                    placeholder={body}
                    style={{
                      borderColor: '#7B8CDE',
                      borderWidth: 2,
                      backgroundColor: '#F2F2F2',
                      elevation: 3,
                      height: 80
                    }}
                    placeholderTextColor='#001D4A'
                    onChangeText={(reviewBody) => this.setState({ reviewBody })}
                    value={this.state.review_body}
                  />
                  <Block middle>
                    <Button
                      round
                      size='small'
                      color='#FE5F55'
                      style={{
                        elevation: 5,
                        marginTop: 20
                      }}
                      onPress={() => this.updateReview()}
                    >
                      Update Review
                    </Button>
                    <TouchableOpacity onPress={() => this.deleteAlert()}>
                      <Icon size={30} name='delete' family='AntDesign' color='#FE5F55' />
                    </TouchableOpacity>
                  </Block>
                  </Block>
                : <Text style={{
                  fontSize: 14,
                  color: '#697177',
                  paddingBottom: 10,
                  textAlign: 'center'
                }}
                  >"{body}"
                  </Text>}
            </Block>
          </Block>
        </ScrollView>
      </Block>
    )
  }
}

export default Review
