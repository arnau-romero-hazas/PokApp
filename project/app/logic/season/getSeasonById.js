import { data } from '../../data/index.js'
import { errors, validate } from '../../validations/index.js'
import  Constants  from 'expo-constants'

const  API_BASE_URL = Constants.expoConfig.extra.apiBaseUrl

const { SystemError } = errors

export const getSeasonById = (seasonId) => {
  validate.id(seasonId)
  return data.getToken()
  .then((token) => {
    if (!token) throw new Error('No token found')
      
    return fetch(`${API_BASE_URL}/seasons/${seasonId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
   }) 
    .catch(err => { throw new SystemError(err.message) })
    .then(res => {
      if (res.status === 200)
        return res.json()

      return res.json()
        .then(body => {
          throw new SystemError(body.message)
        })
    })
}
