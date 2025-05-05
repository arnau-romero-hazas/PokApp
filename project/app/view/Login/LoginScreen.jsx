import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native'
import { logic } from '../../logic'
import styles from './Login.styles.js'
import { PokerBackground } from '../../components/index.js'

const Login = ({ navigation }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    navigation.setOptions({ headerShown: false }) // Oculta el header
  }, [])

  const handleLoginSubmit = () => {
    logic.loginUser(username, password)
      .then(() => {
        setUsername('')
        setPassword('')
        navigation.navigate('Home')
      })
      .catch(error => {
        console.error(error)
        Alert.alert(`Error ❌\n${error.message}`)
      })
  }

  return (
    <PokerBackground>
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>

        <TextInput
          value={username}
          onChangeText={setUsername}
          placeholder="Your username..."
          placeholderTextColor="#444"
          style={styles.input}
        />
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Your password..."
          placeholderTextColor="#444"
          secureTextEntry
          style={styles.input}
        />

        <TouchableOpacity style={styles.button} onPress={handleLoginSubmit}>
          <Text style={styles.buttonText}>LOGIN</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.link}>Don't have an account? Register</Text>
        </TouchableOpacity>
      </View>
    </PokerBackground>
  )
}

export default Login