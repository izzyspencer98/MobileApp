import React, { Component } from 'react'
import { Card, CardItem, Thumbnail, Text, Button, Left, Body, Right, Icon, View } from 'native-base'
import { Image } from 'react-native'
// import styles from '../styling/stylesheet'

class ShopCard extends Component {
  constructor(props) {
    super(props)
  }

  render () {
    const shopCardInfo = this.props.shopCardInfo
    return (
      <Card style={{ borderRadius: 8 }}>
        <CardItem bordered style={{ borderTopLeftRadius: 8, borderTopRightRadius: 8 }}>
          <Left>
            <Thumbnail source={require('../../assets/images/coffee.jpg')} />
            <Body>
              <Text>{shopCardInfo.location_name}</Text>
              <Text note>{shopCardInfo.latitude} miles</Text>
              <Text note>{shopCardInfo.location_town}</Text>
            </Body>
          </Left>
          <Right>
            <Thumbnail style={{ width: 40, height: 40, borderRadius: 30 / 2 }} source={require('../../assets/images/star.png')} />
          </Right>
        </CardItem>
        <CardItem cardBody>
          <Image source={require('../../assets/images/coffee-shop.png')} style={{ height: 200, width: null, flex: 1, borderRadius: 5 }} />
        </CardItem>
        <CardItem>
          <Left>
            <Button transparent>
              <Icon name='star' />
              <Text>12 Likes</Text>
            </Button>
          </Left>
          <Body>
            <Button transparent>
              <Icon active name='chatbubbles' />
              <Text>4 Comments</Text>
            </Button>
          </Body>
          <Right>
            <Icon name='star-outline' />
            <Text>11h ago</Text>
          </Right>
        </CardItem>
      </Card>
    )
  }
}

export default ShopCard
