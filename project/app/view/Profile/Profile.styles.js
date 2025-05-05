import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 100
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1e1e1e'
  },
  loadingText: {
    marginTop: 8,
    fontSize: 16,
    color: '#fff'
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#ffd700',
    textAlign: 'center',
    marginBottom: 16,
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2
  },
  statsContainer: {
    marginTop: 24,
    marginBottom: 24
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffd700',
    marginBottom: 16,
    textAlign: 'center',
    textShadowColor: '#000',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1
  },
  stat: {
    fontSize: 16,
    marginBottom: 4,
    color: '#fff'
  },
  noStats: {
    fontSize: 16,
    color: '#bbb',
    textAlign: 'center'
  },
  statsCardsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 10
  },
  statCard: {
    width: '47%',
    backgroundColor: '#2c2c2c',
    borderRadius: 12,
    paddingVertical: 20,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#d4af37',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 12
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff'
  },
  statLabel: {
    fontSize: 14,
    color: '#ccc',
    marginTop: 6
  },
  roleText: {
    fontSize: 16,
    color: '#ffd700', // dorado suave
    marginBottom: 10,
    textAlign: 'center',
    fontWeight: '600',
    textShadowColor: '#000',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1
  }
  
})

export default styles
