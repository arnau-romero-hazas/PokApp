import React from 'react'
import { Modal, View, Text, TextInput, TouchableOpacity } from 'react-native'
import styles from './Modal.styles.js'

export function CustomModal({
  visible,
  onClose,
  onConfirm,
  inputValue,
  setInputValue,
  title = 'Enter text',
  placeholder = 'Type here...',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  showInput = true,
  options = []
}) {
  return (
    <Modal
      animationType='slide'
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>{title}</Text>

          {showInput && (
            <TextInput
              placeholder={placeholder}
              placeholderTextColor='#aaa'
              value={inputValue}
              onChangeText={setInputValue}
              style={styles.modalInput}
            />
          )}

          {options.length > 0 && options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={styles.pokerButton}
              onPress={() => onConfirm(option.value)}
            >
              <Text style={styles.pokerButtonText}>{option.label}</Text>
            </TouchableOpacity>
          ))}

          {showInput && (
            <TouchableOpacity style={styles.pokerButton} onPress={() => onConfirm(inputValue)}>
              <Text style={styles.pokerButtonText}>{confirmText}</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity style={[styles.pokerButton, styles.cancelButton]} onPress={onClose}>
            <Text style={styles.pokerButtonText}>{cancelText}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}
