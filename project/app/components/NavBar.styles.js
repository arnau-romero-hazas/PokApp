import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 60,
    backgroundColor: '#1b2d24', // Verde oscuro tipo tapete
    borderTopWidth: 1,
    borderTopColor: '#333',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    elevation: 10, // sombra en Android
    shadowColor: '#000', // sombra en iOS
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    zIndex: 10
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  icon: {
    fontSize: 26,
    color: '#f4e04d' // Dorado claro para buen contraste con fondo oscuro
  }
})
