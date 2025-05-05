// app/components/Modal.styles.js
import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  modalContent: {
    backgroundColor: '#1e1e1e',
    padding: 24,
    borderRadius: 16,
    width: '85%',
    borderWidth: 2,
    borderColor: '#d4af37', // dorado estilo póker
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 8,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalInput: {
    height: 42,
    borderColor: '#d4af37',
    borderWidth: 1.5,
    borderRadius: 8,
    paddingHorizontal: 12,
    color: '#fff',
    backgroundColor: '#2b2b2b',
    marginBottom: 20,
  },
  pokerButton: {
    backgroundColor: '#d4af37',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
  },
  pokerButtonText: {
    color: '#1e1e1e',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#555',
  },

})

export default styles
