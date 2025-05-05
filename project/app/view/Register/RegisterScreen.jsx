import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native'
import { logic } from '../../logic'
import styles from './Register.styles.js'
import { PokerBackground } from '../../components/index.js'
import { validate } from '../../validations'

const Register = ({ navigation }) => {
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const isFormFilled =
    name.trim() &&
    surname.trim() &&
    email.trim() &&
    username.trim() &&
    password.trim()

  useEffect(() => {
    navigation.setOptions({ headerShown: false }) // Ocultar el header
  }, [])

  const handleRegisterSubmit = async () => {
    try {
      // Validaciones personalizadas de campos vacíos
      if (!name.trim()) throw new Error('Please enter your name.')
      if (!surname.trim()) throw new Error('Please enter your surname.')
      if (!email.trim()) throw new Error('Please enter your email.')
      if (!username.trim()) throw new Error('Please enter a username.')
      if (!password.trim()) throw new Error('Please enter a password.')

      // Validaciones de formato
      validate.name(name)
      validate.surname(surname)
      validate.email(email)
      validate.username(username)
      validate.password(password)

      await logic.registerUser(name, surname, email, username, password)

      setName('')
      setSurname('')
      setEmail('')
      setUsername('')
      setPassword('')
      Alert.alert('Successful registration 🎉\nSign in now!')
      navigation.navigate('Login')
    } catch (error) {
      console.error(error)

      if (error.message.startsWith('Please enter')) {
        Alert.alert('Missing field ⚠️', error.message)
      } else {
        switch (error.name) {
          case 'ValidationError':
            Alert.alert('Invalid input ❌', error.message)
            break
          case 'DuplicityError':
            Alert.alert('User already exists 🚫', error.message)
            break
          case 'SystemError':
            Alert.alert('Server error ⚠️', error.message)
            break
          default:
            Alert.alert('Unexpected error ❌', error.message || 'Something went wrong.')
            break
        }
      }
    }
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
        <Text style={styles.hint}>Username must be at least 3 characters</Text>
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Your password..."
          secureTextEntry
          placeholderTextColor="#444"
          style={styles.input}
        />
        <Text style={styles.hint}>Password must be at least 8 characters</Text>
        <TouchableOpacity
          style={[styles.button, !isFormFilled && styles.buttonDisabled]}
          onPress={handleRegisterSubmit}
          disabled={!isFormFilled}
        >
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
