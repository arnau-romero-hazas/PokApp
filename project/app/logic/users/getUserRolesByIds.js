import Constants from 'expo-constants'
import { data } from '../../data'
import { errors } from '../../validations'

const API_BASE_URL = Constants.expoConfig.extra.apiBaseUrl
const { SystemError } = errors

export const getUserRolesByIds = (ids) => {
  return data.getToken()
    .then(token => {
      if (!token) throw new SystemError('Token not found')

      return fetch(`${API_BASE_URL}/users/roles-by-ids`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ ids })
      })
    })
    .catch(err => { throw new SystemError(err.message) })
    .then(res => {
      if (res.status === 200) return res.json()

      return res.json().then(body => {
        throw new SystemError(body.message || 'Error getting user roles')
      })
    })
}
