import React from 'react'
import { ImageBackground } from 'react-native'
import styles from './PokerBackground.styles.js'
export default function PokerBackground({ children }) {
  return (
    <ImageBackground
      source={require('../assets/background.png')} // usa tu imagen aquí
      style={styles.background}
      resizeMode='cover'
    >
      {children}
    </ImageBackground>
  )
}

