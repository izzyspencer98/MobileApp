import 'react-native-gesture-handler'
// import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

const Stack = createStackNavigator()

const App = () => {
  return (
    <NavigationContainer>

      <Stack.Navigator>
        {/* <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Welcome' }}
        />
        <Stack.Screen name="Profile" component={ProfileScreen} /> */}
      </Stack.Navigator>

    </NavigationContainer>
  )
}
export default App
