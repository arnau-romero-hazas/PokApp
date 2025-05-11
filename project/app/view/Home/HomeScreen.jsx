import React, { useState, useEffect } from 'react'
import { View, Text, FlatList, Alert, ActivityIndicator} from 'react-native'

import styles from './Home.styles.js'
import { logic } from '../../logic/index.js'
import { CustomModal, NavBar, PokerButton, PokerHeader, PokerBackground} from '../../components/index.js'

const Home = ({ navigation }) => {
  const [username, setUsername] = useState('')
  const [games, setGames] = useState([])
  const [userId, setUserId] = useState('')
  const [loading, setLoading] = useState(true)
  const [userRole, setUserRole] = useState('')

  const [modalVisible, setModalVisible] = useState(false)
  const [selectedGame, setSelectedGame] = useState(null)
  const [userMap, setUserMap] = useState({})
  const refreshGamesWithPoints = async (currentUserId) => {
    const { games } = await logic.getGames()

    const calculatePointsAndPermissions = async (game) => {
      const roles = await logic.getUserRolesByIds(game.participants)
      const adminCount = roles.filter(user => user.role === 'admin').length
      const adminOrGuestVipCount = roles.filter(user =>
        user.role === 'admin' || user.role === 'guestVIP'
      ).length

      const isCasual = game.seasonName?.toLowerCase?.() === 'casual'
      const canSetWinner = isCasual || (adminCount >= 1 && adminOrGuestVipCount >= 3)

      const estimatedPoints = roles.reduce((acc, user) => {
        if (user.id !== currentUserId) acc += user.role === 'admin' ? 1 : 0.5
        return acc
      }, 0)

      return {
        ...game,
        estimatedPoints,
        canSetWinner
      }
    }

    const gamesWithExtras = await Promise.all(
      games.map(game => calculatePointsAndPermissions(game))
    )

    setGames(gamesWithExtras)

    const allParticipantIds = [...new Set(games.flatMap(g => g.participants))]
    const usernamesMap = await logic.getUsernamesByIds(allParticipantIds)
    const map = {}
    usernamesMap.forEach(({ id, username }) => (map[id] = username))
    setUserMap(map)
  }


  useEffect(() => {
    const fetchData = async () => {
      try {
        const [username, userId, role] = await Promise.all([
          logic.getUsername(),
          logic.getUserId(),
          logic.getUserRole()
        ])

        setUsername(username)
        setUserId(userId)
        setUserRole(role)

        await refreshGamesWithPoints(userId)

        navigation.setOptions(
          PokerHeader({
            username,
            onUserPress: handleUserClick,
            onLogoutPress: handleLogoutClick,
            leftText: 'HOME'
          })
        )
      } catch (error) {
        console.error(error)
        Alert.alert(`Error ❌\n${error.message}`)
      } finally {
        setLoading(false)
      }
    }
  
    fetchData()
  }, [])

  const fetchGames = () => {
    logic.getGames()
      .then( ({ games })  => setGames(games))
      .catch(error => Alert.alert(`Error ❌\n${error.message}`))
  }
  
  const fetchParticipants = async () => {
    const allParticipantIds = [...new Set(games.flatMap(g => g.participants))]
    const usernamesMap = await logic.getUsernamesByIds(allParticipantIds)
    const map = {}
    usernamesMap.forEach(({ id, username }) => map[id] = username)
    setUserMap(map)
  }
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

  const openWinnerModal = (game) => {
    setSelectedGame(game)
    logic.getUsernamesByIds(game.participants)
      .then(userArray => {
        const map = {}
        userArray.forEach(({ id, username }) => map[id] = username)
        setUserMap(map)
        setModalVisible(true)
      })
      .catch(error => Alert.alert('Error loading participants\n' + error.message))
  }

  const handleConfirmWinner = (winnerId) => {
    Alert.alert(
      'Set Winner?',
      'This action is irreversible. Are you sure?',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Confirm',
          style: 'default',
          onPress: () => {
            logic.setGameWinner(selectedGame._id, winnerId)
              .then(() => {
                setModalVisible(false)
                setSelectedGame(null)
                fetchGames()
                fetchParticipants()
                Alert.alert('✅ Winner correctly assigned')
              })
              .catch(error => {
                Alert.alert(`Error ❌\n${error.message}`)
                setModalVisible(false)
              })
          }
        }
      ]
    )
  }  

  const handleDeleteGame = (gameId) => {
    Alert.alert(
      '🃏 Delete Game?',
      'Are you sure you want to remove this poker game from the list? ♠️♥️',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            logic.deleteGame(gameId)
              .then(() => refreshGamesWithPoints(userId))
              .catch(error => Alert.alert('Error ❌', error.message))
          }
        }
      ]
    )
  }  

  const scheduledGames = games.filter(game => game.status === 'scheduled')
  const finishedGames = games.filter(game => game.status === 'finished')
  const combinedGames = [...scheduledGames, ...finishedGames]

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#1E90FF" />
        <Text> ♥️ ♠️ ♣️ ♦️ Loading Pokapp... 🂽 🂡</Text>
      </View>
    )
  }

  const estimatedPoints = game => {
    return logic.getUserRolesByIds(game.participants)
      .then(users => {
        return users.reduce((sum, u) => {
          if (u.id !== userId) sum += u.role === 'admin' ? 1 : 0.5
          return sum
        }, 0)
      })
  }

  return (
    <PokerBackground>
      <FlatList
       style={{ flex: 1 }}
       contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
        data={games.sort((a, b) => (a.status === 'scheduled' ? -1 : 1))}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => {
          const isParticipant = item.participants.includes(userId)

          return (
            <View
              style={[
                styles.gameCard,
                item.status === 'scheduled' ? styles.scheduledCard : styles.finishedCard
              ]}
            >
              <Text style={styles.gameTitle}>{item.title}</Text>
              <Text style={styles.gameDate}>{new Date(item.date).toLocaleString()}</Text>
              {item.place && (
                <Text style={{ color: '#0a3d24', fontWeight: 'bold', marginBottom: 4 }}>
                  📍 {item.place}
                </Text>
              )}
              {item.seasonName === 'casual' ? (
                <Text style={{ color: '#555', fontStyle: 'italic', fontWeight: '500' }}>
                  🎮 This is a casual game
                </Text>
              ) : (
                <Text style={{ color: '#0a3d24', fontWeight: 'bold' }}>
                  🪙 If you win you earn: {item.estimatedPoints} points
                </Text>
              )}
              <View style={{ marginTop: 10 }}>
              <Text style={{ fontWeight: 'bold' }}>Participants:</Text>
              {item.participants.length === 0 ? (
                <Text style={{ color: '#999' }}>No participants yet</Text>
              ) : (
                <>
                  {item.participants.map(partId => (
                    <Text key={partId} style={{ marginLeft: 8 }}>
                      • {userMap[partId] || 'Loading...'}
                    </Text>
                  ))}

                  {userRole === 'admin' && !item.canSetWinner && item.seasonName?.toLowerCase?.() !== 'casual' && (
                    <Text style={{
                      color: '#ccc',
                      fontSize: 12,
                      marginTop: 8,
                      textAlign: 'center',
                      fontStyle: 'italic'
                    }}>
                      ℹ️ Set Winner requires at least 1 admin and 3 total participants (admin or guestVIP)
                    </Text>
                  )}
                </>
              )}

              </View>
              {item.status === 'finished' && item.winner && (
              <View style={{ marginTop: 10 }}>
                <Text style={{ fontWeight: 'bold', color: '#4CAF50' }}>
                  🏆 Winner: {userMap[item.winner] || `ID: ${item.winner?.slice(0, 4)}`}
                </Text>
                <Text style={{ color: '#333', marginLeft: 4 }}>
                  Points earned: {item.points ?? 0}
                </Text>
              </View>
            )}
            
               <View style={styles.buttonContainer}>
                {item.status === 'scheduled' && (
                <PokerButton
                  title={isParticipant ? 'Cancel' : 'Participate'}
                  onPress={() => {
                      logic.toggleParticipation(item._id)
                        .then(() => refreshGamesWithPoints(userId))
                        .catch(error => Alert.alert('Error ❌', error.message))
                    }}
                    />
                )}
                {userRole === 'admin' && item.status === 'scheduled' && (
                  <>
                    {item.canSetWinner && (
                      <PokerButton
                        title="Set Winner"
                        onPress={() => openWinnerModal(item)}
                        color='#4caf50'
                        textColor='#fff'
                      />
                    )}

                    <PokerButton
                      title="Delete Game"
                      onPress={() => handleDeleteGame(item._id)}
                      color="#a00000"
                      textColor="#fff"
                    />
                    <PokerButton
                      title="Edit Game"
                      onPress={() => navigation.navigate('EditGame', { game: item })}
                      color="#ffa500"
                      textColor="#fff"
                    />
                  </>
                )}

              </View>
            </View>
          )
        }}
      />

      <CustomModal
        visible={modalVisible}
        onClose={() => {
          setModalVisible(false)
          setSelectedGame(null)
          fetchParticipants()
        }}
        onConfirm={handleConfirmWinner}
        title="Select winner"
        cancelText="Cancel"
        showInput={false}
        options={selectedGame?.participants.map(id => ({
          label: userMap[id] || `ID: ${id.slice(0, 4)}`,
          value: id
        })) || []}
      />
      <NavBar navigation={navigation} />
    </PokerBackground>
  )
}

export default Home