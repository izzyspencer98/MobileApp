import React, { Component } from 'react'
import { Text } from 'react-native'
import { Block, Button } from 'galio-framework'
import accountFetch from '../api/account'
import styles from '../styling/stylesheet'

class Logout extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoading: true
    }
  }

  async logoutUser () {
    const navigation = this.props.navigation
    const status = await accountFetch.logout()
    if (status === 200) {
      navigation.navigate('Login')
    }
    if (status === 401) {
      navigation.navigate('Login')
    }
  }

  render () {
    const navigation = this.props.navigation
    return (
      <Block
        middle
        style={styles.mainContainer}
      >
        <Text style={styles.logoutText}>Do you want to logout?</Text>
        <Button
          round
          size='small'
          color='#FE5F55'
          style={styles.elevation4}
          onPress={() => this.logoutUser()}
        >
          Logout
        </Button>
        <Button
          round
          size='small'
          color='#FE5F55'
          style={styles.elevation4}
          onPress={() => navigation.navigate('Home')}
        >
          Go Home
        </Button>
      </Block>
    )
  }
}

export default Logout
