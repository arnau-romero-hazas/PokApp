import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  headerContainer: {
    backgroundColor: '#1b2d24', // Verde oscuro tipo tapete
    borderBottomWidth: 1,
    borderBottomColor: '#333'
  },
  headerRightContainer: {
    paddingRight: 15
  },
  usernameText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#f4e04d',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2
  },
  homeText: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingLeft: 15,
    color: '#f4e04d'
  },
  logoutButton: {
    backgroundColor: '#2b4c3e',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#f4e04d',
    marginRight: 10
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14
  }
})
