import React, { Component } from 'react'
import { View, Text, Alert, TouchableOpacity, Image, ActivityIndicator } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import styles from '../styling/stylesheet'

class PhotoFetch extends Component {
  postPhoto (photo) {
    console.log('LOG - ' + photo)
  }
}
const photoFetch = new PhotoFetch()
export default photoFetch
