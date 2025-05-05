import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fdfdfd'
  },
  headerRightContainer: {
    paddingRight: 15
  },
  usernameText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333'
  },
  homeText: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingLeft: 15
  },

  gameCard: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2, // Borde visible completo
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  scheduledCard: {
    borderColor: '#4CAF50' // Verde para partidas programadas
  },
  finishedCard: {
    borderColor: '#ccc' // Gris claro para partidas finalizadas
  },

  gameTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4
  },
  gameDate: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10
  },

  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 8,
    marginTop: 12
  },
  flexButton: {
    flex: 1,
    minWidth: '45%' // se adaptan como columnas incluso en pantallas pequeñas
  }
  
})

export default styles

