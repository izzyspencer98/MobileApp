import 'react-native-gesture-handler'

import React, { Component } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import DrawerNav from './js/navigation/drawer-nav'

class App extends Component {
  render () {
    return (
      <NavigationContainer>
        <DrawerNav />
      </NavigationContainer>
    )
  }
}
export default App
