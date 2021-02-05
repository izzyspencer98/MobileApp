
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
      xToken: '',
      shopCardInfo: []
    }
  }

  async componentDidMount () {
    const navigation = this.props.navigation
    const token = await AsyncStorage.getItem('@token')
    if (token === null) {
      console.log('EMPTY')
      navigation.navigate('Login')
    } else {
      console.log('SOMETHING')
      this.getShopData()
    }

    if (this.shopCardInfo === null || this.shopCardInfo === undefined || this.shopCardInfo === '') {
      this.getShopData()
    }
  }

  async test () {
    const token = await AsyncStorage.getItem('@token')
    const id = await AsyncStorage.getItem('@id')
    if (token === null) {
      console.log('EMPTY')
    } else {
      console.log('SOMETHING')
      console.log(token + ' ' + id)
      // stay on this page - user is logged in
    }
  }

  async getShopData () {
    this.state.xToken = await AsyncStorage.getItem('@session_token')
    return fetch('http://10.0.2.2:3333/api/1.0.0/location/5', {
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': this.state.xToken
      }
    })
      .then((response) => {
        if (response.status === 200) {
          // ToastAndroid.show('Successfully logged in.', ToastAndroid.SHORT)
          // navigation.navigate('Home')
          return response.json()
        } else if (response.status === 400) {
          // Alert.alert('Incorrect login details. Please try again or sign up for a new account.')
        } else if (response.status === 401) {
          // Alert.alert('Incorrect login details. Please try again or sign up for a new account.')
        } else {
          // Alert.alert('Something went wrong. Please try again.')
        }
      })
      .then((Json) => {
        console.log(Json)
        // store data here
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
          <Image style={{ height: 360, width: null }} source={require('../../assets/images/scene.jpg')} />
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
            color: '#7B8CDE'
          },
          {
            text: 'Sort By',
            icon: require('../../assets/images/sort.png'),
            name: 'sortbtn',
            position: 2,
            color: '#7B8CDE'
          }
          ]}
          floatingIcon={require('../../assets/images/coffee-cup.png')}
          iconWidth={45}
          iconHeight={45}
          buttonSize={70}
          position='right'
          color='#F0B67F'
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
