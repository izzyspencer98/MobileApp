
import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { Component } from 'react'
import { Button, Container, Content, Icon } from 'native-base'
import { Image, View, Text, Property, Alert, SafeAreaView } from 'react-native'
import styles from '../styling/stylesheet'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import ShopCard from '../components/shop-card'
import { FloatingAction } from 'react-native-floating-action'

class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {
      shopCardInfo: []
    }
  }

  async componentDidMount () {
    const navigation = this.props.navigation
    const token = await AsyncStorage.getItem('@token')
    if (token === null || token === undefined || token === '') {
      console.log('no token')
      navigation.navigate('Login')
    } else {
      console.log(token)
      this.getShopData()
    }
  }

  async getShopData () {
    const navigation = this.props.navigation
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
          navigation.navigate('Login')
        } else {
          Alert.alert('Something went wrong. Please try again.')
          console.log('search failed - server error')
        }
      })
      .then((Json) => {
        console.log(Json)
        this.setState({ shopCardInfo: Json })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  render () {
    const navigation = this.props.navigation
    const shopCardInfo = this.state.shopCardInfo

    return (
      <Container style={styles.homeContainer}>
        <ScrollView>
          <Image style={{ height: 360, width: null }} source={require('../../assets/images/scene-banner.png')} />
          <Text style={{ color: '#5578A2' }}> TEST </Text>
          <Content style={styles.shopCardStyle}>
            <TouchableOpacity onPress={() => navigation.navigate('Shop')}>
              <ShopCard shopCardInfo={shopCardInfo} />
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
