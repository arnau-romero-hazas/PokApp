import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 32
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#f4e04d',
    textAlign: 'center',
    marginBottom: 24,
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.85)',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#f4e04d',
    color: '#000'
  },
  button: {
    backgroundColor: '#2b4c3e',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#f4e04d',
    marginTop: 10
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16
  },
  link: {
    color: '#f4e04d',
    marginTop: 20,
    textAlign: 'center',
    textShadowColor: '#000',              // borde negro
      textShadowOffset: { width: 0.5, height: 0.5 },
      textShadowRadius: 1
  },
  buttonDisabled: {
    opacity: 0.5
  },
  hint: {
    fontSize: 12,
    color: '#f4e04d',
    marginTop: -12,
    marginBottom: 8,
    marginLeft: 8,
    textShadowColor: '#000',              // borde negro
      textShadowOffset: { width: 0.5, height: 0.5 },
      textShadowRadius: 1
  }
})

export default styles
