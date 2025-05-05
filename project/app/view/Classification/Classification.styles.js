import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#0a3d24' // Verde más vibrante tipo tapete de póker
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#f4e04d', // Dorado claro
    textAlign: 'center',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2
  },
  rowHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#666',
    marginBottom: 8,
    backgroundColor: '#195c3d',
    borderRadius: 8,
    paddingHorizontal: 8
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 8,
    backgroundColor: '#134b31',
    borderRadius: 8,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2
  },
  cellRank: {
    width: 30,
    fontWeight: 'bold',
    color: '#f4e04d',
    textAlign: 'center'
  },
  cellUsername: {
    flex: 1,
    color: '#ffffff',
    fontWeight: '600'
  },
  cellPlayed: {
    width: 60,
    textAlign: 'right',
    color: '#ffffff'
  },
  cellWon: {
    width: 60,
    textAlign: 'right',
    color: '#ffffff'
  },
  cellWinRate: {
    width: 70,
    textAlign: 'right',
    color: '#ffffff'
  },
  cellPoints: {
    width: 60,
    textAlign: 'right',
    color: '#ffffff',
    fontWeight: 'bold'
  }
})

export default styles