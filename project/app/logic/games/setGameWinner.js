import { data } from '../../data'

import { errors, validate } from '../../validations/index.js'
import  Constants  from 'expo-constants'

const  API_BASE_URL = Constants.expoConfig.extra.apiBaseUrl

const { SystemError, ValidationError } = errors

export const setGameWinner = (gameId, winnerId) => {
  validate.id(gameId, 'gameId')
  validate.id(winnerId, 'winnerId')

  return data.getToken()
    .then(token => {
      if (!token) throw new ValidationError('Token not found')

      return fetch(`${API_BASE_URL}/games/${gameId}/winner`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ winnerId }),
      })
    })
    .catch(error => { throw new SystemError(error.message) })
    .then(response => {
      if (response.status === 204) return

      return response.json()
        .catch(error => { throw new SystemError(error.message)})
        .then(body => {
          const { error, message } = body

          const constructor = errors[error]

          throw new constructor(message)
        })
        
    })
}