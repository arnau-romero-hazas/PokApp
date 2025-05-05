import { errors, validate } from '../../validations/index.js'
import  Constants  from 'expo-constants'

const  API_BASE_URL = Constants.expoConfig.extra.apiBaseUrl

const { SystemError } = errors

export const registerUser = (name, surname, email, username, password) => {
    validate.name(name)
    validate.surname(surname)
    validate.email(email)
    validate.username(username)
    validate.password(password)

    return fetch(`${API_BASE_URL}/users`, { // tipar la URL
        method: 'POST', 
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({ name, surname, email, username, password })
    })
        .catch(error => { throw new SystemError(error.message) })

        .then(response => {
            console.log(response.status)

            if (response.status === 201) 
                return

            return response.json()
                .catch(error => { throw new SystemError(error.message) })
                .then(body => {
                    const { error, message } = body
                    // const error = body.error
                    // const message = body.message
                    throw new SystemError(message)
                })
        })
}

