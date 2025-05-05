import { data } from '../../data/index.js'
import { errors,validate } from '../../validations/index.js'
import Constants from 'expo-constants'

const API_BASE_URL = Constants.expoConfig.extra.apiBaseUrl

const { SystemError, AuthorizationError } = errors

export const getUserHistoricStatsById = (userId) => {
  validate.id(userId)
  return data.getToken()
    .then(token => {
      if (!token) throw new AuthorizationError('Token not found')

      return fetch(`${API_BASE_URL}/users/${userId}/stats/historic`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type' : 'application/json'
        },
      })
    })
    .catch(error => { throw new SystemError(error.message) })
    .then(response => {
      if (response.status === 200) return response.json()

      return response.json()
        .catch(error => { throw new SystemError(error.message) })
        .then(body => {
          const { error, message } = body
          const constructor = errors[error]
          throw new constructor(message)
        })
    })
}