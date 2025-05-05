import React, { useEffect, useState } from 'react'
import { View, Text, Button, FlatList, Alert, ActivityIndicator } from 'react-native'
import { logic } from '../../logic/index.js'
import styles from './Classification.styles.js'
import { NavBar, PokerBackground2, PokerHeader } from '../../components/index.js' 

export default function ClassificationHistoric({ navigation }) {
  const [leaderboard, setLeaderboard] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [username, setUsername] = useState('')

  useEffect(() => {
    logic.getUsername()
      .then(setUsername)
      .catch(console.error)

    logic.getSeasonHistoric()
      .then(setLeaderboard)
      .then(() => {
         navigation.setOptions(
          PokerHeader({
            onLogoutPress: handleLogoutClick,
            leftText: 'Classification Historic'
          })
        )
      })
      .catch(err => {
        setError(err.message)
        setLeaderboard([])
      })
      .finally(() => setLoading(false))
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

  const renderHeader = () => (
    <View style={styles.rowHeader}>
      <Text style={styles.cellRank}>#</Text>
      <Text style={styles.cellUsername}>Username</Text>
      <Text style={styles.cellPoints}>Wins</Text>
    </View>
  )

  const renderItem = ({ item, index }) => (
    <View style={styles.row}>
      <Text style={styles.cellRank}>{index + 1}</Text>
      <Text style={styles.cellUsername}>{item.username}</Text>
      <Text style={styles.cellPoints}>{item.points}</Text>
    </View>
  )

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size='large' />
        <Text style={styles.loadingText}>Cargando clasificación histórica...</Text>
      </View>
    )
  }

  return (
    <PokerBackground2>
      <Text style={styles.title}>Clasificación Histórica</Text>
      {renderHeader()}
      <FlatList
        data={leaderboard}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
      <Button title='Volver a Clasificación Actual' onPress={() => navigation.navigate('ClassificationScreen')} />
      <NavBar navigation={navigation} />
    </PokerBackground2>
  )
}