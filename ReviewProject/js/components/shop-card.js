import React, { Component } from 'react'
import { Card, CardItem, Thumbnail, Text, Button, Left, Body, Right } from 'native-base'
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
        <CardItem style={{ borderTopLeftRadius: 8, borderTopRightRadius: 8 }}>
          <Left>
            <Thumbnail source={require('../../assets/images/coffee-icon.png')} />
            <Body>
              <Text>{shopCardInfo.location_name}</Text>
              <Text note>{shopCardInfo.latitude} miles</Text>
              <Text note>{shopCardInfo.location_town}</Text>
              <Text note>(Rating: {shopCardInfo.avg_overall_rating})</Text>
            </Body>
          </Left>
          <Right>
            <Button transparent>
              <Thumbnail style={{ width: 40, height: 40, borderRadius: 30 / 2 }} source={require('../../assets/images/star.png')} />
            </Button>
          </Right>
        </CardItem>
        <CardItem cardBody style={{ borderBottomLeftRadius: 8, borderBottomRightRadius: 8 }}>
          <Image source={require('../../assets/images/just-coffee1.jpg')} style={{ height: 200, width: null, flex: 1, borderRadius: 8 }} />
        </CardItem>
      </Card>
    )
  }
}

export default ShopCard
