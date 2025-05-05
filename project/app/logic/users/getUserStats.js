import { data } from '../../data/index.js'
import { errors } from '../../validations/index.js'
import  Constants  from 'expo-constants'

const  API_BASE_URL = Constants.expoConfig.extra.apiBaseUrl

const { SystemError, AuthorizationError } = errors

export const getUserStats = () => {
  return data.getToken()
    .then(token => {
      if (!token) throw new AuthorizationError('Token not found')

      return fetch(`${API_BASE_URL}/users/stats`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    })
    .catch(error => { throw new SystemError(error.message) })
    .then(response => {
      if (response.status === 200) return response.json()

      return response.json()
        .catch(error => { throw new SystemError(error.message) })
        .then(body => {
          const { error, message } = body
         
          throw new SystemError(message)
        })
    })
}
