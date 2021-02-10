
import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { Component } from 'react'
import { Container, Content, Card, CardItem, Thumbnail, Text, Button, Left, Body, Right, View } from 'native-base'
import { Image, Alert, ActivityIndicator } from 'react-native'
import styles from '../styling/stylesheet'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { FloatingAction } from 'react-native-floating-action'

class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoading: true,
      shopCardInfo: []
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
      this.getShopData()
    }
  }

  componentWillUnmount () {
    this.unmount()
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
        uri: require('../../assets/images/card-image-1.jpg')
      },
      {
        uri: require('../../assets/images/card-image-2.jpg')
      },
      {
        uri: require('../../assets/images/card-image-3.jpg')
      },
      {
        uri: require('../../assets/images/card-image-4.jpg')
      },
      {
        uri: require('../../assets/images/card-image-5.jpg')
      }
    ]

    if (isLoading) {
      return (
        <Container style={styles.homeContainer}>
          <View>
            <ActivityIndicator size='large' color='#5578A2' />
          </View>
        </Container>
      )
    }

    return (
      <Container style={styles.homeContainer}>
        <ScrollView ref={view => this.scrollView = view}>
          <View style={styles.exploreView}>
            <Image style={styles.coffiDaLogoHome} source={require('../../assets/images/coffida-white.png')} />
          </View>
          <Content style={styles.shopCardStyle}>
            <TouchableOpacity onPress={() => navigation.navigate('Shop')}>
              <View>
                {shopCardInfo.map((data, index) => (
                  <Card key={index} style={styles.cardStyle}>
                    <CardItem style={{ borderTopLeftRadius: 8, borderTopRightRadius: 8, backgroundColor: '#FFFFFF' }}>
                      <Left>
                        <TouchableOpacity>
                          <Thumbnail source={require('../../assets/images/coffee.png')} />
                        </TouchableOpacity>
                        <Body>
                          <Text>{data.location_name}</Text>
                          <Text note>{data.latitude} miles</Text>
                          <Text note>{data.location_town}</Text>
                          <Text note>(Rating: {data.avg_overall_rating})</Text>
                        </Body>
                      </Left>
                      <Right>
                        <TouchableOpacity>
                          <Button transparent>
                            <Thumbnail style={{ width: 40, height: 40, borderRadius: 30 / 2 }} source={require('../../assets/images/star-filled.png')} />
                          </Button>
                        </TouchableOpacity>
                      </Right>
                    </CardItem>
                    <CardItem cardBody style={{ borderBottomLeftRadius: 8, borderBottomRightRadius: 8 }}>
                      <Image source={imagePaths[index].uri} style={{ height: 200, width: null, flex: 1, borderBottomLeftRadius: 8, borderBottomRightRadius: 8 }} />
                    </CardItem>
                  </Card>
                ))}
              </View>
            </TouchableOpacity>
          </Content>
        </ScrollView>
        <FloatingAction
          actions={[{
            text: 'Find Coffee Shops',
            icon: require('../../assets/images/search.png'),
            name: 'searchbtn',
            position: 1,
            color: '#5578A2'
          },
          {
            text: 'Sort By',
            icon: require('../../assets/images/sort.png'),
            name: 'sortbtn',
            position: 2,
            color: '#5578A2'
          }
          ]}
          floatingIcon={require('../../assets/images/search-btn.png')}
          iconWidth={55}
          iconHeight={55}
          buttonSize={70}
          position='right'
          color='#5578A2'
          onPressItem={name => {
            if (name === 'searchbtn') {
              navigation.navigate('Search')
            } else if (name === 'sortbtn') {
              // sort by highest rating or closest distance
            } else {
              console.log('error with search')
            }
          }}
        />
      </Container>
    )
  }
}

export default Home
