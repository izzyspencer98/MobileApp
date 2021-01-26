import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  startContainer: {
    flex: 1,
    backgroundColor: '#222E50',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputView: {
    width: '70%',
    backgroundColor: '#7B8CDE',
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20
  },
  inputText: {
    height: 50,
    color: '#FFFFFF'
  },
  loginBtn: {
    width: '85%',
    backgroundColor: '#FE5F55',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 10
  },
  noAccountText: {
    marginTop: 20,
    color: '#FFFFFF'
  },
  signUpBtn: {
    width: '40%',
    backgroundColor: '#FE5F55',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10
  }
})

export default styles
