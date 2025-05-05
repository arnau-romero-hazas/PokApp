import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native'
import { logic } from '../../logic'
import styles from './Register.styles.js'
import { PokerBackground } from '../../components/index.js'

const Register = ({ navigation }) => {
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    navigation.setOptions({ headerShown: false }) // Ocultar el header
  }, [])

  const handleRegisterSubmit = () => {
    logic.registerUser(name, surname, email, username, password)
      .then(() => {
        setName('')
        setSurname('')
        setEmail('')
        setUsername('')
        setPassword('')
        Alert.alert('Successful registration 🎉\nSign in now!')
        navigation.navigate('Login')
      })
      .catch((error) => {
        console.error(error)
        Alert.alert(`Error ❌\n${error.message}`)
      })
  }

  return (
    <PokerBackground>
      <View style={styles.container}>
        <Text style={styles.title}>Register</Text>

        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="Your name..."
          placeholderTextColor="#444"
          style={styles.input}
        />
        <TextInput
          value={surname}
          onChangeText={setSurname}
          placeholder="Your surname..."
          placeholderTextColor="#444"
          style={styles.input}
        />
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="example@example.com"
          keyboardType="email-address"
          placeholderTextColor="#444"
          style={styles.input}
        />
        <TextInput
          value={username}
          onChangeText={setUsername}
          placeholder="Your nickname..."
          placeholderTextColor="#444"
          style={styles.input}
        />
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Your password..."
          secureTextEntry
          placeholderTextColor="#444"
          style={styles.input}
        />

        <TouchableOpacity style={styles.button} onPress={handleRegisterSubmit}>
          <Text style={styles.buttonText}>REGISTER</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.link}>Already have an account? Login</Text>
        </TouchableOpacity>
      </View>
    </PokerBackground>
  )
}

export default Register