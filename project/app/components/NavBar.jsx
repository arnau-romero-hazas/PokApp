import React, { useState, useEffect } from 'react'
import { View, TouchableOpacity } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'
import Feather from 'react-native-vector-icons/Feather'
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
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                <AntDesign name="home" size={28} style={styles.icon} />
            </TouchableOpacity>

            {userRole === 'admin'  && (
            <TouchableOpacity onPress={() => navigation.navigate('CreateGame')}>
                <AntDesign name='pluscircleo' size={28} style={styles.icon}/>
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
    )
}
export default NavBar