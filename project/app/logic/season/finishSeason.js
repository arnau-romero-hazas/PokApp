import { data } from '../../data/index.js'
import { validate, errors } from '../../validations/index.js'
import  Constants  from 'expo-constants'
const { SystemError } = errors

const  API_BASE_URL = Constants.expoConfig.extra.apiBaseUrl
export const finishSeason = (seasonId) => {
  validate.id(seasonId)
  return data.getToken()
  .then((token) => {
    if (!token) throw new SystemError('No token found')

    return fetch(`${API_BASE_URL}/seasons/${seasonId}/finish`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
  })
    .catch(error => { throw new SystemError(error.message) })
    .then(res => {
      if (res.status === 204) return

      return res.json()
        .catch(error => { throw new SystemError(error.message) })
        .then(body => {
          const { error, message } = body

          const constructor = errors[error]

          throw new constructor(message)
        })
    })
}
