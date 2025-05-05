import { data } from '../../data/index.js'
import { errors } from '../../validations/index.js'
import  Constants  from 'expo-constants'

const { SystemError } = errors
const  API_BASE_URL = Constants.expoConfig.extra.apiBaseUrl

export const getLatestSeason = () => {
  return data.getToken()
  .then((token) => {
    if (!token) throw new Error('No token found')

    return fetch(`${API_BASE_URL}/seasons/latest`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  }) 
    .catch(error => { throw new SystemError(error.message) })
    .then(res => {
      if (res.status === 200){ 
        return res.json()
          .catch(error => { throw new SystemError(error.message) })
          
      }

      return res.json()
        .catch(error => { throw new SystemError(error.message) })
        .then(body => {
          const { error, message } = body

          const constructor = errors[error]

          throw new constructor(message)
        })
    })
}
