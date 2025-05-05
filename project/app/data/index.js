import AsyncStorage from '@react-native-async-storage/async-storage'

import { errors } from '../validations/index.js'

const { SystemError } = errors

export const data = {
    // Obtener el token
    getToken() {
        return (async () => {
            try {
                const value = await AsyncStorage.getItem('token')

                return value ? JSON.parse(value) : null

            } catch (error) {
                throw new SystemError(error.message)
            }
        })()
    },

    // Establecer el token
    setToken(id) {
        return (async () => {
            try {
                await AsyncStorage.setItem('token', JSON.stringify(id))
            } catch (error) {
                throw new SystemError(error.message)
            }
        })()     
    }
}
