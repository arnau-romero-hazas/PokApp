import { data } from '../../data'
import { errors,validate } from '../../validations/index.js'
import  Constants  from 'expo-constants'

const  API_BASE_URL = Constants.expoConfig.extra.apiBaseUrl

const { SystemError } = errors

export const getUserById = (userId) => {
  validate.id(userId)
  return data.getToken()
    .then((token) => { 
        return fetch(`${API_BASE_URL}/users/${userId}`, {
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
