import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, Alert, TouchableOpacity } from 'react-native'
import { logic } from '../../logic'
import styles from './EditProfile.styles'
import { PokerBackground } from '../../components/index.js'
import { validate } from '../../validations'

const EditProfile = ({ navigation }) => {
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')

  useEffect(() => {
    navigation.setOptions({ headerShown: false })

    logic.getUserById(logic.getUserId())
      .then(user => {
        setName(user.name)
        setSurname(user.surname)
        setEmail(user.email)
        setUsername(user.username)
      })
      .catch(error => Alert.alert('Error loading profile', error.message))
  }, [])

  const handleSaveChanges = async () => {
    try {
      if (!name.trim()) throw new Error('Please enter your name.')
      if (!surname.trim()) throw new Error('Please enter your surname.')
      if (!email.trim()) throw new Error('Please enter your email.')
      if (!username.trim()) throw new Error('Please enter a username.')

      validate.name(name)
      validate.surname(surname)
      validate.email(email)
      validate.username(username)

      if (newPassword) {
        if (!currentPassword) throw new Error('Please enter your current password.')
        validate.password(newPassword)
      }

      await logic.updateUserProfile({
        name,
        surname,
        email,
        username,
        currentPassword: currentPassword || undefined,
        newPassword: newPassword || undefined
      })

      Alert.alert('✅ Profile updated successfully!')
      navigation.goBack()
    } catch (error) {
      Alert.alert('Error ❌', error.message || 'Something went wrong')
    }
  }

  return (
    <PokerBackground>
      <View style={styles.container}>
        <Text style={styles.title}>Edit Profile</Text>

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
          placeholder="Your username..."
          placeholderTextColor="#444"
          style={styles.input}
        />

        <Text style={styles.section}>Change Password (optional)</Text>

        <TextInput
          value={currentPassword}
          onChangeText={setCurrentPassword}
          placeholder="Current password"
          secureTextEntry
          placeholderTextColor="#444"
          style={styles.input}
        />
        <TextInput
          value={newPassword}
          onChangeText={setNewPassword}
          placeholder="New password"
          secureTextEntry
          placeholderTextColor="#444"
          style={styles.input}
        />

        <TouchableOpacity style={styles.button} onPress={handleSaveChanges}>
          <Text style={styles.buttonText}>SAVE CHANGES</Text>
        </TouchableOpacity>
      </View>
    </PokerBackground>
  )
}

export default EditProfile
