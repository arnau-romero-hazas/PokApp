import { data } from '../../data'
import { errors } from '../../validations/index.js'
import  Constants  from 'expo-constants'

const  API_BASE_URL = Constants.expoConfig.extra.apiBaseUrl

const { SystemError, ValidationError } = errors

export const getGames = () => {
  return data.getToken()
    .then(token => {
      if (!token) throw new ValidationError('Token not found')

      return fetch(`${API_BASE_URL}/games`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    })
    .catch(error => {
      throw new SystemError(error.message)
    })
    .then(response => {
      if (response.status === 200) {
        return response.json()
          .catch(error => { throw new SystemError(error.message) })
      }

      return response.json()
        .catch(error => { throw new SystemError(error.message) })
        .then(body => {
          const { error, message } = body

          const constructor = errors[error]

          throw new constructor(message)
        })
    })
}
