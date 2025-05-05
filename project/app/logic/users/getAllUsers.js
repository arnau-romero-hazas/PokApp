import Constants from 'expo-constants'
import { data } from '../../data'
import { SystemError } from '../../validations/errors'

const API_BASE_URL = Constants.expoConfig.extra.apiBaseUrl

export const getAllUsers = async () => {
  const token = await data.getToken()
  if (!token) throw new SystemError('User not authenticated')

  const res = await fetch(`${API_BASE_URL}/users/all`, {
    headers: { Authorization: `Bearer ${token}` }
  })

  if (!res.ok) throw new SystemError('Failed to fetch users')
  const { users } = await res.json()
  return users                    // ← [{ id, username }, ...]
}
