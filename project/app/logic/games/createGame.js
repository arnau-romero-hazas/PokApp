import { data } from '../../data'
import { errors, validate } from '../../validations/index.js'
import  Constants  from 'expo-constants'

const  API_BASE_URL = Constants.expoConfig.extra.apiBaseUrl

const { SystemError, AuthorizationError } = errors

export const createGame = (title, season, place, date) => {
  validate.title(title, 'title')
  validate.season(season, 'season')
  validate.place(place, 'place')
  validate.date(date)
  
  const isoDate = typeof date === 'string' ? new Date(date).toISOString() : date.toISOString()
 /*
  Momently we don't need to use, but we save for a future.
  const now = new Date()
  if (new Date(isoDate) < now) throw new SystemError('Date cannot be in the past')
*/
  return data.getToken()
    .then(token => {
      if (!token) throw new AuthorizationError('No token found')

      return fetch(`${API_BASE_URL}/games`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, season, date: isoDate, place}),
      })
    })
    .catch(error => {
      throw new SystemError(error.message)
    })
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