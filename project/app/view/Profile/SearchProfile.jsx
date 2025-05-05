import React, { useEffect, useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { logic } from '../../logic/index.js'
import { NavBar, PokerBackground, PokerHeader } from '../../components/index.js'
import styles from './searchProfile.styles.js'

export default function SearchProfile() {
  const navigation = useNavigation()
  const [query, setQuery] = useState('')
  const [allUsers, setAllUsers] = useState([])

  useEffect(() => {
    navigation.setOptions(
      PokerHeader({
        leftText: 'SEARCH USERS',
        onLogoutPress: handleLogoutClick
      })
    )
  }, [])

  useEffect(() => {
    logic.getAllUsers()
      .then(users => setAllUsers(users))  // ← Esto es válido solo si la función ya hace `return users`
      .catch(error => {
        console.error(error)
        Alert.alert('Error ❌', 'Failed to load users')
      })
  }, [])

  const filteredSuggestions = query.trim()
    ? allUsers.filter(user => {
        const fullName = `${user.name} ${user.surname}`.toLowerCase()
        const username = user.username.toLowerCase()
        const q = query.trim().toLowerCase()
        return username.includes(q) || fullName.includes(q)
      })
    : allUsers

  const handleLogoutClick = () => {
    try {
      logic.logoutUser()
      navigation.navigate('Login')
      Alert.alert('Bye, See You soon!!')
    } catch (error) {
      console.error(error)
      Alert.alert(`Error ❌\n${error.message}`)
    }
  }

  const handleSelectUser = (user) => {
    setQuery('')
    navigation.navigate('UserProfile', { username: user.username, userId: user.id })
  }

  return (
    <PokerBackground>
      <Text style={styles.title}> 🔍</Text>

      <View style={styles.searchRow}>
        <TextInput
          style={styles.input}
          placeholder='Search users...'
          placeholderTextColor="#aaa"
          value={query}
          onChangeText={setQuery}
          autoCorrect={false}
        />
      </View>

      <FlatList
        data={filteredSuggestions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleSelectUser(item)} style={styles.suggestionItem}>
            <View style={styles.userRow}>
              <Text style={styles.suggestionText}>{item.username}</Text>
              <Text style={styles.subText}> — {item.name} {item.surname}</Text>
            </View>
          </TouchableOpacity>
        )}
      />

      <NavBar navigation={navigation} />
    </PokerBackground>
  )
}
