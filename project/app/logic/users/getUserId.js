import { data } from '../../data'
import { extractPayloadFromJWT } from '../../util'
import { errors } from '../../validations/index.js'

const { SystemError } = errors

export const getUserId = () => {
  return data.getToken()
    .then(token => {
      if (!token) throw new SystemError('Token not found')

      // Decodificar el token para obtener el userId
      const { sub: userId } = extractPayloadFromJWT(token)
      return userId
    })
    .catch(error => {
      throw new SystemError(error.message)
    })
}
