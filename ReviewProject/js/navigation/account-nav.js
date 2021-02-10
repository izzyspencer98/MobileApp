import React, { Component } from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Account from '../screens/account-page'
// import UpdateDetails from '../components/details-form'

const Stack = createStackNavigator()

class AccountNav extends Component {
  render () {
    return (
      <Stack.Navigator>
        <Stack.Screen name='Account' component={Account} />
        {/* <Stack.Screen name='Update Account Details' component={UpdateDetails} /> */}
      </Stack.Navigator>
    )
  }
}

export default AccountNav
