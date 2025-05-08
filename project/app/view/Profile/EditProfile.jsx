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
    const fetchUserData = async () => {
      try {
        navigation.setOptions({ headerShown: false })

        const [userId, allUsers] = await Promise.all([
          logic.getUserId(),
          logic.getAllUsers()
        ])

        const user = allUsers.find(user => user.id === userId)
        const userDetails = await logic.getUserById(userId)

        if (!user || !userDetails) throw new Error('User not found')

        setName(user.name ?? '')
        setSurname(user.surname ?? '')
        setEmail(userDetails.email ?? '')
        setUsername(userDetails.username ?? '')
      } catch (error) {
        Alert.alert('Error loading profile', error.message)
      }
    }

    fetchUserData()
  }, [])




  const handleSaveChanges = async () => {
    try {
      const data = {}
      if (!`${name}`.trim()) throw new Error('Please enter your name.')
      if (!`${surname}`.trim()) throw new Error('Please enter your surname.')
      if (!`${email}`.trim()) throw new Error('Please enter your email.')
      if (!`${username}`.trim()) throw new Error('Please enter a username.')

      validate.name(name)
      validate.surname(surname)
      validate.email(email)
      validate.username(username)

      data.name = name
      data.surname = surname
      data.email = email
      data.username = username

      if (newPassword.trim()) {
        if (!`${currentPassword}`.trim()) throw new Error('Please enter your current password.')
        validate.password(newPassword)
        data.currentPassword = currentPassword
        data.newPassword = newPassword
      }

      await logic.updateUserProfile(data)

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

        <Text style={styles.section}>Name</Text>
        <Text style={styles.readonly}>{name}</Text>

        <Text style={styles.section}>Surname</Text>
        <Text style={styles.readonly}>{surname}</Text>
        <Text style={styles.section}>Email</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="example@example.com"
          keyboardType="email-address"
          placeholderTextColor="#444"
          style={styles.input}
        />
        <Text style={styles.section}>Username</Text>
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
