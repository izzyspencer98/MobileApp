import React, { Component } from 'react'
import { View, TouchableOpacity, Image, Alert, ScrollView, StyleSheet, Dimensions, ActivityIndicator } from 'react-native'
import { Container, Header, Content, CardItem, Text, Body } from 'native-base'
import { TextInput } from 'react-native-gesture-handler'
import AsyncStorage from '@react-native-async-storage/async-storage'
import styles from '../styling/stylesheet'
import { Block, Button, Card, NavBar, Icon } from 'galio-framework'
import { AirbnbRating } from 'react-native-ratings'

class MyReviews extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoading: true,
      noData: true,
      userReviewData: []
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
        isLoading: true,
        noData: true
      }, () => {
        this.getUserReviews()
      })
    }
  }

  componentWillUnmount () {
    this.unmount()
  }

  async getUserReviews () {
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
          console.log('user reviews fetch successful')
          return response.json()
        } else if (response.status === 401) {
          Alert.alert('Please login to use this feature')
          navigation.navigate('Login')
          console.log('user reviews fetch failed - unauthorized')
        } else if (response.status === 404) {
          Alert.alert('Please create an account')
          navigation.navigate('Sign Up')
          console.log('user reviews fetch failed - user not found')
        } else {
          Alert.alert('Something went wrong. Please try again.')
          console.log('user reviews fetch failed - server error')
        }
      })
      .then((Json) => {
        this.setState({
          userReviewData: Json,
          isLoading: false
        }, () => {
          this.hasData()
        })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  hasData () {
    const { userReviewData } = this.state

    if (userReviewData.reviews.length) {
      this.setState({ noData: false })
    }
  }

  render () {
    const navigation = this.props.navigation
    const { isLoading, noData, userReviewData } = this.state

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
              source={{ uri: 'https://res.cloudinary.com/dk4rjadwm/image/upload/v1613924689/MobileApp/rating_sjkpo9.png' }}
            />
          </Block>
          {noData
            ? <Block middle style={{ paddingTop: 20 }}>
              <Text style={{ textAlign: 'center', color: '#000000' }}>You have not posted any reviews.</Text>
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
          {userReviewData && userReviewData.reviews && userReviewData.reviews.map((card, index) => (
            <Block
              key={index}
              row center card shadow space='between' style={{
                borderColor: 'transparent',
                marginHorizontal: 16,
                marginVertical: 16 / 2,
                padding: 16,
                marginTop: 20,
                backgroundColor: '#FFFFFF',
                shadowOpacity: 0.40,
                elevation: 4
              }}
            >
              <Image
                style={{ width: 60, height: 60 }}
                source={{ uri: 'https://res.cloudinary.com/dk4rjadwm/image/upload/v1612974806/MobileApp/coffee_midath.png' }}
              />
              <Block flex style={{ paddingLeft: 10 }}>
                <Text style={{ fontSize: 19 }}>{card.location.location_name}</Text>
                <AirbnbRating
                  count={5}
                  defaultRating={card.review.overall_rating}
                  size={20}
                  selectedColor='#06D6A0'
                  isDisabled
                  showRating={false}
                  starContainerStyle={{
                    alignItems: 'flex-start',
                    alignSelf: 'flex-start'
                  }}
                />
                <Text style={{ fontSize: 15, color: '#697177' }}>{card.location.location_town}</Text>
                <Text style={{ fontSize: 14, color: '#9FA5AA' }}>{card.review.review_body}</Text>
              </Block>
              <Button
                onPress={() => navigation.navigate('Review', { reviewID: card.review.review_id, overall: card.review.overall_rating, price: card.review.price_rating, quality: card.review.quality_rating, cleanliness: card.review.clenliness_rating, body: card.review.review_body, locID: card.location.location_id, location: card.location.location_name, town: card.location.location_town, photo: null })} style={{
                  width: 16 * 2,
                  backgroundColor: 'transparent',
                  elevation: 0
                }}
              >
                <Block flex>
                  <Text style={{ fontSize: 13, color: '#7B8CDE' }}>Edit</Text>
                  <Icon size={20} name='form' family='AntDesign' color='#7B8CDE' />
                </Block>
              </Button>
            </Block>
          ))}
        </ScrollView>
      </Block>
    )
  }
}

export default MyReviews
