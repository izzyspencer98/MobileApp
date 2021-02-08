
import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { Component } from 'react'
import { Container, Content, Icon } from 'native-base'
import { Image, View, Text } from 'react-native'
import styles from '../styling/stylesheet'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import ShopCard from '../components/shop-card'
import { FloatingAction } from 'react-native-floating-action'

class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {
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
    }
  }

  render () {
    const navigation = this.props.navigation

    return (
      <Container style={styles.homeContainer}>
        <ScrollView ref={view => this.scrollView = view}>
          <Image style={styles.homeBanner} source={require('../../assets/images/scene-banner.png')} />
          <View style={styles.exploreView}>
            <Text style={styles.exploreText}> Explore Coffee Shops </Text>
            <TouchableOpacity onPress={() => this.scrollView.scrollTo({ x: 440, y: 440, animated: true })}>
              <Icon name='arrow-down' style={styles.arrowIcon} />
            </TouchableOpacity>
          </View>
          <Content style={styles.shopCardStyle}>
            <TouchableOpacity onPress={() => navigation.navigate('Shop')}>
              <ShopCard />
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
