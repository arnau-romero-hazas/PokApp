import React, { useState, useEffect } from 'react'
import { Image, View, Text, TouchableOpacity } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'
import styles from './NavBar.styles.js'
import { logic } from '../logic/index.js'

const NavBar = ({ navigation }) => {
  const [userRole, setUserRole] = useState('')

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const role = await logic.getUserRole()
        setUserRole(role)
      } catch (error) {
        console.error('Error getting user role:', error)
      }
    }

    fetchUserRole()
  }, [])

  return (
    <View>
      {/* NavBar principal */}
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <AntDesign name="home" size={28} style={styles.icon} />
        </TouchableOpacity>

        {userRole === 'admin' && (
          <TouchableOpacity onPress={() => navigation.navigate('CreateGame')}>
            <AntDesign name="pluscircleo" size={28} style={styles.icon} />
          </TouchableOpacity>
        )}

        <TouchableOpacity onPress={() => navigation.navigate('SearchProfile')}>
          <AntDesign name="search1" size={28} style={styles.icon} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Classification')}>
          <Entypo name="trophy" size={28} style={styles.icon} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Entypo name="user" size={28} style={styles.icon} />
        </TouchableOpacity>
      </View>
      <View style={styles.separator} />
      {/* Franja inferior con el nombre */}
      <View style={styles.footerLabel}>
        <View style={styles.footerContent}>
          <Text style={styles.footerText}>POKAPP</Text>
          <Image
            source={require('../assets/favicon.png')}
            style={styles.footerIcon}
            resizeMode="contain"
          />
        </View>
      </View>
    </View>
  );
}

export default NavBar
