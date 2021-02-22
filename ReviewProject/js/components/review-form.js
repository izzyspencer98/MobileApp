import React, { Component } from 'react'
import { View, Text, ActivityIndicator, ScrollView, Image, ToastAndroid, Alert } from 'react-native'
import { Block, Button, Card, NavBar, Icon, Input } from 'galio-framework'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { AirbnbRating } from 'react-native-ratings'
import { TouchableOpacity } from 'react-native-gesture-handler'

class NewReview extends Component {
  constructor (props) {
    super(props)
    this.state = {
      locID: '',
      location: '',
      town: '',
      isLoading: true,
      overallRating: 0,
      priceRating: 0,
      qualityRating: 0,
      clenlinessRating: 0,
      reviewBody: ''
    }
  }

  async componentDidMount () {
    this.setState({ isLoading: false })
    const { route } = this.props
    const { locID, location, town } = route.params
    this.setState({ locID: locID })
    this.setState({ location: location })
    this.setState({ town: town })
  }

  async addReview () {
    this.setState({ isLoading: true })
    const { locID } = this.state
    const navigation = this.props.navigation
    const token = await AsyncStorage.getItem('@token')
    const toSend = {
      overall_rating: this.state.overallRating,
      price_rating: this.state.priceRating,
      quality_rating: this.state.qualityRating,
      clenliness_rating: this.state.clenlinessRating,
      review_body: this.state.reviewBody
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

  render () {
    const { isLoading, location, town } = this.state

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
                value={this.state.review_body}
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
