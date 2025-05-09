
// Nueva pantalla EditGameScreen.jsx
import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, Platform, Alert, FlatList, TouchableOpacity } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import styles from './CreateGame.styles.js'
import { logic } from '../../logic'
import { CustomModal, NavBar, PokerButton, PokerHeader, PokerBackground } from '../../components/index.js'

export default function EditGameScreen({ route, navigation }) {
  const { game } = route.params

  const [title, setTitle] = useState(game.title)
  const [place, setPlace] = useState(game.place)
  const [date, setDate] = useState(new Date(game.date))
  const [participants, setParticipants] = useState(game.participants || [])
  const [allUsers, setAllUsers] = useState([])
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [mode, setMode] = useState('date') // 'date' o 'time'

  useEffect(() => {
    logic.getAllUsers()
      .then(setAllUsers)
      .catch(() => Alert.alert('Error loading users'))

    navigation.setOptions(
      PokerHeader({
        onLogoutPress: handleLogoutClick,
        leftText: 'Edit Game'
      })
    )
  }, [])

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

  const handleEditGame = () => {
    if (!title || !place || !date) {
      Alert.alert('Missing data', 'Please fill in all fields before saving.')
      return
    }

    const updates = {
      title,
      place,
      date: date.toISOString(),
      participants
    }

    logic.editGame(game._id, updates)
      .then(() => {
        Alert.alert('✅ Game updated successfully 🎉')
        navigation.navigate('Home')
      })
      .catch(error => {
        console.error('❌ Edit game failed:', error)
        Alert.alert(`Error ❌`, error.message || 'Something went wrong.')
      })
  }

  const handleDateChange = (event, selectedValue) => {
    if (selectedValue) {
      const currentDate = new Date(date)
      if (mode === 'date') {
        currentDate.setFullYear(selectedValue.getFullYear())
        currentDate.setMonth(selectedValue.getMonth())
        currentDate.setDate(selectedValue.getDate())
      } else if (mode === 'time') {
        currentDate.setHours(selectedValue.getHours())
        currentDate.setMinutes(selectedValue.getMinutes())
      }
      setDate(currentDate)
    }

    if (Platform.OS !== 'ios') {
      setShowDatePicker(false)
    }
  }

  return (
    <PokerBackground>
      <View style={styles.container}>
        <Text style={styles.title}>Edit Game</Text>

        <TextInput
          style={styles.input}
          placeholder="Title"
          value={title}
          onChangeText={setTitle}
        />

        <TextInput
          style={styles.input}
          placeholder="Place"
          value={place}
          onChangeText={setPlace}
        />

        <View style={styles.dateContainer}>
          <PokerButton title="📅 Select Date" onPress={() => { setMode('date'); setShowDatePicker(true) }} />
          <PokerButton title="⏰ Select Time" onPress={() => { setMode('time'); setShowDatePicker(true) }} />
          <Text style={styles.dateText}>
            Selected: {date.toLocaleDateString()} {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </Text>

          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode={mode}
              display="default"
              minuteInterval={15}
              onChange={handleDateChange}
            />
          )}
        </View>


        <Text style={styles.subtitle}>Select Participants</Text>
        <FlatList
          data={allUsers}
          keyExtractor={item => item.id}
          style={styles.userList}
          renderItem={({ item }) => {
            const isSelected = participants.includes(item.id)
            return (
              <TouchableOpacity
                onPress={() => {
                  if (isSelected) {
                    setParticipants(participants.filter(id => id !== item.id))
                  } else {
                    setParticipants([...participants, item.id])
                  }
                }}
                style={[styles.userItem, isSelected && styles.userItemSelected]}
              >
                <Text style={styles.userText}>
                  {item.username} ({item.name} {item.surname})
                </Text>
              </TouchableOpacity>
            )
          }}
        />

        <PokerButton title="Save Changes" onPress={handleEditGame} />
      </View>
      <NavBar navigation={navigation} />
    </PokerBackground>
  )
}
