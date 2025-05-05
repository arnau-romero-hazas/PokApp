import { data } from '../../data'
import { errors, validate } from '../../validations/index.js'
import  Constants  from 'expo-constants'

const  API_BASE_URL = Constants.expoConfig.extra.apiBaseUrl

const { SystemError } = errors

export const loginUser = (username, password) => {
    validate.username(username)
    validate.password(password)

    return fetch(`${API_BASE_URL}/users/auth`, {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
        .catch(error => { throw new SystemError(error.message) })

        .then(response => {
            console.log(response.status)

            if(response.status === 200)
                return response.json()
                    .catch(error => { throw new SystemError(error.message) })

                    .then(body => {
                        const { token } = body

                        return data.setToken(token)
                        .catch(error => { throw new SystemError(error.message) })
                    })

            return response.json()
                .catch(error => { throw new SystemError(error.message) })

                .then(body => {
                    const { error, message } = body

                    const constructor = errors[error]

                    throw new constructor(message)
                })
        })
}
