import React, { Component } from 'react'
import { Card, CardItem, Thumbnail, Text, Button, Left, Body, Right, View } from 'native-base'
import { Image } from 'react-native'
// import styles from '../styling/stylesheet'

class ShopCard extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const shopCardInfo = this.props.shopCardInfo
    // const imagePaths = [
    //   '../../assets/images/card-image-1.jpg',
    //   '../../assets/images/card-image-2.jpg',
    //   '../../assets/images/card-image-3.jpg',
    //   '../../assets/images/card-image-4.jpg',
    //   '../../assets/images/card-image-5.jpg'
    // ]
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

    return (
      <View>
        {shopCardInfo.map((data, index) => (
          <Card key={index} style={{ borderRadius: 8, borderWidth: 5, borderColor: '#f0b67f' }}>
            <CardItem style={{ borderTopLeftRadius: 8, borderTopRightRadius: 8, backgroundColor: '#FFFFFF' }}>
              <Left>
                <Thumbnail source={require('../../assets/images/coffee.png')} />
                <Body>
                  <Text>{data.location_name}</Text>
                  <Text note>{data.latitude} miles</Text>
                  <Text note>{data.location_town}</Text>
                  <Text note>(Rating: {data.avg_overall_rating})</Text>
                </Body>
              </Left>
              <Right>
                <Button transparent>
                  <Thumbnail style={{ width: 40, height: 40, borderRadius: 30 / 2 }} source={require('../../assets/images/star.png')} />
                </Button>
              </Right>
            </CardItem>
            <CardItem cardBody style={{ borderBottomLeftRadius: 8, borderBottomRightRadius: 8 }}>
              <Image source={imagePaths[index].uri} style={{ height: 200, width: null, flex: 1, borderBottomLeftRadius: 8, borderBottomRightRadius: 8 }} />
            </CardItem>
          </Card>
        ))}
      </View>
    )
  }
}

export default ShopCard
