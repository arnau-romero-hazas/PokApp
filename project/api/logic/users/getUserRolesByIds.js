import { API_BASE_URL } from '../config.js'

export const getUserRolesByIds = (ids) => {
  return fetch(`${API_BASE_URL}/users/roles-by-ids`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ids })
  })
    .then(res => {
      if (!res.ok) throw new Error('Could not fetch user roles')
      return res.json()
    })
}
