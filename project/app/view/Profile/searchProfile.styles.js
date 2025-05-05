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
   /* ───────── Tarjeta de usuario ───────── */
    suggestionItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginHorizontal: 16,
      marginVertical: 6,
      paddingVertical: 14,
      paddingHorizontal: 18,
      backgroundColor: '#0a3d24',
      borderRadius: 12,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 5
    },
    suggestionText: {
      fontSize: 17,
      color: '#fff',
      fontWeight: '600',
      letterSpacing: 0.3,
      textShadowColor: '#000',
      textShadowOffset: { width: 0, height: 1 },
      textShadowRadius: 1
    },
    userRow: {
      flexDirection: 'row',
      alignItems: 'center',
      flexWrap: 'wrap'
    },
    subText: {
      fontSize: 14,
      color: '#bbb',
      marginLeft: 6
    }
})

export default styles
