import { data } from '../../data/index.js'
import { errors, validate } from '../../validations/index.js'
import  Constants  from 'expo-constants'

const  API_BASE_URL = Constants.expoConfig.extra.apiBaseUrl

const { SystemError, ValidationError } = errors

export const deleteGame = (gameId) => {
    validate.id(gameId, 'gameId')

    return data.getToken()
        .then(token => {
            if (!token) throw new ValidationError(error.message)
            
            return fetch(`${API_BASE_URL}/games/${gameId}`, {
                method: 'DELETE',
                headers : {
                    Authorization : `Bearer ${token}`
                }
            })
        })
        .catch(error => { throw new SystemError(error.message) })
        .then(response => { 
            console.log(response.status)

            if (response.status === 204) return

            return response.json()
                .catch(error => { throw new SystemError(error.message) })
                .then(body => {
                    const { error, message } = body

                    const constructor = errors[error]

                    throw new constructor(message)
                })
        })
}