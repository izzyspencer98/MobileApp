import 'react-native-gesture-handler'

import React, { Component } from 'react'
import { NavigationContainer } from '@react-navigation/native'
// import DrawerNav from './js/navigation/drawer-nav'
import Start from './js/navigation/startup'

class App extends Component {
  render () {
    return (
      <NavigationContainer>
        <Start />
        {/* <DrawerNav /> */}
      </NavigationContainer>
    )
  }
}
export default App
