import React, { Component } from 'react'
import { View, Text, ActivityIndicatorBase, ScrollView, Image, ToastAndroid } from 'react-native'
import { Block, Button, Card, NavBar, Icon, Input } from 'galio-framework'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { AirbnbRating } from 'react-native-ratings'
import { TouchableOpacity } from 'react-native-gesture-handler'

class Review extends Component {
  constructor (props) {
    super(props)
    this.state = {
      reviewID: '',
      location: '',
      town: '',
      shopInfo: [],
      userDetails: [],
      isLiked: false,
      isMyReview: false,
      reviewText: ''
    }
  }

  async componentDidMount () {
    this.setState({ isLoading: true })
    this.setState({ isLiked: false })
    const { route } = this.props
    const { reviewID, location, town } = route.params
    this.setState({ reviewID: reviewID })
    this.setState({ location: location })
    this.setState({ town: town })

    if (reviewID === null) {
      // load blank form
      this.setState({ isMyReview: true })
    } else {
      // send to function for matching ID with my reviews
    }
  }

  render () {
    const { isMyReview, location, town } = this.state

    if (isMyReview) {
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
                  >{location}
                  </Text>
                </Block>
                <Text style={{ fontSize: 18, color: '#697177' }}>{town}</Text>
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
                  >Ratings
                  </Text>
                  <Block row>
                    <Text style={{ fontSize: 16, paddingRight: 6 }}>Overall</Text>
                    <AirbnbRating
                      count={5}
                      defaultRating={0}
                      size={20}
                      selectedColor='#F5B700'
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
                      defaultRating={0}
                      size={20}
                      selectedColor='#F5B700'
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
                      defaultRating={0}
                      size={20}
                      selectedColor='#F5B700'
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
                      defaultRating={0}
                      size={20}
                      selectedColor='#F5B700'
                      showRating={false}
                      starContainerStyle={{
                        alignItems: 'flex-start',
                        alignSelf: 'flex-start'
                      }}
                    />
                  </Block>
                  <Input
                    rounded
                    style={{
                      borderColor: '#7B8CDE',
                      borderWidth: 2,
                      backgroundColor: '#F2F2F2',
                      elevation: 3
                    }}
                    onChangeText={(reviewText) => this.setState({ reviewText })}
                    value={this.state.reviewText}
                  />
                </Block>
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
                >
                  Write Review
                </Button>
              </Block>
            </Block>
          </ScrollView>
        </Block>
      )
    }

    return (
      <View><Text>Review form</Text></View>
    )
  }
}

export default Review
