import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  startContainer: {
    flex: 1,
    backgroundColor: '#001D4A',
    alignItems: 'center',
    justifyContent: 'center'
  },
  coffiDaText: {
    fontFamily: 'sans-serif-medium',
    fontWeight: 'bold',
    fontSize: 60,
    padding: 30,
    color: '#FFFFFF'
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
  },
  registeredText: {
    marginTop: 20,
    color: '#FFFFFF'
  },
  logoutText: {
    marginTop: 10,
    color: '#FFFFFF',
    fontSize: 30
  },
  logoutBtnText: {
    color: '#FFFFFF',
    fontSize: 15
  },
  homeContainer: {
    flex: 1,
    backgroundColor: '#fdecdc'
  },
  homeText: {
    color: '#FFFFFF'
  },
  homeFlex: {
    flex: 1,
    backgroundColor: '#430C05',
    alignItems: 'center',
    justifyContent: 'center'
  },
  searchBtn: {
    width: '75%',
    borderRadius: 25,
    borderStyle: 'solid',
    borderWidth: 3,
    borderColor: '#F0B67F',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
    marginBottom: 10
  },
  shopCardStyle: {
    padding: 10,
    marginVertical: 1
  }
})

export default styles
