import React, { Component } from 'react'
import { View, Text, Alert, TouchableOpacity, Image, ActivityIndicator } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import styles from '../styling/stylesheet'
import { Container } from 'native-base'
import { Block, Button, Card, NavBar, Input, Radio, Icon } from 'galio-framework'
import { ScrollView } from 'react-native-gesture-handler'
import { AirbnbRating } from 'react-native-ratings'
import search from '../api/search'

class Search extends Component {
  constructor (props) {
    super(props)
    this.state = {
      searchResults: [],
      shopName: '',
      overallRating: 0,
      priceRating: 0,
      qualityRating: 0,
      clenlinessRating: 0,
      radio1: false,
      radio2: false,
      favourites: '',
      myReviews: '',
      offset: 0
    }
  }

  componentDidMount () {
    this.setState({ radio1: false })
    this.setState({ radio2: false })
    this.setState({ searchResults: [] })
    this.setState({ offset: 0 })
  }

  handleRadio1 () {
    const radio1 = this.state.radio1
    this.setState({ radio1: !radio1 }, () => {
      if (this.state.radio1) {
        this.setState({ favourites: 'favourite' })
      }
      if (!this.state.radio1) {
        this.setState({ favourites: '' })
      }
    })
  }

  handleRadio2 () {
    const radio2 = this.state.radio2
    this.setState({ radio2: !radio2 }, () => {
      if (this.state.radio2) {
        this.setState({ myReviews: 'reviewed' })
      }
      if (!this.state.radio2) {
        this.setState({ myReviews: '' })
      }
    })
  }

  resetSearch () {
    this.setState({ offset: 0, searchResults: [] }, () => {
      this.handleSearch()
    })
  }

  resetBack () {
    if (this.state.offset > 0) {
      this.setState({ searchResults: [], offset: this.state.offset - 1 }, () => {
        this.handleBack()
      })
    }
  }

  resetNext () {
    this.setState({ searchResults: [], offset: this.state.offset + 1 }, () => {
      this.handleNext()
    })
  }

  async handleSearch () {
    const { shopName, overallRating, priceRating, qualityRating, clenlinessRating, favourites, myReviews, offset } = this.state

    const results = await search.findLocations(shopName, overallRating, priceRating, qualityRating, clenlinessRating, favourites, myReviews, offset)
    this.setState({ searchResults: results })
    console.log('RESULTS - ' + JSON.stringify(this.state.searchResults))
  }

  async handleBack () {
    const { shopName, overallRating, priceRating, qualityRating, clenlinessRating, favourites, myReviews, offset } = this.state
    const results = await search.findLocations(shopName, overallRating, priceRating, qualityRating, clenlinessRating, favourites, myReviews, offset)
    this.setState({ searchResults: results })
  }

  async handleNext () {
    const { shopName, overallRating, priceRating, qualityRating, clenlinessRating, favourites, myReviews, offset } = this.state
    const results = await search.findLocations(shopName, overallRating, priceRating, qualityRating, clenlinessRating, favourites, myReviews, offset)
    this.setState({ searchResults: results })
  }

  render () {
    const navigation = this.props.navigation
    const { searchResults } = this.state

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

    return (
      <Block>
        <ScrollView>
          <Block
            middle
            style={{
              marginHorizontal: 40,
              marginTop: 5
            }}
          >
            <Input
              rounded
              placeholder='Shop Name'
              style={{
                borderColor: '#7B8CDE',
                borderWidth: 2,
                backgroundColor: '#F2F2F2',
                elevation: 3
              }}
              icon='search1'
              family='antdesign'
              iconColor='#001D4A'
              right
              placeholderTextColor='#001D4A'
              onChangeText={(shopName) => this.setState({ shopName })}
              value={this.state.shopName}
            />
            <Text style={{
              fontSize: 17,
              color: '#001D4A',
              paddingTop: 10,
              paddingBottom: 5
            }}
            >Minimum Ratings
            </Text>
            <Block
              row
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
              row
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
              row
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
                paddingBottom: 5
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
            <Block middle style={{ paddingTop: 5 }}>
              <Text style={{
                fontSize: 15,
                marginBottom: 5,
                textAlign: 'center'
              }}
              >Search Only:
              </Text>
              <Block row style={{ paddingBottom: 10 }}>
                <Block style={{ paddingRight: 15 }}>
                  <Radio label='Favourite Shops' color='#7B8CDE' onChange={() => this.handleRadio1()} />
                </Block>
                <Block style={{ paddingLeft: 15 }}>
                  <Radio label='My Reviews' color='#7B8CDE' onChange={() => this.handleRadio2()} />
                </Block>
              </Block>
            </Block>
            <Button
              round
              size='small'
              color='#7B8CDE'
              style={{
                elevation: 5
              }}
              onPress={() => this.resetSearch()}
            >
              Search
            </Button>
          </Block>
          <Block>
            {searchResults && searchResults.map((data, index) => (
              <Block key={index}>
                <Block row middle>
                  <TouchableOpacity style={{ paddingRight: 120 }} onPress={() => this.resetBack()}>
                    <Image
                      style={{ width: 30, height: 20 }}
                      source={{ uri: 'https://res.cloudinary.com/dk4rjadwm/image/upload/v1614009486/MobileApp/back_trl21g.png' }}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity style={{ paddingLeft: 120 }} onPress={() => this.resetNext()}>
                    <Image
                      style={{ width: 30, height: 20 }}
                      source={{ uri: 'https://res.cloudinary.com/dk4rjadwm/image/upload/v1614009489/MobileApp/next_jg0z6u.png' }}
                    />
                  </TouchableOpacity>
                </Block>
                <Block
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
              </Block>
            ))}
          </Block>
        </ScrollView>
      </Block>
    )
  }
}

export default Search
