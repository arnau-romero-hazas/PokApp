import { data } from '../../data'
import { errors, validate } from '../../validations/index.js'
import Constants from 'expo-constants'

const API_BASE_URL = Constants.expoConfig.extra.apiBaseUrl
const { SystemError, AuthorizationError } = errors

export const editGame = (gameId, updates) => {
  validate.id(gameId, 'gameId')

  const { title, date, place, participants } = updates
  if (title) validate.title(title)
  if (date) validate.date(date)
  if (place) validate.place(place)
  if (participants) {
    if (!Array.isArray(participants)) throw new ValidationError('Participants must be an array')
    participants.forEach(id => validate.id(id, 'participantId'))
  }

  const body = JSON.stringify({ title, date, place, participants })

  return data.getToken()
    .then(token => {
      if (!token) throw new AuthorizationError('No token found')

      return fetch(`${API_BASE_URL}/games/${gameId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body
      })
    })
    .catch(error => { throw new SystemError(error.message) })
    .then(response => {
      if (response.status === 204) return
      return response.json()
        .catch(error => { throw new SystemError(error.message) })
        .then(({ error, message }) => {
          const Constructor = errors[error]
          throw new Constructor(message)
        })
    })
}
