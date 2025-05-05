import React from 'react'
import { TouchableOpacity, Text } from 'react-native'
import styles from './PokerButton.styles.js'

export default function PokerButton({ title, onPress, color, textColor }) {
  return (
    <TouchableOpacity
      style={[styles.button, color ? { backgroundColor: color } : null]}
      onPress={onPress}
    >
      <Text style={[styles.buttonText, textColor ? { color: textColor } : null]}>
        {title}
      </Text>
    </TouchableOpacity>
  )
}
