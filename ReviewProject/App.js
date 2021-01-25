
import React, { Component } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import DrawerNav from './drawer-nav'

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
