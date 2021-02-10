import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({

  // home
  homeContainer: {
    flex: 1,
    backgroundColor: '#001D4A'
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
  coffiDaLogoHome: {
    height: 50,
    width: 200,
    marginBottom: 20
  },
  homeBanner: {
    height: 360,
    width: null
  },
  exploreView: {
    flex: 1,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  exploreText: {
    fontFamily: 'sans-serif-medium',
    fontWeight: 'bold',
    fontSize: 25,
    color: '#2B3A67'
  },
  arrowIcon: {
    color: '#2B3A67'
  },
  shopCardStyle: {
    marginHorizontal: 20
  },

  // login / logout / signup
  startContainer: {
    flex: 1,
    backgroundColor: '#001D4A',
    alignItems: 'center',
    justifyContent: 'center'
  },
  coffiDaLogo: {
    height: 70,
    width: 260,
    marginBottom: 20
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

  // search
  // shop
  cardStyle: {
    marginBottom: 20,
    borderRadius: 8,
    borderWidth: 5,
    borderColor: '#f0b67f'
  },

  // review
  // account
  accountContainer: {
    flex: 1,
    backgroundColor: '#001D4A',
    alignItems: 'center',
    justifyContent: 'center'
  },
  accountHeader: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  accountIcon: {
    height: 70,
    width: 70,
    marginBottom: 20
  },
  accountTitle: {
    fontFamily: 'sans-serif-medium',
    fontSize: 30,
    marginBottom: 10,
    color: '#FFFFFF'
  },
  accountText: {
    fontFamily: 'sans-serif-medium',
    fontSize: 14,
    marginBottom: 20,
    marginHorizontal: 20,
    textAlign: 'center',
    color: '#FFFFFF'
  },
  accountTextInput: {
    height: 50,
    color: '#FFFFFF'
  },
  accountInputView: {
    width: '70%',
    backgroundColor: '#7B8CDE',
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20
  },
  updateAccountBtn: {
    width: '85%',
    backgroundColor: '#FE5F55',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 10
  }

  // my reviews
  // liked reviews

})

export default styles
