import React, { useState, useEffect } from 'react'
import { View, Text, Alert, ActivityIndicator, ScrollView } from 'react-native'
import { logic } from '../../logic'
import styles from './Profile.styles.js'
import { CustomModal, NavBar, PokerBackground, PokerHeader, PokerButton } from '../../components/index.js' 

export default function ProfileScreen({ navigation }) {
  const [username, setUsername] = useState('')
  const [userRole, setUserRole] = useState('regular')
  const [modalVisible, setModalVisible] = useState(false)
  const [secretWord, setSecretWord] = useState('')
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [historicStats, setHistoricStats] = useState(null)

  useEffect(() => {
    Promise.all([
      logic.getUsername(),
      logic.getUserRole(),
      logic.getUserStats(),
      logic.getUserHistoricStats()
    ])
      .then(([username, role, stats, historicStats]) => {
        setUsername(username)
        setUserRole(role)
        setStats(stats)
        setHistoricStats(historicStats)

        navigation.setOptions(
          PokerHeader({
            username,
            onUserPress: handleUserClick,
            onLogoutPress: handleLogoutClick,
            leftText: 'Profile'
          })
        )
      })
      .catch((error) => Alert.alert(`Error ❌\n${error.message}`))
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
  
    const handleUserClick = () => {
      try {
        const userId = logic.getUserId()
        navigation.navigate('Profile', { userId })
      } catch (error) {
        console.error(error)
        Alert.alert(`Error ❌\n${error.message}`)
      }
    }
  
  const handleRequestAdminRole = () => {
    setModalVisible(true)
  }

  const handleModalConfirm = () => {
    if (secretWord) {
      logic.requestAdminRole(secretWord)
        .then(() => logic.getUserRole())
        .then((role) => {
          setUserRole(role)
          Alert.alert('✅ Success\nYour role has been updated to admin.')
          setModalVisible(false)
          setSecretWord('')
        })
        .catch((error) => {
          Alert.alert(`Error ❌\n${error.message || 'Something went wrong.'}`)
          setModalVisible(false)
        })
    }
  }

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size='large' />
        <Text style={styles.loadingText}>Loading profile...</Text>
      </View>
    )
  }

  return (
    <PokerBackground>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.container}>
          <Text style={styles.title}>Profile</Text>
          <Text style={styles.roleText}>Current role: {userRole}</Text>
          {userRole !== 'admin' && (
            <PokerButton title='Request Admin Role' onPress={handleRequestAdminRole} />
          )}
  
          <View style={styles.statsContainer}>
            <Text style={styles.sectionTitle}>Stats (Current Season)</Text>
  
            {stats ? (
              <View style={styles.statsCardsContainer}>
                <View style={styles.statCard}>
                  <Text style={styles.statValue}>{stats.gamesPlayed}</Text>
                  <Text style={styles.statLabel}>Games played</Text>
                </View>
  
                <View style={styles.statCard}>
                  <Text style={styles.statValue}>{stats.gamesWon}</Text>
                  <Text style={styles.statLabel}>Wins</Text>
                </View>
  
                <View style={styles.statCard}>
                  <Text style={styles.statValue}>{stats.winRate}%</Text>
                  <Text style={styles.statLabel}>Win Rate</Text>
                </View>

                <View style={styles.statCard}>
                  <Text style={styles.statValue}>{stats.points}</Text>
                  <Text style={styles.statLabel}>Points</Text>
                </View>
              </View>
            ) : (
              <Text style={styles.noStats}>No stats available.</Text>
            )}
          </View>

          <View style={styles.statsContainer}>
            <Text style={styles.sectionTitle}>Historic Stats</Text>

            {historicStats ? (
              <View style={styles.statsCardsContainer}>
                <View style={styles.statCard}>
                  <Text style={styles.statValue}>{historicStats.gamesPlayed}</Text>
                  <Text style={styles.statLabel}>Games played</Text>
                </View>
                <View style={styles.statCard}>
                  <Text style={styles.statValue}>{historicStats.gamesWon}</Text>
                  <Text style={styles.statLabel}>Wins</Text>
                </View>
                <View style={styles.statCard}>
                  <Text style={styles.statValue}>{historicStats.winRate}%</Text>
                  <Text style={styles.statLabel}>Win Rate</Text>
                </View>
                <View style={styles.statCard}>
                  <Text style={styles.statValue}>{historicStats.points}</Text>
                  <Text style={styles.statLabel}>Points</Text>
                </View>
              </View>
            ) : (
              <Text style={styles.noStats}>Historic stats not available.</Text>
            )}
          </View>

          <CustomModal
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
            onConfirm={handleModalConfirm}
            inputValue={secretWord}
            setInputValue={setSecretWord}
            title="Enter Secret Word"
            placeholder="Enter the secret word"
            confirmText="OK"
            cancelText="Cancel"
          />
        </View>
      </ScrollView>
      <NavBar navigation={navigation} />
    </PokerBackground>
  )
}