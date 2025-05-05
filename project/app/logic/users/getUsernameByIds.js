import { data } from '../../data'
import { errors, validate } from '../../validations/index.js'
import  Constants  from 'expo-constants'

const  API_BASE_URL = Constants.expoConfig.extra.apiBaseUrl

const { SystemError } = errors

export const getUsernamesByIds = (ids) => {
  validate.idArray(ids)

    return data.getToken()
    .then(token =>
       fetch(`${API_BASE_URL}/users/usernames`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ ids })
      })
    )
    .catch(err => { throw new SystemError(err.message) })
    .then(res => {
      if (res.status === 200) return res.json()

      return res.json()
        .then(body => { throw new SystemError(body.message) })
    })
    .then(({ usernames }) => usernames)
}
