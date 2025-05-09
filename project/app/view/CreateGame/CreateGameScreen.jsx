import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, Platform, Alert, FlatList, TouchableOpacity } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import styles from './CreateGame.styles.js'
import { logic } from '../../logic'
import { CustomModal, NavBar, PokerButton, PokerHeader, PokerBackground } from '../../components/index.js'

export default function CreateGameScreen({ navigation }) {
  const [title, setTitle] = useState('')
  const [season, setSeason] = useState('')
  const [place, setPlace] = useState('')
  const [date, setDate] = useState(new Date())
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [seasonOptions, setSeasonOptions] = useState([])
  const [participants, setParticipants] = useState([])
  const [allUsers, setAllUsers] = useState([])
  const [mode, setMode] = useState('date') // 'date' o 'time'


  useEffect(() => {
      logic.getAllUsers()
        .then(setAllUsers)
        .catch(() => Alert.alert('Error loading users'))
    logic.getLatestSeason()
      .then(season => {
        const options = season ? [
          { label: season.name, value: season.name },
          { label: 'Casual', value: 'casual' }
        ] : [
          { label: 'Casual', value: 'casual' }
        ]
        setSeasonOptions(options)
        navigation.setOptions(
          PokerHeader({
            onLogoutPress: handleLogoutClick,
            leftText: 'Create Game'
          })
        )
      })
      .catch(() => {
        setSeasonOptions([{ label: 'Casual', value: 'casual' }])
      })
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

  const handleCreateGame = () => {
    if (!title || !season || !place || !date) {
      Alert.alert('Missing data', 'Please fill in all fields before creating a game.')
      return
    }

    try {
      const isoDate = new Date(date).toISOString()

      logic.createGame(title, season, place, isoDate, participants)
        .then(() => {
          Alert.alert('✅ Game created successfully 🎉')
          navigation.navigate('Home')
        })
        .catch(error => {
          console.error('❌ Create game failed:', error)
          Alert.alert(`Error ❌`, error.message || 'Something went wrong.')
        })
    } catch (error) {
      console.error('❗ Error preparing game:', error)
      Alert.alert('Unexpected error ❌', error.message || 'Something went wrong.')
    }
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
    setShowDatePicker(false)
  }


  const handleSeasonSelect = (value) => {
    setSeason(value)
    setModalVisible(false)
  }

  return (
    <PokerBackground>
      <View style={styles.container}>
        <Text style={styles.title}>Create Game</Text>

        <TextInput
          style={styles.input}
          placeholder="Title"
          placeholderTextColor="#444"
          value={title}
          onChangeText={setTitle}
        />

        <PokerButton
          title={season ? `Season: ${season}` : 'Select Season'}
          onPress={() => setModalVisible(true)}
        />

        <TextInput
          style={styles.input}
          placeholder="Place"
          placeholderTextColor="#444"
          value={place}
          onChangeText={setPlace}
        />

        <View style={styles.input}>
          {Platform.OS === 'web' ? (
            <>
              <Text>Select Date</Text>
              <input
                type="date"
                value={date.toISOString().split('T')[0]}
                onChange={(e) => setDate(new Date(e.target.value))}
                style={{ padding: 8 }}
              />
            </>
          ) : (
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

        <PokerButton title="Create Game" onPress={handleCreateGame} />

        <CustomModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onConfirm={handleSeasonSelect}
          inputValue={season}
          setInputValue={setSeason}
          title="Select Season"
          showInput={false}
          options={seasonOptions}
        />
      </View>

      <NavBar navigation={navigation} />
    </PokerBackground>
  )
}