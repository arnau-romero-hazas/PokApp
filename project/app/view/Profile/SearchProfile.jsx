import React, { useEffect, useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { logic } from '../../logic/index.js'
import { NavBar, PokerBackground, PokerHeader } from '../../components/index.js'
import styles from './searchProfile.styles.js'

export default function SearchProfile() {
  const navigation = useNavigation()
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState([])
  
  useEffect(() => {
    navigation.setOptions(
      PokerHeader({
        leftText: 'SEARCH USERS',
        onLogoutPress: handleLogoutClick
      })
    )
  }, [])

  useEffect(() => {
    if (!query.trim()) {
      setSuggestions([])
      return
    }
    navigation.setOptions(
      PokerHeader({
        
        leftText: 'Search Users...'
      })
    )
    const timeout = setTimeout(() => {
      logic.searchUsers(query)
        .then(setSuggestions)
      
    }, 300)

    return () => clearTimeout(timeout)
  }, [query])

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
    setSuggestions([])
    navigation.navigate('UserProfile', { username: user.username, userId: user.id })
  }

  return (
    <PokerBackground>
      <Text style={styles.title}> 🔍</Text>

      <View style={styles.searchRow}>
        <TextInput
          style={styles.input}
          placeholder='Search users... '
          placeholderTextColor="#aaa"
          value={query}
          onChangeText={setQuery}
          autoCorrect={false}
        />
      </View>

      <FlatList
        data={suggestions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleSelectUser(item)} style={styles.suggestionItem}>
            <Text style={styles.suggestionText}>{item.username}</Text>
          </TouchableOpacity>
        )}
      />

      <NavBar navigation={navigation} />
    </PokerBackground>
  )
}