import React, { Component } from 'react'
import { RNCamera } from 'react-native-camera'
import { Block, Button, Card, NavBar, Icon, Input, Text } from 'galio-framework'
import { TouchableOpacity } from 'react-native-gesture-handler'
import * as ImagePicker from 'react-native-image-picker'
import photoFetch from '../api/photo'

class Camera extends Component {
  constructor (props) {
    super(props)
    this.state = {
      photo: ''
    }
  }

  componentDidMount () {
    this.setState({ photo: '' })
  }

  async takePhoto () {
    const navigation = this.props.navigation
    if (this.camera) {
      const options = { quality: 0.5, base64: true }
      const base = await this.camera.takePictureAsync(options)
      const photo = base.base64
      navigation.navigate('ReviewForm', { locID: null, location: '', town: '', photo: photo })
    //   this.setState({ photo: photo }, () => {
    //     photoFetch.postPhoto(photo)
    //   })
    }
  }

  chooseImage () {
    const navigation = this.props.navigation
    const options = {
      title: 'Select Image',
      includeBase64: true,
      mediaType: 'photo'
    }
    ImagePicker.launchImageLibrary(options, response => {
      const photo = response.base64
      navigation.navigate('ReviewForm', { locID: null, location: '', town: '', photo: photo })
    //   this.setState({ photo: photo }, () => {
    //     photoFetch.postPhoto(photo)
    //   })
    })
  }

  render () {
    return (
      <Block flex>
        <RNCamera
          ref={ref => {
            this.camera = ref
          }}
          style={{
            flex: 1,
            width: '100%',
            alignItems: 'center'
          }}
          captureAudio={false}
          androidCameraPermissionOptions={{
            title: 'Allow CoffiDa to take pictures?',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Allow',
            buttonNegative: 'Cancel'
          }}
        />
        <Block row middle space='between'>
          <Block row style={{ marginLeft: 10 }}>
            <Icon size={20} name='plus' family='AntDesign' color='#F2F2F2' />
            <Text style={{ color: '#F2F2F2' }}>Gallery</Text>
          </Block>
          <Block>
            <TouchableOpacity onPress={() => this.takePhoto()}>
              <Icon size={50} name='camerao' family='AntDesign' color='#7B8CDE' />
            </TouchableOpacity>
          </Block>
          <TouchableOpacity onPress={() => this.chooseImage()}>
            <Block right row style={{ marginRight: 10 }}>
              <Icon size={20} name='plus' family='AntDesign' color='#7B8CDE' />
              <Text>Gallery</Text>
            </Block>
          </TouchableOpacity>
        </Block>
      </Block>

    )
  }
}
export default Camera
