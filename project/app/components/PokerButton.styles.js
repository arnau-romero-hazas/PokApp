import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#2b4c3e', // color por defecto
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginVertical: 8,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#f4e04d',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5
  },
  buttonText: {
    color: '#fff', // color por defecto
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1
  }
})

export default styles
