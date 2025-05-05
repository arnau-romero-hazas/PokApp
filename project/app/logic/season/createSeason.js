import { data } from '../../data/index.js'
import { validate, errors } from '../../validations/index.js'
import  Constants  from 'expo-constants'

const { SystemError } = errors

const  API_BASE_URL = Constants.expoConfig.extra.apiBaseUrl

export const createSeason = ( name, startDate, endDate ) => {
  validate.title(name, 'title')
  validate.date(startDate, 'startDate')
  validate.date(endDate, 'startDate')
  
  return data.getToken()
  .then((token) => {
    if (!token) throw new SystemError('No token found')

      return fetch(`${API_BASE_URL}/seasons`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ name, startDate, endDate })
      })
 })
    .catch(err => { throw new SystemError(err.message) })
    .then(res => {
      if (res.status === 201) return
      
      return res.json()
        .catch(error => { throw new SystemError(error.message)})
        .then(body => {
          const { error, message } = body

          const constructor = errors[error]

          throw new constructor(message)
        })
    })
}
