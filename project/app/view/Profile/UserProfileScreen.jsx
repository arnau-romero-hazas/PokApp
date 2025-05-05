import React, { useState, useEffect } from 'react'
import { View, Text, ActivityIndicator, ScrollView, Alert } from 'react-native'
import { logic } from '../../logic/index.js'
import styles from './Profile.styles.js'
import { NavBar, PokerBackground, PokerHeader } from '../../components/index.js' 

export default function UserProfileScreen({ route, navigation }) {
  const { username, userId } = route.params

  const [stats, setStats] = useState(null)
  const [historicStats, setHistoricStats] = useState(null)
  const [loading, setLoading] = useState(true)
  
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

  useEffect(() => {
    Promise.all([
      logic.getUserStatsById(userId),
      logic.getUserHistoricStatsById(userId)
    ])
      .then(([stats, historicStats]) => {
        setStats(stats)
        setHistoricStats(historicStats)

          navigation.setOptions(
            PokerHeader({
              username,
    
              onLogoutPress: handleLogoutClick,
              leftText: 'User Profile'
            })
          )
      })
      .catch(error => {
        console.error(error)
        Alert.alert(`Error ❌\n${error.message}`)
      })
      .finally(() => setLoading(false))
  }, [userId])

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size='large' />
        <Text style={styles.loadingText}>Loading user profile...</Text>
      </View>
    )
  }

  return (
    <PokerBackground>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.container}>

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
              <Text style={styles.noStats}>Stats not available.</Text>
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
        </View>
      </ScrollView>
      <NavBar navigation={navigation} />
    </PokerBackground>
  )
}