import { data } from '../../data/index.js'
import { errors } from '../../validations/index.js'
import  Constants  from 'expo-constants'

const  API_BASE_URL = Constants.expoConfig.extra.apiBaseUrl

const { SystemError, AuthorizationError } = errors

export const getUsername = () => {
    return data.getToken()
    .then(token => {
        if (!token) {
            throw new AuthorizationError('Token not found');
        }

        // Hacemos la solicitud con el token
        return fetch(`${API_BASE_URL}/users/self/username`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,  // Agregamos el token en los headers de la solicitud
            },
        });
    })
        .catch(error => { throw new SystemError(error.message)})
        .then(response => {
            if (response.status === 200)
                return response.json()
                    .catch(error => { throw new SystemError(error.message)})
                    .then(body => {
                        const { username } = body

                        return username
                    })
            return response.json()
                    .catch(error => { throw new SystemError(error.message)})
                    .then(body => {
                        const{ error, message } = body

                        throw new SystemError(error.message)
                    })
        })
}