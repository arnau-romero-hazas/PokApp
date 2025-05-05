import { data } from '../../data/index.js'
import  Constants  from 'expo-constants'
import { validate } from '../../validations/index.js'
const  API_BASE_URL = Constants.expoConfig.extra.apiBaseUrl

export const searchUsers = (query) => {
   validate.text(query)
    return data.getToken()
       .catch(error => { throw new SystemError(error.message) })
       .then(token => {
           if (!token) {
             throw new AuthorizationError('Token not found')
           }
           return fetch(`${API_BASE_URL}/users/search?query=${query}`, {
               method: 'GET',
               headers: {
                   'Authorization': `Bearer ${token}`,
                   'Content-Type': 'application/json'
               },
           })
       })
        .then((response) => response.json()) // Parseamos la respuesta como JSON
        .then((foundUsers) => {
            if (!Array.isArray(foundUsers)) {
                throw new Error('Unexpected response format')
            }
            return foundUsers // Devolvemos los usuarios encontrados
        })
        .catch((error) => {
            console.error('Error fetching users:', error)
            throw error // Lanza el error si hay algún problema
        })
}
