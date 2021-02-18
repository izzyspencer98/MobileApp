import React, { Component } from 'react'
import { View, Text, ActivityIndicator, ScrollView, Image, ToastAndroid, Alert } from 'react-native'
import { Block, Button, Card, NavBar, Icon, Input } from 'galio-framework'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { AirbnbRating } from 'react-native-ratings'
import { TouchableOpacity } from 'react-native-gesture-handler'

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
      shopInfo: [],
      myReviews: [],
      isLiked: false,
      isLoading: true,
      isLikeable: true,
      isEditable: false,
      isMyReview: false,
      overallRating: 0,
      priceRating: 0,
      qualityRating: 0,
      clenlinessRating: 0,
      reviewBody: ''
    }
  }

  async componentDidMount () {
    this.setState({ isLoading: true })
    this.setState({ isLikeable: true })
    this.setState({ isEditable: false })
    this.setState({ isMyReview: false })
    this.setState({ isLiked: false })
    const { route } = this.props
    const { reviewID, overall, price, quality, cleanliness, body, locID, location, town } = route.params
    this.setState({ reviewID: reviewID })
    this.setState({ overall: overall })
    this.setState({ price: price })
    this.setState({ quality: quality })
    this.setState({ cleanliness: cleanliness })
    this.setState({ body: body })
    this.setState({ locID: locID })
    this.setState({ location: location })
    this.setState({ town: town })

    if (reviewID === null) {
      // load blank form
      this.setState({ isLoading: false })
      this.setState({ isLikeable: false })
      this.setState({ isMyReview: false })
    } else {
      // send to function for matching ID with my reviews
      this.getUserDetails()
    }
  }

  async addReview () {
    const { locID } = this.state
    const navigation = this.props.navigation
    const token = await AsyncStorage.getItem('@token')
    const toSend = {
      overall_rating: this.state.overall_rating,
      price_rating: this.state.price_rating,
      quality_rating: this.state.quality_rating,
      clenliness_rating: this.state.clenliness_rating,
      review_body: this.state.review_body
    }

    return fetch('http://10.0.2.2:3333/api/1.0.0/location/' + locID + '/review', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': token
      },
      body: JSON.stringify(toSend)
    })
      .then((response) => {
        if (response.status === 201) {
          ToastAndroid.show('Review Posted Successfully', ToastAndroid.SHORT)
          console.log('new review successful')
          navigation.navigate('Home')
        } else if (response.status === 400) {
          Alert.alert('Review failed. Please ensure all fields are completed before you post.')
          console.log('new review failed - bad request')
        } else if (response.status === 401) {
          Alert.alert('Please login to use this feature')
          navigation.navigate('Login')
        } else if (response.status === 404) {
          Alert.alert('Apologies we cannot post this review. Please log out and log back in.')
          navigation.navigate('Logout')
          console.log('new review failed - not found')
        } else {
          Alert.alert('Something went wrong. Please try again.')
          console.log('new review failed - server error')
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  async updateReview () {
    const { locID, reviewID } = this.state
    const navigation = this.props.navigation
    const token = await AsyncStorage.getItem('@token')

    const toSend = {}
    const { overall, price, quality, cleanliness, body, overallRating, priceRating, qualityRating, clenlinessRating, reviewBody } = this.state

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

    return fetch('http://10.0.2.2:3333/api/1.0.0/location/' + locID + '/review/' + reviewID, {
      method: 'patch',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': token
      },
      body: JSON.stringify(toSend)
    })
      .then((response) => {
        if (response.status === 200) {
          ToastAndroid.show('Review Updated Successfully', ToastAndroid.SHORT)
          console.log('review update successful')
          navigation.navigate('Home')
        } else if (response.status === 400) {
          Alert.alert('Please edit the review before updating.')
          console.log('review update failed - bad request')
        } else if (response.status === 401) {
          Alert.alert('Please login to use this feature')
          navigation.navigate('Login')
          console.log('review update failed - unauthorized')
        } else if (response.status === 403) {
          Alert.alert('Something went wrong. Please close the app and try again.')
          console.log('review update failed - forbidden')
        } else if (response.status === 404) {
          Alert.alert('Apologies we cannot find your review details. Please log out and log back in.')
          navigation.navigate('Logout')
          console.log('review update failed - not found')
        } else {
          Alert.alert('Something went wrong. Please try again.')
          console.log('review update failed - server error')
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  async deleteReview () {
    const { locID, reviewID } = this.state
    const navigation = this.props.navigation
    const token = await AsyncStorage.getItem('@token')

    return fetch('http://10.0.2.2:3333/api/1.0.0/location/' + locID + '/review/' + reviewID, {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': token
      }
    })
      .then((response) => {
        if (response.status === 200) {
          ToastAndroid.show('Review Deleted', ToastAndroid.SHORT)
          console.log('delete review successful')
          navigation.navigate('Home')
        } else if (response.status === 400) {
          Alert.alert('Something went wrong. Please close the app and try again.')
          console.log('delete review failed - bad request')
        } else if (response.status === 401) {
          Alert.alert('Please login to use this feature')
          navigation.navigate('Login')
          console.log('delete review failed - unauthorized')
        } else if (response.status === 403) {
          Alert.alert('Something went wrong. Please close the app and try again.')
          console.log('delete review failed - forbidden')
        } else if (response.status === 404) {
          Alert.alert('Apologies we cannot find this review in our system. Please log out and log back in.')
          navigation.navigate('Logout')
          console.log('delete review failed - not found')
        } else {
          Alert.alert('Something went wrong. Please try again.')
          console.log('delete review failed - server error')
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  async getUserDetails () {
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
          console.log('user fetch successful')
          return response.json()
        } else if (response.status === 401) {
          Alert.alert('Please login to use this feature')
          navigation.navigate('Login')
          console.log('user fetch failed - unauthorized')
        } else if (response.status === 404) {
          Alert.alert('Please create an account')
          navigation.navigate('Sign Up')
          console.log('user fetch failed - user not found')
        } else {
          Alert.alert('Something went wrong. Please try again.')
          console.log('user fetch failed - server error')
        }
      })
      .then((Json) => {
        this.setState({ myReviews: Json.reviews })
        this.compareIDs()
      })
      .catch((error) => {
        console.log(error)
      })
  }

  compareIDs () {
    const { myReviews, reviewID } = this.state
    myReviews && myReviews.map((data, index) => (
      this.isMyReview(data, reviewID)
    ))
    this.setState({ isLoading: false })
  }

  isMyReview (data, reviewID) {
    if (data.review.review_id === reviewID) {
      this.setState({ isEditable: true })
      this.setState({ isMyReview: true })
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
    const { isLoading, isLikeable, isEditable, isMyReview, overall, price, quality, cleanliness, body, location, town } = this.state

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
                {isLikeable ? <Icon size={30} name='hearto' family='AntDesign' color='#FE5F55' /> : <Block />}
              </Block>
              <TouchableOpacity>
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
              </TouchableOpacity>
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
                  defaultRating={[isEditable ? overall : 0]}
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
                  defaultRating={[isEditable ? price : 0]}
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
                  defaultRating={[isEditable ? quality : 0]}
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
                  defaultRating={[isEditable ? cleanliness : 0]}
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
                placeholder={isEditable ? body : ''}
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
              {isEditable
                ? <Button
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
                : <Button
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
                </Button>}
              {isEditable
                ? <TouchableOpacity onPress={() => this.deleteAlert()}>
                  <Icon size={30} name='delete' family='AntDesign' color='#FE5F55' />
                  </TouchableOpacity>
                : <Block />}
            </Block>
          </Block>
        </ScrollView>
      </Block>
    )
  }
}

export default Review
