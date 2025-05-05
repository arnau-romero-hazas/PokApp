import { data } from '../../data'
import { errors, validate } from '../../validations/index.js'
import  Constants  from 'expo-constants'

const  API_BASE_URL = Constants.expoConfig.extra.apiBaseUrl

const { SystemError, AuthorizationError } = errors

export const createGame = (title, season, place, date, participants = []) => {
  validate.title(title, 'title')
  validate.season(season, 'season')
  validate.place(place, 'place')
  validate.date(date)

  const isoDate = typeof date === 'string' ? new Date(date).toISOString() : date.toISOString()

  return data.getToken()
    .then(token => {
      if (!token) throw new AuthorizationError('No token found')

      return fetch(`${API_BASE_URL}/games`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, season, date: isoDate, place, participants }),
      })
    })
    .catch(error => { throw new SystemError(error.message) })
    .then(response => {
      if (response.status === 201) return

      return response.json()
        .catch(error => { throw new SystemError(error.message) })
        .then(body => {
          const { error, message } = body
          const constructor = errors[error]
          throw new constructor(message)
        })
    })
}
