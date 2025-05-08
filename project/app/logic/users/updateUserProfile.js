import Constants from 'expo-constants'
import { data } from '../../data/index.js'
import { errors, validate } from '../../validations/index.js'

const API_BASE_URL = Constants.expoConfig.extra.apiBaseUrl
const { SystemError, AuthorizationError } = errors

export const updateUserProfile = async ({ name, surname, email, username, currentPassword, newPassword }) => {
  if (name) validate.name(name)
  if (surname) validate.surname(surname)
  if (email) validate.email(email)
  if (username) validate.username(username)
  if (newPassword) validate.password(newPassword)

  const token = await data.getToken()
  if (!token) throw new AuthorizationError('Token not found')

  return fetch(`${API_BASE_URL}/users/profile`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ name, surname, email, username, currentPassword, newPassword })
  })
    .then(res => {
      if (res.status === 200) return res.json()

      return res.json().then(body => {
        const { error, message } = body
        const Constructor = errors[error] || SystemError
        throw new Constructor(message || 'Could not update profile')
      })
    })
}
