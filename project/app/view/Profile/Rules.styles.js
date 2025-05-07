import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 100
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal: 16,
    paddingBottom: 10
  },
  topBarTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#f4e04d',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    marginLeft: 12
  },
  ruleCard: {
    backgroundColor: 'rgba(10, 61, 36, 0.85)', // verde translúcido
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#1b5e20',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3
  },
  rule: {
    fontSize: 15,
    color: '#fff',
    lineHeight: 22
  }
})

export default styles
