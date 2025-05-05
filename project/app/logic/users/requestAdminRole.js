import { data } from '../../data/index.js'
import { errors, validate } from '../../validations/index.js'
import  Constants  from 'expo-constants'

const  API_BASE_URL = Constants.expoConfig.extra.apiBaseUrl

const { SystemError, AuthorizationError } = errors

export const requestAdminRole = (secretWord) => {
    validate.string(secretWord, 'secret word')

    return data.getToken()
    .catch(error => { throw new SystemError(error.message) })
    .then(token => {
        if (!token) {
          throw new AuthorizationError('Token not found')
        }
        return fetch(`${API_BASE_URL}/users/admin-request`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ secretWord })
        })
    })
    .catch(error => { throw new SystemError(error.message) })
    .then(response => {
        if(response.status === 200)
            return response.json()
                .catch(error => { throw new SystemError(error.message) })

                .then(body => {
                    const { token } = body

                   return data.setToken(token)
                   .catch(error => { throw new SystemError(error.message) })
                })

        return response.json()
            .catch(error => { throw new SystemError(error.message) })
            .then(body => {
                const { error, message } = body
                const constructor = errors[error]
                throw new constructor(message)
            })
    })
}