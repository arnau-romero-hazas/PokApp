import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 60,
    backgroundColor: '#1b2d24',
    borderTopWidth: 1,
    borderTopColor: '#333',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.3,
    shadowRadius: 6
  },
  icon: {
    fontSize: 26,
    color: '#f4e04d'
  },
  footerLabel: {
    height: 50,
      backgroundColor: '#1b2d24',
      justifyContent: 'center',
      alignItems: 'center'
  },
  footerText: {
    color: '#f4e04d',
    fontWeight: 'bold',
    fontSize: 16
  },
  footerContent: {
    flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center'
  },
  footerIcon: {
    width: 24,
    height: 24,
    marginLeft: 8
  },
  separator: {
    height: 1,
    backgroundColor: '#f4e04d', // color de línea
    marginHorizontal: 16,
    opacity: 1
  }
})
