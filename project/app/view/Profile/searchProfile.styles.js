import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginVertical: 20,
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    letterSpacing: 1
  },
  searchRow: {
    marginBottom: 20,
    paddingHorizontal: 16
  },
  input: {
    backgroundColor: '#2b2b2b',
    borderColor: '#d4af37',
    borderWidth: 1.5,
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 16,
    color: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3
  },
  suggestionItem: {
    padding: 14,
    borderBottomWidth: 1,
    borderColor: '#444',
    paddingHorizontal: 16,
    backgroundColor: '#1e1e1e'
  },
  suggestionText: {
    fontSize: 16,
    color: '#fff',
    textShadowColor: '#000',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1
  }
})

export default styles
