import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import styles from './PokerHeader.styles.js'

export const PokerHeader = ({ username, onUserPress, onLogoutPress, leftText = 'HOME' }) => ({
  headerTitle: () => (
    <TouchableOpacity onPress={onUserPress}>
      <Text style={styles.usernameText}>{username}</Text>
    </TouchableOpacity>
  ),
  headerTitleAlign: 'center',
  headerBackVisible: false,
  headerLeft: () => (
    <Text style={styles.homeText}>{leftText}</Text>
  ),
  headerRight: () => (
    <TouchableOpacity onPress={onLogoutPress} style={styles.logoutButton}>
      <Text style={styles.logoutText}>Logout</Text>
    </TouchableOpacity>
  ),
  headerStyle: styles.headerContainer
})
