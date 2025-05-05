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
  dateContainer: {
    marginBottom: 16
  },
  dateText: {
    color: '#fff',
    textAlign: 'center',
    marginTop: 8,
    fontSize: 16,
    fontWeight: '500',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#f4e04d',
    marginBottom: 10,
    marginTop: 20,
    textAlign: 'center',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2
  },
  userList: {
    maxHeight: 200,
    marginBottom: 20
  },
  userItem: {
    padding: 10,
    backgroundColor: '#333',
    borderColor: '#f4e04d',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 8
  },
  userItemSelected: {
    backgroundColor: '#2b4c3e'
  },
  userText: {
    color: '#fff',
    textAlign: 'center'
  }

  
})

export default styles
